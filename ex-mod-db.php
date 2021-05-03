<?php
namespace Vanderbilt\AdvancedImport;

use Vanderbilt\AdvancedImport\App\Models\Queue\Job;

$page = new \HtmlPage();
$page->PrintHeaderExt();
$root = dirname(__FILE__);


$data = [
  ['test' => 123, 'ritest' => "allora com'è", 'status' => 'processing', 'processed_lines' => 1234],
  ['test' => 456, 'ritest' => "non so", 'status' => 'processing', 'processed_lines' => 223],
  ['test' => 678, 'ritest' => "che mi racconti", 'status' => 'completed', 'processed_lines' => 444],
];

$exMod_db = AdvancedImport::dbExMod();
$tableName = Job::TABLE_NAME;
$exMod_db->createTable($tableName, $drop=true);
foreach ($data as $entry) {
  $exMod_db->insert($tableName, $entry);
}
$list = range(1,666);
while($index = current($list)) {
  $result = $exMod_db->update($tableName, ['processed_lines'=>$index, 'status'=>'ciao'], ['__id', 2]);
  next($list);
}
print $result ? 'updated' : 'error';
$result = $exMod_db->delete($tableName, 1);
print $result ? 'deleted' : 'error';

$list = $exMod_db->search($tableName,['status','processing','=']);


global $rc_connection;
$query_string = 'SELECT `value`->\'$.status\' AS `status` FROM `redcap_external_module_settings`  WHERE `external_module_id`=? AND `key` LIKE \'__ext_mod_table_jobs%\' AND `value`->\'$.__id\'=?';
$stmt = $rc_connection->prepare($query_string);
$params = ["ii", $id=1, $jobId=2];
$stmt->bind_param(...$params);
/* execute query */
$stmt->execute();

/* fetch value */
$result = $stmt->get_result();
while($row = db_fetch_assoc($result)) {
  $results[] = $row;
}



$query_string = sprintf(
  "SELECT `value`->>'$.processed_lines' AS `processed_lines` FROM `%s` WHERE `value`->>'$.__id'=? AND `value`->>'$.status'=?",
  AdvancedImport::dbExMod()::getRealTableName(Job::TABLE_NAME)
);

$result = $exMod_db->query($query_string, [2, 'processing']);
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

