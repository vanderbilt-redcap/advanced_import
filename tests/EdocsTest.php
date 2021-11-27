<?php namespace Vanderbilt\AdvancedImport\Tests;

use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\ChunkUploader\ChunkUploader;
use Vanderbilt\AdvancedImport\App\Models\EdocsUploader;

// For now, the path to "redcap_connect.php" on your system must be hard coded.
$root = dirname(dirname(dirname(__DIR__)));
require_once $root . '/redcap_connect.php';

class EdocsTest extends \ExternalModules\ModuleBaseTest
{
   private function testReadFileContent() {
      $edocID = 19;
      $instance = AdvancedImport::getInstance();
      $contents = $instance->getUploadedFileContents($edocID);
      $this->assertIsInt($edocID);
   }


}