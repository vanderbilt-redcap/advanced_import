<?php namespace Vanderbilt\AdvancedImport\App\Controllers;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\ChunkUploader;

class UploadController extends BaseController
{
    private $module;

    function __construct()
    {
        // global $module;
        parent::__construct();
		
        // $this->module = $module;
		$this->module = new AdvancedImport();
    }
    
    function upload()
    {
        try {
            $params = $_POST;
            $uploader = new ChunkUploader(APP_PATH_TEMP);
            $results = $uploader->upload($params);
            return $this->printJSON($results);
        } catch (\Exception $e) {
            $response = [
                'success'=>false,
                'message'=>$e->getMessage(),
            ];
            $this->printJSON($response, 400);
        }
    }

}