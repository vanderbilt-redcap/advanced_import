<?php namespace Vanderbilt\AdvancedImport\tests;

use Generator;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;

// For now, the path to "redcap_connect.php" on your system must be hard coded.
$root = dirname(dirname(dirname(__DIR__)));
require_once $root . '/redcap_connect.php';

class DatabaseTest extends \ExternalModules\ModuleBaseTest
{
    function testWorkingDirectories() {
        $success = $this->module->createWorkingDirectories();
        $this->assertSame(true, $success);
    }

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

   function testCheckJobTable() {
       $db = AdvancedImport::colDb();
       $metadata = $db->getMetadata(Job::TABLE_NAME);
       $fields = @$metadata['fields'];
       $this->assertArrayHasKey('fields', $metadata);
       $this->assertContains('processed_lines', $fields);
       $this->assertSame(true, is_array($fields));
   }

   function testSearchJob() {
        $db = AdvancedImport::colDb();
        $query = $db->search(Job::TABLE_NAME, '`id`=?', [1]);
        $generator = $query->getResultGenerator();
        $this->assertInstanceOf(Generator::class, $generator);
    }
    
    function testQueryCompletedJobs() {
        $db = AdvancedImport::colDb();
        $query_string = "SELECT * FROM `jobs` WHERE `status`=?";
        $query = $db->makeQuery($query_string, ['completed']);
        $results = $query->fetch_all();
        $this->assertIsArray($results);
    }
}