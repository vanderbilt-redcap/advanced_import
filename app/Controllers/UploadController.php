<?php namespace Vanderbilt\AdvancedImport\App\Controllers;

use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\NameEncryptUploader;
use Vanderbilt\AdvancedImport\App\Models\ChunkUploader\ChunkUploader;

class UploadController extends BaseController
{
    function __construct()
    {
        parent::__construct();
    }

    /**
     * check if the file being uploaded is valid
     *
     * @param string $filename
     * @return void
     * @throws Exception if file is not allowed
     */
    private function checkUploadedFile($filename) {
        $advancedImport = AdvancedImport::getInstance();
        $valid = $advancedImport->checkUploadFileIsAllowed($filename);
        if(!$valid) throw new \Exception("File not allowed.", 401);
    }

    
    function upload()
    {
        try {
            $name = @$_POST['name'];
            $size = @$_POST['size'];
            $data = @$_POST['data'];
            $unique_name = @$_POST['unique_name'];
            
            $this->checkUploadedFile($name); // check if file type is valid

            $upload_dir = AdvancedImport::getUploadDirectory();

            $uploader = new ChunkUploader($upload_dir);

            $advancedImport = AdvancedImport::getInstance();
            $uploader->attach($advancedImport, ChunkUploader::NOTIFICATION_PROGRESS);
            $uploader->attach($advancedImport, ChunkUploader::NOTIFICATION_COMPLETED);
            $uploader->attach($advancedImport, ChunkUploader::NOTIFICATION_ERROR);
            
            // use the name encryption upload decorator
            $edocsUploader = new NameEncryptUploader($uploader);
            $results = $edocsUploader->upload($name, $size, $data, $unique_name);
            return $this->printJSON($results);
        } catch (\Exception $e) {
            $response = [
                'success'=>false,
                'message'=>$e->getMessage(),
            ];
            $this->printJSON($response, $e->getCode());
        }
    }

}