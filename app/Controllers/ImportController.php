<?php namespace Vanderbilt\AdvancedImport\App\Controllers;

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

    function process()
    {
        try {
            $project_id = $_GET['pid'];
            $file_name = @$_POST['file_name'];
            $upload_dir = AdvancedImport::getUploadDirectory();
            $file_path = "{$upload_dir}/{$file_name}";
            $settings = json_decode($_POST['settings'], $assoc=true);
            $background_process = @$settings['background_process'];
            $model = new Import();
            if($background_process) {
                $results = $model->backgroundProcessCSV($project_id, $file_path, $settings);
            }else {
                $results = $model->processCSV($project_id, $file_path, $settings);
            }
            
            return $this->printJSON($results);
        } catch (\Exception $e) {
            $response = ['message'=>$e->getMessage()];
            return $this->printJSON($response, $code=400);
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
            $importer = new Import();
            $text = @$_POST['text'] ?: '';
            $settings = json_decode($_POST['settings']);
            $data = $importer->parseFile($text, $settings);
            return $this->printJSON($data);
        } catch (\Exception $e) {
            $response = ['message'=>$e->getMessage()];
            $code = $e->getCode();
            return $this->printJSON($response, $code);
        }
    }
}