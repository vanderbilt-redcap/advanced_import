<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Helpers\ArrayBox;
use Vanderbilt\AdvancedImport\App\Models\Importers\ImporterFactory;
use Vanderbilt\AdvancedImport\App\Traits\CanProcessCsvData;
use Vanderbilt\AdvancedImport\App\Traits\CanReadCSV;
use Vanderbilt\AdvancedImport\App\Traits\SubjectTrait;

class Import extends BaseModel
{
    use CanReadCSV;
    use SubjectTrait;
    use CanProcessCsvData;

    /**
     *
     * @var AdvancedImport
     */
    private $module;

    /**
     * constructor
     *
     * @param AdvancedImport $module
     */
	function __construct($module)
	{
        $this->module = $module;
        $this->attach($this->module, '*'); //attach the module as a subscriber
		parent::__construct();
    }
    
    function importCSV($project_id, $file, $settings)
    {
        $settings = new ImportSettings($settings);
        $importer = ImporterFactory::create($project_id, $settings);
        $importer->attach($this->module, '*'); // attache the module as a subscriber

        $test = compact('project_id', 'file', 'settings');
        $file_path = $file['tmp_name'];
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
    function parseFile($file, $settings)
    {
        $settings = new ImportSettings($project_id=null, $settings); // don't need the project ID
        $file_path = $file['tmp_name'];
        if(empty($file_path)) throw new \Exception("No file path", 1);
        $first_line = $this->readFileAtLine($file_path, $line_number=0);
        $settings->field_delimiter = $delimiter = $this->guessDelimiter($first_line);
        $columns = $this->getColumnNames($first_line, $settings->field_delimiter, $settings->text_qualifier);
        $data = compact('columns','delimiter');
        return $data;
    }

    function getColumnNames($field_name_row, $field_delimiter, $text_qualifier)
    {
        $colum_names = $this->readCSVLine($field_name_row, $field_delimiter, $text_qualifier);
        return $colum_names;
    }


}