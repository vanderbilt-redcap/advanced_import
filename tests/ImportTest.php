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

    function testCopyCsvFile() {
        $module = AdvancedImport::getInstance();
        $getTestFilePath = function($fileName) use($module) {
            $modulePath = $module->getModulePath();
            $filePath =  implode(DIRECTORY_SEPARATOR,[$modulePath, 'data', $fileName]);
            return $module->getSafePath($filePath);

        };
        $safeSrcPath = $getTestFilePath($this->csvFile);

        $dst_path = AdvancedImport::getUploadedFilePath($this->csvFile);
        $safeDstPath = $module->getSafePath($dst_path, $root='/');

        $result = copy($safeSrcPath, $safeDstPath);
        $this->assertTrue($result);
    }

    function testDeleteAllData() {
        define('PROJECT_ID', $this->project_id);
        $getTotal = function() {
            $dataTotalQueryString = sprintf('SELECT count(`record`) AS `total` FROM `redcap_data` WHERE project_id=%u', $this->project_id);
            $result = db_query($dataTotalQueryString);
            $deleted = false;
            if($row = db_fetch_assoc($result)) {
                return intval(@$row['total']);
            }
            return false;
        };
        $deleteAll = function() {
            $project = new \Project($this->project_id);
            $dataQueryString = sprintf('SELECT distinct `record` FROM `redcap_data` WHERE project_id=%u', $this->project_id);
            $result = db_query($dataQueryString);
            while($row = db_fetch_assoc($result)) {
                $record = @$row['record'];
                \Records::deleteRecord($record, $project->table_pk, $project->multiple_arms, $project->project['randomization'], $project->project['status'], $project->project['require_change_reason'], $arm_id=false, " (AdvancedImport module)");
            }
        };
        $totalStart = $getTotal();
        $deleted = $totalStart == 0;
        if(!$deleted) {
            $deleteAll();
            $totalEnd = $getTotal();
            $deleted = $totalEnd == 0;
        }
        $this->assertTrue($deleted);

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
        /* 
        0 - record_id
        1 - text_box
        2 - notes_box
        3 - email
        4 - date
        5 - phone
        6 - option_1
        7 - option_2
        8 - option_3
        9 - option_4
        10 - option_5
        */
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
                'text_box' => [1],
                'email' => [3],
                'phone' => [5],
                'record_id' => [0],
                'checkbox' => [null,7,8,9,10,11],
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