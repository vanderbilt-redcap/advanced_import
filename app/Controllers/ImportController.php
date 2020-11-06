<?php namespace Vanderbilt\AdvancedImport\App\Controllers;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Import;

class ImportController extends BaseController
{

    function __construct()
    {
        parent::__construct();
    }
    
    function import()
    {
        try {
            $project_id = $_GET['pid'];
            $file = reset($_FILES); // get only one file
            $file_path = @$file['tmp_name'];
            $settings = json_decode($_POST['settings']);
            $model = new Import();
            $results = $model->importCSV($project_id, $file_path, $settings);
            
            return $this->printJSON($results);
        } catch (\Exception $e) {
            $response = ['message'=>$e->getMessage()];
            $code = $e->getCode();
            return $this->printJSON($response, $code);
        }
    }

    /**
     * check if the file is valid
     *
     * @return void
     */
    function parse()
    {
        try {
            $model = new Import();
            $file = reset($_FILES); // get only one file
            $settings = json_decode($_POST['settings']);
            $data = $model->parseFile($file, $settings);
            return $this->printJSON($data);
        } catch (\Exception $e) {
            $response = ['message'=>$e->getMessage()];
            $code = $e->getCode();
            return $this->printJSON($response, $code);
        }
    }
}