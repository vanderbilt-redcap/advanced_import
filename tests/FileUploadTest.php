<?php namespace Vanderbilt\AdvancedImport\Tests;

use Vanderbilt\AdvancedImport\AdvancedImport;



class FileUploadTest extends \ExternalModules\ModuleBaseTest
{
   
    function testGetFilePath() {
        $encryptedFileName = "+6Vdpj2te37v6k+/aqCBgKwT659R1lTB2Mm/yZsyGmzgs/J+4b7LYUyEEWY6LKLvm54s/M7bEi8bZkz9ap6rmQ==";
        $path = AdvancedImport::getUploadedFilePath($encryptedFileName);
        $encryptedFileName = "+6Vdpj2te37v6k+/aqCBgMX3J6bTTOkfji5D57z+u/Ky0prWrTepyIIbArHiqtWuvTfg9j18kbilmk0HgxGZcQ==";
        $path = AdvancedImport::getUploadedFilePath($encryptedFileName);
        $this->assertIsString($path);

    }

}