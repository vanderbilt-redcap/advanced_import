<?php
namespace Vanderbilt\AdvancedImport;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
$module_path = $module->getModulePath();
include($module_path.'header.php');

$version1 = 'v1.7.0';
$version2 = 'v1.7.1';
$compared = $module->compareVersions($version1, $version2, '<');

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
        components: {
          'advanced-import': advanced_import
        }
      }).$mount('#advanced-import-container')
      window.advancedImportComponent = app.$children[0]
  }(window.advancedImportComponent = window.advancedImportComponent || {}))
  </script>

<?php 
$page->PrintFooterExt();
?>

