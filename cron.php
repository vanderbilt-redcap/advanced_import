<?php
namespace Vanderbilt\AdvancedImport;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
$module_path = $module->getModulePath();
include($module_path.'header.php');

// $module->resetDatabase();
$moduleId = $module->getId();
$cronName = 'advanced_import_process_jobs';
$redcapCronJobReturnMsg = \ExternalModules\ExternalModules::callCronMethod($moduleId, $cronName);



?>




<?php 
$page->PrintFooterExt();
?>

