<?php
namespace Vanderbilt\AdvancedImport;

use Vanderbilt\AdvancedImport\App\Helpers\ExModDatabase;
use Vanderbilt\AdvancedImport\App\Models\Queue\Queue;

$page = new \HtmlPage();
$page->PrintHeaderExt();
$root = dirname(__FILE__);


$data = [
  ['test' => 123, 'ritest' => "allora com'è", 'ancor' => 'mamma mia', 'processed_lines' => 1234],
  ['test' => 456, 'ritest' => "non so", 'ancor' => 'mamma mia', 'processed_lines' => 223],
  ['test' => 678, 'ritest' => "che mi racconti", 'ancor' => 'mamma mia', 'processed_lines' => 444],
];

$db = new ExModDatabase($project_id);
$tableName = 'test';
$db->createTable($tableName, $drop=true);
foreach ($data as $entry) {
  $db->insert($tableName, $entry);
}
$result = $db->update($tableName, ['processed_lines'=>111], ['__id', '2']);
print $result ? 'updated' : 'error';
$result = $db->delete($tableName, 2);
print $result ? 'deleted' : 'error';

$list = $db->search($tableName);



/* $json = '{"test":123,"test2":"abc"}'; */
/* 
$module->setProjectSetting('test', $json); */



/* $test = $module->getProjectSetting('test'); */

/* print_r(json_decode($test, JSON_PRETTY_PRINT)); */
?>
<pre><?= print_r($list) ?></pre>

<?php
$page->PrintFooterExt();
?>

