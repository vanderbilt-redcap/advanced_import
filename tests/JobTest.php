<?php namespace Vanderbilt\AdvancedImport\Tests;

use REDCap;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Queue\Queue;
use Vanderbilt\AdvancedImport\App\Models\Queue\ImportJob;
use Vanderbilt\AdvancedImport\App\Interfaces\ObserverInterface;
use Vanderbilt\AdvancedImport\App\Models\Importers\AppendUpdate;




class JobTest extends \ExternalModules\ModuleBaseTest
{

    private $project_id;
    private $jobID;
    private $user_id;
    private $csvFile;

    /**
     * Undocumented function
     *
     * @return void
     */
    public function setUp():void {
        $this->project_id = 33;
        $this->jobID = 10;
        $this->user_id = 2;
        $this->csvFile = '33-import-test.csv';
        $this->csvFile = '24000kb.csv';
    }
    
    function testProcessExistingJob() {
        $Observer = new class implements ObserverInterface {
            private $errors = [];
            function update($subject, $event = null, $data = null)
            {
                switch ($event) {
                    case AppendUpdate::NOTIFICATION_DATA_SAVE_ERROR:
                        $message = $data['message'];// ['save_response', 'record', 'errors', 'message']
                        print($message.PHP_EOL);
                        break;
                    case AppendUpdate::NOTIFICATION_PROCESS_ERROR:
                        $message = $data['message'];// ['save_response', 'record', 'errors', 'message']
                        print($message.PHP_EOL);
                        break;
                    default:
                        break;
                }
            }
        };
        $db = AdvancedImport::colDb();
        $query = $db->search(ImportJob::TABLE_NAME, '`id`=?', [$this->jobID]);
        if($row = $query->fetch_assoc()) {
            $job = new ImportJob($row);
            $job->process();
        }

        $this->assertTrue(true);
    }

    function testCopyCsvFile() {
        $module = AdvancedImport::getInstance();
        $getTestFilePath = function($fileName) use($module) {
            $filePath = dirname(__FILE__)."/data/{$fileName}";
            return $module->getSafePath($filePath);
        };
        $safeSrcPath = $getTestFilePath($this->csvFile);

        $dst_path = AdvancedImport::getUploadedFilePath($this->csvFile);
        $safeDstPath = $module->getSafePath($dst_path, $root='/');

        $result = copy($safeSrcPath, $safeDstPath);
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
                'checkbox' => [
                    '1' => 6,
                    '2' => 7,
                    '3' => 8,
                    '4' => 9,
                ],
            ]
        ];
        /* 
        0 PATIENT_ID
        1 ENCOUNTER_ID
        2 ENTRY_TIME
        3 SPO2
        4 FIO2
        5 O2FLOW_LPM
        6 O2SRC
        7 MODE_VENT
        8 RT_SPO2
        9 RT_FIO2
        10 RT_O2SRC
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
                'record_id' => [0],
                'text_box' => [1],
                'number' => [4],
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