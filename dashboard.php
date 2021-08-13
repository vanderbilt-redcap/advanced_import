<?php
namespace Vanderbilt\AdvancedImport;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
$module_path = $module->getModulePath();
include($module_path.'header.php');


?>

<script src="<?=APP_PATH_JS?>vue.min.js"></script>
<script src="<?= $module->getUrl('./assets/js/advanced_import/dist/advanced_import.umd.js'); ?>"></script>
<link rel="stylesheet" href="<?= $module->getUrl('./assets/js/advanced_import/dist/advanced_import.css'); ?>">

<div id="advanced-import-container">
  <advanced-import></advanced-import>
</div>

<script>
  (function() {
    const app = new Vue({
      render: h => h(advanced_import),
    }).$mount('#advanced-import-container')
    window.advancedImportComponent = app.$children[0]
  }(window.advancedImportComponent = window.advancedImportComponent || {}))
  </script>

<?php 
$page->PrintFooterExt();
?>

