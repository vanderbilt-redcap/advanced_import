<?php
namespace Vanderbilt\AdvancedImport;

$page = new \HtmlPage();
$page->PrintHeaderExt();
$root = dirname(__FILE__);

$data_directory = AdvancedImport::getDataDirectory();
if(preg_match("#advanced_import$#", $data_directory)) {
  AdvancedImport::chmod_r($data_directory);
  print ("fixed");
}else {
  print ("not fixed");
}

?>


<?php
$page->PrintFooterExt();
?>

