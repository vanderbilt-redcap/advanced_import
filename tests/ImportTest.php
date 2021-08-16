<?php namespace Vanderbilt\AdvancedImport\tests;

use REDCap;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Queue\ImportJob;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;
use Vanderbilt\AdvancedImport\App\Models\Queue\Queue;

// For now, the path to "redcap_connect.php" on your system must be hard coded.
$root = dirname(dirname(dirname(__DIR__)));
require_once $root . '/redcap_connect.php';

class ImportTest extends \ExternalModules\ModuleBaseTest
{
    private $createdJobId = null;

    /**
     * Undocumented function
     *
     * @return void
     */
    public function setUp():void {
        $this->project_id = 33;
        $this->user_id = 2;
        $this->csvFile = '33-import-test.csv';
    }

    function testDeleteAllData() {
        $queryString = sprintf('DELETE from `redcap_data` WHERE project_id=%u', $this->project_id);
        $result = db_query($queryString);
        $this->assertTrue($result);
    }

    /**
     * create a job
     * process the job
     * delete the job
     *
     * @return void
     */
    function testJobWorkflow() {
        $jobID = $this->createJob();
        $this->processJob($jobID);
        $deleted = $this->deleteJob($jobID);
    }

    private function createJob() {
        $settings = [
            'field_delimiter' => ",",
            'text_qualifier' => "\"",
            'field_name_row' => 0,
            'data_row_start' => 1,
            'data_row_end' => null,
            'dates_format' => "Y-m-d H:i",
            'import_mode' => "append-update",
            'event_id' => "60",
            'form_name' => "form_1",
            'primary_key' => "record_id",
            'dynamic_fields' => ['phone'],
            'mapping' => [
                'email' => [3],
                'phone' => [5],
                'record_id' => [0],
                'checkbox' => [8,9,10],
            ]
        ];
        
        $jobID = ImportJob::create($this->project_id, $this->user_id, $this->csvFile, $settings);
        $this->assertIsInt($jobID);
        return $jobID;
    }

    private function processJob($jobID) {
        $queue = new Queue();
        $jobs = $queue->getJobsByStatus();
        $processed = false;
        foreach ($jobs as $job) {
            if($job->id!=$jobID) continue;
            $job->process();
            $processed = true;
        }
        $this->assertTrue($processed);
        $data = REDCap::getData($this->project_id, 'array', $records=[508], $fields=[]);
        $this->assertNotEmpty($data);
        return $data;
    }

    private function deleteJob($jobID) {
        $db = AdvancedImport::colDb();
        $query = $db->search(ImportJob::TABLE_NAME, '`id`=?', [$jobID]);
        $deleted = false;
        if($row = $query->fetch_assoc()) {
            $deleted =$db->delete(ImportJob::TABLE_NAME, '`id`=?', [$jobID]);
        }
        $this->assertTrue($deleted);
        return $deleted;
    }

    

   
}