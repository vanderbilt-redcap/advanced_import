<?php namespace Vanderbilt\AdvancedImport\App\Controllers;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Export;

class ExportController extends BaseController
{
    private $module;

    function __construct()
    {
        global $module;
        parent::__construct();
		
        $this->module = $module;
		$this->app = new AdvancedImport($module);
    }
    
    function export()
    {
        try {
            //code...
            $project_id = $_GET['pid'];
            $event_id = $_GET['event_id'];
            $form_name = $_GET['form_name'];
            $settings = [
                'delimiter' => $_GET['field_delimiter'],
                'enclosure' => $_GET['text_qualifier'],
                'primary_key' => $_GET['primary_key'],
            ];

            $model = new Export($this->module);
            return $model->exportCSV($project_id, $event_id, $form_name, $settings);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


}