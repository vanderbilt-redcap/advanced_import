<?php
namespace Vanderbilt\AdvancedImport;

use ExternalModules\ExternalModules;
use Jobs;
use REDCap;
use Vanderbilt\AdvancedImport\App\Helpers\InstanceSeeker;
use Vanderbilt\AdvancedImport\App\Helpers\RecordHelper;
use Vanderbilt\AdvancedImport\App\Models\Import;
use Vanderbilt\AdvancedImport\App\Models\Importers\AppendUpdate;
use Vanderbilt\AdvancedImport\App\Models\Importers\ImporterFactory;
use Vanderbilt\AdvancedImport\App\Models\ImportSettings;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;
use Vanderbilt\AdvancedImport\App\Models\Queue\ImportJob;
use Vanderbilt\AdvancedImport\App\Models\Queue\Queue;
use Vanderbilt\AdvancedImport\App\Traits\CanReadCSV;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
$module_path = $module->getModulePath();
include($module_path.'header.php');

// $module->resetDatabase();
$moduleId = $module->getId();
// $redcapCronJobReturnMsg = \ExternalModules\ExternalModules::callCronMethod($moduleId, $cronName);

/* $queue = new Queue();
$jobs = $queue->getJobsByStatus();
$db = AdvancedImport::colDb();
foreach($jobs as $job) {
    
    $metadata = $db->getMetadata('jobs');
} */

/* $db = AdvancedImport::colDb();
$result = $db->search(Job::TABLE_NAME, '`id`>? AND `status`=? OR `status`=?', [8, 'completed']);
while ($row = $result->fetch_assoc()) {
    echo @$row['id'];
    $success = $db->update(Job::TABLE_NAME, ['status'=>'completed'], '`id`=? AND `status`=?', [@$row['id'], 'completed']);
} */

// $importer = ImporterFactory::create($project, $settings, $instanceSeeker, $record_helper); */


// ExternalModules::callTimedCronMethods();
// ExternalModules::callCronMethod($moduleId,$cronName='advanced_import_process_jobs');
// ExternalModules::callCronMethod($moduleId,$cronName='advanced_import_check_jobs');
/* $project_id = 33;
$job = makejob($project_id, $settings3);
print_r($job);
$result = $job->process(); */



?>




<?php 
$page->PrintFooterExt();
?>

