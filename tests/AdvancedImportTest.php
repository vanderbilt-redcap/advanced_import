<?php namespace Vanderbilt\AdvancedImport\tests;

use Generator;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;

// For now, the path to "redcap_connect.php" on your system must be hard coded.
require_once __DIR__ . '/../../../redcap_connect.php';

class AdvancedImportTest extends \ExternalModules\ModuleBaseTest
{

    function testCreateTable() {
        $db = AdvancedImport::colDb();
        $db->createTable('test', ['fields'=>['first_name','last_name','email']], $drop=true);
        $metadata = $db->getMetadata('test');
        $this->assertArrayHasKey('primary_key', $metadata);
    }

    function testDropTable() {
        $db = AdvancedImport::colDb();
        $db->dropTable('test');
        $metadata = $db->getMetadata('test');
        $this->assertEmpty($metadata);
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
    
    function testQueryCompletedJobs() {
        $db = AdvancedImport::colDb();
        $query_string = "SELECT * FROM `jobs` WHERE `status`=?";
        $result = $db->query($query_string, ['completed']);
        $this->assertInstanceOf(\mysqli_result::class, $result);
    }

    function testWorkingDirectories() {
        $success = $this->module->createWorkingDirectories();
        $this->assertSame(true, $success);
    }
}