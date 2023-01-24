<?php namespace Vanderbilt\AdvancedImport\Tests;

use Vanderbilt\AdvancedImport\AdvancedImport;



class EdocsTest extends \ExternalModules\ModuleBaseTest
{
   private function testReadFileContent() {
      $edocID = 19;
      $instance = AdvancedImport::getInstance();
      $contents = $instance->getUploadedFileContents($edocID);
      $this->assertIsInt($edocID);
   }


}