<?php
namespace Vanderbilt\AdvancedImport;

use Vanderbilt\AdvancedImport\App\Helpers\ColumnarDatabase;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;

$page = new \HtmlPage();
$page->PrintHeaderExt();
$root = dirname(__FILE__);

function test($module) {
  $json = '{"type": "import", "error": null, "status": "completed", "user_id": 2, "filename": "2e0c45e77b76beef4d3a36271315a3c6.csv", "settings": {"files": {"$path": ""}, "mapping": {"mrn": 0, "last_name": 2, "first_name": 1}, "event_id": "59", "form_name": "demography", "import_mode": "append-update", "primary_key": "mrn", "data_row_end": null, "dates_format": "Y-m-d H:i", "dynamic_keys": [], "data_row_start": 1, "field_name_row": 0, "text_qualifier": "\"", "field_delimiter": ","}, "created_at": "2021-05-04 12:35:21", "project_id": 26, "updated_at": "2021-05-04 12:52:28", "completed_at": "2021-05-04 12:52:28", "processed_lines": 0}';
  $json1 = '{"type": "import", "error": null, "status": "processing", "user_id": 2, "filename": "2e0c45e77b76beef4d3a36271315a3c6.csv", "settings": {"files": {"$path": ""}, "mapping": {"mrn": 0, "last_name": 2, "first_name": 1}, "event_id": "59", "form_name": "demography", "import_mode": "append-update", "primary_key": "mrn", "data_row_end": null, "dates_format": "Y-m-d H:i", "dynamic_keys": [], "data_row_start": 1, "field_name_row": 0, "text_qualifier": "\"", "field_delimiter": ","}, "created_at": "2021-05-04 12:35:21", "project_id": 26, "updated_at": "2021-05-04 12:52:28", "completed_at": "2021-05-04 12:52:28", "processed_lines": 0}';
  $entry = json_decode($json, $assoc=true);
  $entry1 = json_decode($json1, $assoc=true);
  
  $db = new ColumnarDatabase($module);
  $tableName = Job::TABLE_NAME;
  $db->createTable($tableName, [
    'primary_key'=>'id',
    'fields' => ['type','error','status','user_id','filename','settings','created_at','project_id','updated_at','completed_at','processed_lines'],
  ], $drop=true);
  $db->insert($tableName, $entry);
  $db->insert($tableName, $entry1);
  
  $resutls = $db->update($tableName, $params=['status'=>'error'], $whereStatement='`id`=?', $whereParams=[2]);
  
  $query_string = sprintf("SELECT * FROM `jobs` WHERE `status`=?");
  $result = $db->query($query_string, ['completed']);
  while($row=db_fetch_assoc($result)) $results[] = $row;
}
// test($module);
?>
<pre><?= print_r($results) ?></pre>

<?php
$page->PrintFooterExt();
?>

