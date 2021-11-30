<?php namespace Vanderbilt\AdvancedImport\Tests;

use REDCap;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Queue\Queue;
use Vanderbilt\AdvancedImport\App\Models\Queue\ImportJob;
use Vanderbilt\AdvancedImport\App\Interfaces\ObserverInterface;
use Vanderbilt\AdvancedImport\App\Models\Importers\AppendUpdate;


// For now, the path to "redcap_connect.php" on your system must be hard coded.
$root = dirname(dirname(dirname(__DIR__)));
require_once $root . '/redcap_connect.php';

class ProcessTest extends \ExternalModules\ModuleBaseTest
{
    /**
     * Undocumented function
     *
     * @return void
     */
    public function setUp():void {
        $this->project_id = 33;
        $this->jobID = 25;
        $this->user_id = 2;
        $this->csvFile = '33-import-test.csv';
        $this->csvFile = '24000kb.csv';
    }
    
    function testProcessExistingJob() {  
        $db = AdvancedImport::colDb();
        $query = $db->search(ImportJob::TABLE_NAME, '`id`=?', [$this->jobID]);
        if($row = $query->fetch_assoc()) {
            $job = new ImportJob($row);
            $job->markReady();
            $job->process();
        }

        $this->assertTrue(true);
    }


   
}