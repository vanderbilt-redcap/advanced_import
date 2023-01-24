<?php namespace Vanderbilt\AdvancedImport\Tests;

use REDCap;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Queue\Queue;
use Vanderbilt\AdvancedImport\App\Models\Queue\ImportJob;
use Vanderbilt\AdvancedImport\App\Interfaces\ObserverInterface;
use Vanderbilt\AdvancedImport\App\Models\Importers\AppendUpdate;




class ProcessTest extends \ExternalModules\ModuleBaseTest
{
    /**
     * Undocumented function
     *
     * @return void
     */
    public function setUp():void {
        $this->project_id = 16;
        $this->jobID = 1;
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