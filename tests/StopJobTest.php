<?php namespace Vanderbilt\AdvancedImport\Tests;

use REDCap;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;
use Vanderbilt\AdvancedImport\App\Models\Queue\Queue;
use Vanderbilt\AdvancedImport\App\Models\Queue\ImportJob;
use Vanderbilt\AdvancedImport\App\Interfaces\ObserverInterface;
use Vanderbilt\AdvancedImport\App\Models\Importers\AppendUpdate;




class StopJobTest extends \ExternalModules\ModuleBaseTest
{
    /**
     * Undocumented function
     *
     * @return void
     */
    public function setUp():void {

    }
    
    function testProcessExistingJob() {
        $db = AdvancedImport::colDb();
        $query = $db->search(ImportJob::TABLE_NAME, '`status`=?', ['processing']);
        $id = null;
        if($row = $query->fetch_assoc()) {
            if($id = @$row['id']) {
                Job::createActionFlag($id, Job::ACTION_STOP);
                print('stop action created'.PHP_EOL);
            }
        }
        if(!$id) print('no running process detected'.PHP_EOL);

        $this->assertTrue(true);
    }

    
   
}