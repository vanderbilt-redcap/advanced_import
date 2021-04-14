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

$key = $module->PREFIX."test";
$var = 'this is a test';
$key1 = $module->PREFIX."test1";
$var2 = ['asa'=>'this is a test'];
\apcu_add($key , $var , $ttl = 0 );
\apcu_add($key1 , $var , $ttl = 0 );

?>




<?php 
$page->PrintFooterExt();
?>

