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
$table_name = 'test';
$db = AdvancedImport::colDb();
$db->createTable($table_name, ['fields'=>['first_name','last_name','email']], $drop=true);
$metadata = $db->getMetadata($table_name);

$db->insert($table_name, [
    'first_name'=> 'francesco',
    'last_name'=> 'delacqua',
    'email'=> 'francesco.delacqua@vumc.org'
]);

$generator = $db->search($table_name, '`id`=?', [1]);
while($row = $generator->current()) {
    $first_name = @$row['first_name'];
    echo $first_name;
    $generator->next();
}

$db->dropTable('test');
$metadata = $db->getMetadata($table_name);

?>




<?php 
$page->PrintFooterExt();
?>

