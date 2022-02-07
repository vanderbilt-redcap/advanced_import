<?php namespace Vanderbilt\AdvancedImport\Tests;

use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\NameEncryptUploader;
use Vanderbilt\AdvancedImport\App\Models\ChunkUploader\ChunkUploader;
use Vanderbilt\AdvancedImport\App\Models\ChunkUploader\UploadProgressMetadata;

// For now, the path to "redcap_connect.php" on your system must be hard coded.
$root = dirname(dirname(dirname(__DIR__)));
require_once $root . '/redcap_connect.php';

class UploadTest extends \ExternalModules\ModuleBaseTest
{
   function testChenkUploader() {
      $readFile = function($filename) {
         $handle = fopen($filename, "r");
         $contents = fread($handle, filesize($filename));
         $encoded = "data:application/octet-stream;base64,". base64_encode($contents);
         return $encoded;
      };

      $file = realpath('./data/33-import-test.csv');
      $pathinfo = pathinfo($file);
      $name =  $pathinfo['basename'];
      $size = filesize($file);
      $data = $readFile($file);
      $unique_name = null;

      $upload_dir = AdvancedImport::getUploadDirectory();

      $uploader = new ChunkUploader($upload_dir);

      $advancedImport = AdvancedImport::getInstance();
      $uploader->attach($advancedImport, ChunkUploader::NOTIFICATION_PROGRESS);
      $uploader->attach($advancedImport, ChunkUploader::NOTIFICATION_COMPLETED);
      $uploader->attach($advancedImport, ChunkUploader::NOTIFICATION_ERROR);
      
      // use the name encryption upload decorator
      $uploadDecorator = new NameEncryptUploader($uploader);
      /** @var UploadProgressMetadata $results */
      $results = $uploadDecorator->upload($name, $size, $data, $unique_name);
      $this->assertEquals($size, $results->written_bytes);
   }

   function testFileIsAllwed() {
      $name = '33-import-test.csv';
      $advancedImport = AdvancedImport::getInstance();
      $allowed = $advancedImport->checkUploadFileIsAllowed($name);
      $this->assertTrue($allowed);
   }

 
}