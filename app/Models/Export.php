<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Traits\CanForceDownload;
use Vanderbilt\AdvancedImport\App\Traits\CanGetProjectData;
use Vanderbilt\AdvancedImport\App\Traits\CanWriteCSV;

class Export extends BaseModel
{
    use CanWriteCSV, CanForceDownload, CanGetProjectData;

	function __construct()
	{
		parent::__construct();
    }

    function exportCSV($project, $event_id, $form_name, $settings=[] )
    {
        // get settings
        $delimiter = $settings['delimiter'];
        $enclosure = $settings['enclosure'];
        $primary_key = $settings['primary_key'];

        if(empty($primary_key)) {
            throw new \Exception("No primary key was found.", 400);
        }
        
        // get fields data
        $csv_columns = $this->getProjectFormFields($project, $form_name);
        // add primary key if not there already
        if(!in_array($primary_key, $csv_columns)) array_unshift($csv_columns, $primary_key);

        // get the CSV. Note that field names are contained in an array and extract headers is false
        $csv = $this->writeCSV([$csv_columns], $extract_headers=false, $delimiter, $enclosure);
        $project_id = $project->project_id;
        if(function_exists('addBOMtoUTF8')) $csv = addBOMtoUTF8($csv);
        $this->forceDownload("{$project_id}-{$event_id}-{$form_name}.csv", $csv);
    }
    
    


}