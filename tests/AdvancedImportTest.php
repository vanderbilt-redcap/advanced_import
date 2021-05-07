<?php namespace Vanderbilt\AdvancedImport\tests;

use Generator;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;

// For now, the path to "redcap_connect.php" on your system must be hard coded.
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../../../redcap_connect.php';

class AdvancedImportTest extends \ExternalModules\ModuleBaseTest
{
   function testCompareVersions(){
      $this->assertSame(1, $this->module->compareVersions('v1.0.0', 'v1.7.0'));
      $this->assertSame(-1,  $this->module->compareVersions('v1.7.0', 'v1.0.0'));
      $this->assertSame(0, $this->module->compareVersions('v1.7.0', 'v1.7.0'));
      $this->assertSame(1, $this->module->compareVersions('v1.7.0', 'v1.7.1'));
   }

   function testCkeckJobTable() {
       $db = AdvancedImport::colDb();
       $metadata = $db->getMetadata(Job::TABLE_NAME);
       $fields = @$metadata['fields'];
       $this->assertArrayHasKey('fields', $metadata);
       $this->assertContains('processed_lines', $fields);
       $this->assertSame(true, is_array($fields));
   }

   function testSearchJob() {
        $db = AdvancedImport::colDb();
        $generator = $db->search(Job::TABLE_NAME, '`id`=?', [1]);
        $this->assertInstanceOf(Generator::class, $generator);
    }

    function testQueryJob() {
        $db = AdvancedImport::colDb();
        $query_string = "SELECT * FROM `jobs` WHERE `status`=?";
        $result = $db->query($query_string, ['completed']);
        $row = db_fetch_assoc($result);
        $this->assertArrayHasKey('processed_lines', $row);
    }
}