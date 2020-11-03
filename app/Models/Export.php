<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Traits\CanForceDownload;
use Vanderbilt\AdvancedImport\App\Traits\CanGetProjectData;
use Vanderbilt\AdvancedImport\App\Traits\CanWriteCSV;

class Export extends BaseModel
{
    use CanWriteCSV, CanForceDownload, CanGetProjectData;

    /**
     * constructor
     *
     * @param AdvancedImport $module
     */
	function __construct($module)
	{
        $this->module = $module;
		parent::__construct();
    }

    function exportCSV($project_id, $event_id, $form_name, $settings=[] )
    {
        // get settings
        $delimiter = $settings['delimiter'];
        $enclosure = $settings['enclosure'];
        $primary_key = $settings['primary_key'];

        if(empty($primary_key)) {
            throw new \Exception("No primary key was found.", 400);
        }
        // get fields data
        $csv_columns = $this->getProjectFormFields($project_id, $form_name);
        array_unshift($csv_columns, $primary_key);

        // get the CSV. Note that field names are contained in an array and extract headers is false
        $csv = $this->writeCSV([$csv_columns], $extract_headers=false, $delimiter, $enclosure);

        if(function_exists('addBOMtoUTF8')) $csv = addBOMtoUTF8($csv);
        $this->forceDownload("{$project_id}-{$event_id}-{$form_name}.csv", $csv);
    }
    
    


}