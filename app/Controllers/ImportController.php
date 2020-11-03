<?php namespace Vanderbilt\AdvancedImport\App\Controllers;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Import;

class ImportController extends BaseController
{
    private $module;

    function __construct()
    {
        // global $module;
        parent::__construct();
		
        // $this->module = $module;
		$this->module = new AdvancedImport();
    }
    
    function import()
    {
        $project_id = $_GET['pid'];
        $file = reset($_FILES); // get only one file
        $settings = json_decode($_POST['settings']);
        $model = new Import($this->module);
        $results = $model->importCSV($project_id, $file, $settings);
        
        return $this->printJSON($results);
    }

    /**
     * check if the file is valid
     *
     * @return void
     */
    function parse()
    {
        $model = new Import($this->module);
        $file = reset($_FILES); // get only one file
        $settings = json_decode($_POST['settings']);
        $data = $model->parseFile($file, $settings);
        return $this->printJSON($data);
    }
}