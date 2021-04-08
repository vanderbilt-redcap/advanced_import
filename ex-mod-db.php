<?php
namespace Vanderbilt\AdvancedImport;

use Vanderbilt\AdvancedImport\App\Helpers\ExModDatabase;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;

$page = new \HtmlPage();
$page->PrintHeaderExt();
$root = dirname(__FILE__);


$data = [
  ['test' => 123, 'ritest' => "allora com'è", 'status' => 'processing', 'processed_lines' => 1234],
  ['test' => 456, 'ritest' => "non so", 'status' => 'processing', 'processed_lines' => 223],
  ['test' => 678, 'ritest' => "che mi racconti", 'status' => 'processing', 'processed_lines' => 444],
];

$exMod_db = new ExModDatabase($project_id);
$tableName = Job::TABLE_NAME;
$exMod_db->createTable($tableName, $drop=true);
foreach ($data as $entry) {
  $exMod_db->insert($tableName, $entry);
}
$result = $exMod_db->update($tableName, ['processed_lines'=>111], ['__id', '2']);
print $result ? 'updated' : 'error';
$result = $exMod_db->delete($tableName, 2);
print $result ? 'deleted' : 'error';

$list = $exMod_db->search($tableName);

$query_string = sprintf(
  "SELECT `value`->'$.status' FROM `%s` WHERE `value`->'\$.__id'=?",
  AdvancedImport::dbExMod()::getRealTableName(Job::TABLE_NAME)
);

$result = $exMod_db->query($query_string, ['id'=>'2']);

$results = [];
while($row = db_fetch_assoc($result)) {
  $results[] = $row;
}

print_r([$hostname, $username, $password, $db, $port, $db_socket]);

/* $json = '{"test":123,"test2":"abc"}'; */
/* 
$module->setProjectSetting('test', $json); */



/* $test = $module->getProjectSetting('test'); */

/* print_r(json_decode($test, JSON_PRETTY_PRINT)); */
?>
<pre><?= print_r($results) ?></pre>

<?php
$page->PrintFooterExt();
?>

