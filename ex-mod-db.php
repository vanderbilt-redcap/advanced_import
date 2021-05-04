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

$db = AdvancedImport::dbExMod();
$tableName = Job::TABLE_NAME;
$db->createTable($tableName, $drop=true);
foreach ($data as $entry) {
  $db->insert($tableName, $entry);
}
$list = range(1,30);
while($index = current($list)) {
  $entry = $data[0];
  $entry['index'] = $index;
  $db->insert($tableName, $entry);
  next($list);
}

$list = range(1,20);
while($index = current($list)) {
  $result = $db->update($tableName, ['processed_lines'=>$index, 'status'=>'processing'], ['__id', 2]);
  next($list);
}

$results = $db->search($tableName, ['index',30, '>'], 10, 10);
$counter = 0;
while ($entry = $results->current()) {
  echo $entry['__id'];
  $counter++;
  $results->next();
}
echo $counter;
$query_string = sprintf("SELECT `{processed_lines}` AS `processed_lines` FROM  `%s` WHERE `{index}`>? LIMIT 0,10", $tableName);
$result = $db->query($query_string, [13]);


while ($row = db_fetch_assoc($result)) {
  echo $row['processed_lines'];
}

print $result ? 'updated' : 'error';
$result = $db->delete($tableName, ['__id', 1]);
print $result ? 'deleted' : 'error';

$list = $db->search($tableName,[['status','processing','='],['__id',2]]);
while ($entry = $list->current()) {
  $test = @$entry['__id'];
  $list->next();
}


global $rc_connection;
$query_string = 'SELECT `value`->\'$.status\' AS `status` FROM `redcap_external_module_settings`  WHERE `external_module_id`=? AND `key` LIKE \'__ext_mod_table_jobs%\' AND `value`->\'$.__id\'=?';
$stmt = $rc_connection->prepare($query_string);
$params = ["ii", $id=1, $jobId=2];
$stmt->bind_param(...$params);
/* execute query */
$stmt->execute();

/* fetch value */
$result = $stmt->get_result();
$rows = [];
while($row = db_fetch_assoc($result)) {
  $rows[] = $row;
}



$query_string = sprintf(
  "SELECT `{processed_lines}` AS `processed_lines` FROM  `%s` WHERE `{__id}`=? AND `{status}`=?",
  Job::TABLE_NAME
);

$result = $db->query($query_string, [2, 'processing']);
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

