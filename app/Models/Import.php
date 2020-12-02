<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Closure;
use Opis\Closure\SerializableClosure;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Importers\ImporterFactory;
use Vanderbilt\AdvancedImport\App\Traits\CanReadCSV;
use Vanderbilt\AdvancedImport\App\Traits\SubjectTrait;
use Vanderbilt\REDCap\Classes\Queue\Queue;

class Test
{
    function __construct($closure)
    {
        $closure();
    }
    function __wakeup()
    {
        require('/var/www/html/modules/advanced_import_v1.0.0/vendor/autoload.php');

    }
}
class Import extends BaseModel
{
    use CanReadCSV;
    use SubjectTrait;

	function __construct()
	{
		parent::__construct();
    }
    
    function importCSV($project_id, $file_path, $settings)
    {
        $settings = new ImportSettings($settings);
        $importer = ImporterFactory::create($project_id, $settings);
        // if(empty($file_path)) throw new \Exception("No file path", 1);
        $row_index = $settings->data_row_start ?: 1;
        
        $results = [];
        while($line = $this->readFileAtLine($file_path, $row_index)) {
            $csv_data = $this->readCSVLine($line, $settings->field_delimiter, $settings->text_qualifier);
            if(!empty($csv_data)) {
                $response = $importer->process($csv_data, $row_index);
                $results = $this->reduceResults($response, $results);
            }
            $row_index++;
        }

        return $results;
    }

    private function addMessage($key, $data = array()) {
        $status = Queue::STATUS_READY;
        // if(!$data instanceof SerializableClosure) exit;
        $serialized_data = serialize($data);
        $now = date('Y-m-d H:i:s');
        $query_string = sprintf(
            "INSERT INTO `%s` (`key`, `status`, `data`, `created_at`, `updated_at`)
            VALUES ('%s', '%s', '%s', '%s', '%s')",
            Queue::TABLE_NAME,
            $key,
            $status,
            db_real_escape_string($serialized_data),
            $now,
            $now
        );
        $result = db_query($query_string);
        if($result && $id=db_insert_id()) {
            \Logging::logEvent( $sql=$query_string, Queue::LOG_OOBJECT_TYPE, "MANAGE", "", "", "Message added to the queue.");
            return true;
        }else {
            \Logging::logEvent( $sql=$query_string, Queue::LOG_OOBJECT_TYPE, "MANAGE", "", "", "Error adding message to the queue.");
            throw new \Exception("Error adding message to queue", 1);
        }
    }

    function backgroundProcessCSV($project_id, $file_path, $settings)
    {
        $addMessage = function($pid, $file_path, $settings, $row_index) {
            // SerializableClosure::enterContext();

			$key="CSV Import - pid {$pid} - line {$row_index}"; // can use any name for the closure
			$function = function() {
                require('/var/www/html/modules/advanced_import_v1.0.0/vendor/autoload.php');
                global $project_id;
                $project_id = $pid;
                echo $project_id;
                // $import = new Import();
				// $import->processCSV($project_id, $file_path, $settings);
            };
            $module = AdvancedImport::getInstance();
            $queue = new Queue;
            $unbound_function = Closure::bind($function, $queue);
            $object = new Test($unbound_function);
            $closure = SerializableClosure::from($unbound_function);
            $test = serialize($closure);
            $test1 = unserialize($test);
            // SerializableClosure::exitContext();
            $this->addMessage($key, $closure);

        };

        // if(empty($file_path)) throw new \Exception("No file path", 1);
        $row_index = $settings->data_row_start ?: 1;
        $max_lines = $settings->max_lines ?: 100;
        
        $counter=0;
        $file = $this->openFile($file_path);
        while($file->valid()) {
            $counter++;
            $addMessage($project_id, $file_path, $settings, $row_index);
            $row_index += $max_lines;
            $settings->row_index = $row_index;
            $file->seek($row_index);
        };
        // $worker = new Worker(500,100);
        // $worker->process();
        return ['queued_messages'=>$counter];
    }


    public function processCSV($project_id, $file_path, $settings)
    {
        $settings = new ImportSettings($settings);
        $importer = ImporterFactory::create($project_id, $settings);

        // if(empty($file_path)) throw new \Exception("No file path", 1);
        $row_index = $settings->data_row_start ?: 1;
        $max_lines = $settings->max_lines ?: 100;

        $counter = 0;
        $results = [];
        while($counter++<$max_lines && $line = $this->readFileAtLine($file_path, $row_index++)) {
            $csv_data = $this->readCSVLine($line, $settings->field_delimiter, $settings->text_qualifier);
            if(!empty($csv_data)) {
                $response = $importer->process($csv_data, $row_index);
                $results = $this->reduceResults($response, $results);
            }
        }
        if(empty($results)) return;
        /* $total_lines = $this->countLines($file_path);
        $results['total_lines'] = $total_lines;
        $results['line'] = $row_index<$total_lines ? $row_index : $total_lines; */ // do not exceed max number of lines
        $results['line'] = $row_index;

        return $results;
    }


    public function countLines($file_path)
    {
        $counter = 0;
        return $counter;
        $handle = fopen($file_path, "r");
        while(!feof($handle)){
        $line = fgets($handle, 4096);
        $counter += substr_count($line, PHP_EOL);
        }

        fclose($handle);

        return $counter;
    }

    private function reduceResults($response, $seed=[])
    {
        if(array_key_exists($response, $seed)) {
            $seed[$response]++;
        }else {
            $seed[$response] = 1;
        }
        return $seed;
    }

    /**
     * check if the file is valid
     * 
     * - guess the delimiter
     * - get the column names
     *
     * @return void
     */
    function parseFile($text_line, $settings)
    {
        $settings = new ImportSettings($project_id=null, $settings); // don't need the project ID
        if(empty($text_line)) throw new \Exception("No text to parse", 1);
        $settings->field_delimiter = $delimiter = $this->guessDelimiter($text_line);
        $columns = $this->getColumnNames($text_line, $settings->field_delimiter, $settings->text_qualifier);
        $data = compact('columns','delimiter');
        return $data;
    }

    function getColumnNames($field_name_row, $field_delimiter, $text_qualifier)
    {
        $colum_names = $this->readCSVLine($field_name_row, $field_delimiter, $text_qualifier);
        return $colum_names;
    }


}