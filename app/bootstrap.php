<?php
namespace Vanderbilt\AdvancedImport\App;

$app_root = dirname(dirname(__FILE__));
$redcap_root = dirname(dirname($app_root));
require_once join([$app_root,'vendor','autoload.php'],DIRECTORY_SEPARATOR);

error_reporting(E_ALL);