<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Project;
use Vanderbilt\AdvancedImport\App\Helpers\RecordHelper;
use Vanderbilt\AdvancedImport\App\Helpers\TemporaryTable;
use Vanderbilt\AdvancedImport\App\Models\Importers\ImporterFactory;
use Vanderbilt\AdvancedImport\App\Traits\CanReadCSV;
use Vanderbilt\AdvancedImport\App\Traits\SubjectTrait;
use Vanderbilt\REDCap\Classes\Queue\Queue;

class Import extends BaseModel
{
    use CanReadCSV;
    use SubjectTrait;

	function __construct()
	{
		parent::__construct();
    }
    
    /* function importCSV($project_id, $file_path, $settings)
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
    } */

    public function processCSV($project_id, $file_path, $settings)
    {
        $project = new Project($project_id);
        $settings = new ImportSettings($settings, $project);
        $temporary_table = new TemporaryTable($project, $file_path, $settings);
        $record_helper = new RecordHelper($project, $file_path, $settings);
        $importer = ImporterFactory::create($project, $settings, $temporary_table, $record_helper);
        
        // if(empty($file_path)) throw new \Exception("No file path", 1);
        $row_index = $settings->data_row_start ?: 1;
        $max_lines = $settings->max_lines ?: 10;

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