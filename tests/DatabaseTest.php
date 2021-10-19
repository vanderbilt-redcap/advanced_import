<?php namespace Vanderbilt\AdvancedImport\Tests;

use Generator;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;

// For now, the path to "redcap_connect.php" on your system must be hard coded.
$root = dirname(dirname(dirname(__DIR__)));
require_once $root . '/redcap_connect.php';

class DatabaseTest extends \ExternalModules\ModuleBaseTest
{
    private $testTableName = 'test';

    function testWorkingDirectories() {
        $success = $this->module->createWorkingDirectories();
        $this->assertSame(true, $success);
    }

    function testCreateTable() {
        $db = AdvancedImport::colDb();
        $db->createTable($this->testTableName, ['fields'=>['first_name','last_name','email']], $drop=true);
        $metadata = $db->getMetadata('test');
        $this->assertArrayHasKey('primary_key', $metadata);
    }

    function testInsertData() {
        $data = [
            ['first_name'=>'Luna','last_name'=>'Delacqua','email'=>'luna@email.com'],
            ['first_name'=>'Stella','last_name'=>'Delacqua','email'=>'stella@email.com'],
        ];
        $db = AdvancedImport::colDb();
        $lastId = null;
        foreach ($data as $entry) {
            $lastId = $db->insert($this->testTableName, $entry);
        }
        $this->assertIsNumeric($lastId);
    }

    function testQueryTable() {
         $db = AdvancedImport::colDb();
         $query_string = sprintf("SELECT * FROM `%s` WHERE `last_name`=?", $this->testTableName);
         $query = $db->runQuery($query_string, ['Delacqua']);
         $row = $query->fetch_assoc();
         $this->assertEquals('Luna', @$row['first_name'], 'data was not found');
    }

    function testSearchTable() {
         $db = AdvancedImport::colDb();
         $query = $db->search($this->testTableName, '`last_name`=?', ['Delacqua']);
         $row = $query->fetch_assoc();
         $this->assertEquals('Luna', @$row['first_name'], 'data was not found');
    }

    function testUpdateEntry() {
        $db = AdvancedImport::colDb();
        $db->update($this->testTableName, ['first_name'=>'Stella the cat'], '`first_name`=?', ['Stella']);
        $query = $db->search($this->testTableName, '`last_name`=? AND `first_name` LIKE ?', ['Delacqua', 'Stella%']);
        $row = $query->fetch_assoc();
        $this->assertEquals('Stella the cat', @$row['first_name'], 'data does not match');
    }

    function testDeleteEntry() {
        $db = AdvancedImport::colDb();
        $db->delete($this->testTableName, '`first_name`=?', ['Luna']);
        $query = $db->search($this->testTableName, '`last_name`=? AND `first_name`=?', ['Delacqua', 'Luna']);
        $row = $query->fetch_assoc();
        $this->assertNull($row, 'data was found');
     }

    function testDropTable() {
        $db = AdvancedImport::colDb();
        $db->dropTable($this->testTableName);
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

    
    function testQueryCompletedJobs() {
        $db = AdvancedImport::colDb();
        $query_string = "SELECT * FROM `jobs` WHERE `status`=?";
        $query = $db->runQuery($query_string, ['completed']);
        $results = $query->fetch_all();
        $this->assertIsArray($results);
    }
}