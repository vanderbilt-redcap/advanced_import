<?php
namespace Vanderbilt\AdvancedImport;

use Vanderbilt\AdvancedImport\App\Models\Import;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;
use Vanderbilt\AdvancedImport\App\Models\Queue\ImportJob;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
$module_path = $module->getModulePath();
include($module_path.'header.php');

// $module->resetDatabase();
$moduleId = $module->getId();
$cronName = 'advanced_import_process_jobs';
// $redcapCronJobReturnMsg = \ExternalModules\ExternalModules::callCronMethod($moduleId, $cronName);

$settings1 = [
    'files' => [],
    'field_delimiter' => ",",
    'text_qualifier' => '"',
    'field_name_row' => 0,
    'data_row_start' => 1,
    'data_row_end' => null,
    'dates_format' => 'n\/j\/Y G:i',
    'import_mode' => Import::IMPORT_STRATEGY_APPEND_UPDATE,
    'event_id' => "59",
    'form_name' => "vital_signs",
    'primary_key' => "mrn",
    'dynamic_keys' => [],
    'mapping' =>  ['mrn'=>0,'vitals_time'=>2,'vitals_label'=>3,'vitals_value'=>4]
];
$settings2 = [
    'files' => [],
    'field_delimiter' => ',',
    'text_qualifier' => '"',
    'field_name_row' => 0,
    'data_row_start' => 1,
    'data_row_end' => null,
    'dates_format' => 'n/j/Y G:i',
    'import_mode' => Import::IMPORT_STRATEGY_APPEND_UPDATE,
    'event_id' => 59,
    'form_name' => 'vital_signs',
    'primary_key' => 'mrn',
    'dynamic_keys' => ['vitals_label_2','vitals_label'],
    'mapping' => ['mrn'=>0,'vitals_time'=>2,'vitals_label_2'=>6,'vitals_value'=>4,'vitals_label'=> 7]
    
];
function makejob($settings)
{

    
    $params = [
        'id' => "1",
        'type' => Job::TYPE_IMPORT,
        'error' => '',
        'status' => Job::STATUS_READY,
        'user_id' => "2",
        'filename' => "86a109d26a3b8c57b6d28bf83e3c3827.csv",
        'settings' => json_encode($settings),
        'created_at' => "2021-06-28 21:35:42",
        'project_id' => "32",
        'updated_at' => "2021-06-28 23:07:27",
        'completed_at' => "2021-06-28 23:07:27",
        'processed_lines' => "0",
    ];
    
    $job = new ImportJob($params);
    return $job;
}

$job = makejob($settings2);
print_r($job);
// $result = $job->process();



?>




<?php 
$page->PrintFooterExt();
?>

