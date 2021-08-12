<?php namespace Vanderbilt\AdvancedImport\tests;

use Vanderbilt\AdvancedImport\App\Models\Queue\ImportJob;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;

// For now, the path to "redcap_connect.php" on your system must be hard coded.
$root = dirname(dirname(dirname(__DIR__)));
require_once $root . '/redcap_connect.php';

class ImportTest extends \ExternalModules\ModuleBaseTest
{

    function testImportjob() {
        $settings = [
            'files' => [],
            'field_delimiter' => ",",
            'text_qualifier' => '"',
            'field_name_row' => 0,
            'data_row_start' => 1,
            'data_row_end' => null,
            'dates_format' => 'n\/j\/Y G:i',
            'import_mode' => "append-update",
            'event_id' => "59",
            'form_name' => "vital_signs",
            'primary_key' => "mrn",
            'dynamic_keys' => [],
            'mapping' =>  ["mrn"=>0,"vitals_time"=>2,"vitals_label_2"=>3,"vitals_value"=>4]
        ];
        $params = [
            'id' => "1",
            'type' => Job::TYPE_IMPORT,
            'error' => '',
            'status' => Job::STATUS_READY,
            'user_id' => "2",
            'filename' => "86a109d26a3b8c57b6d28bf83e3c3827.csv",
            'settings' => $settings,
            'created_at' => "2021-06-28 21:35:42",
            'project_id' => "32",
            'updated_at' => "2021-06-28 23:07:27",
            'completed_at' => "2021-06-28 23:07:27",
            'processed_lines' => "0",
        ];
        
        $job = new ImportJob($params);

        $result = $job->process();
        print_r($result);

        $metadata = [];
        $this->assertEmpty($metadata);
    }

   
}