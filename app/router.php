<?php
namespace Vanderbilt\AdvancedImport\App;

use Vanderbilt\AdvancedImport\App\Controllers\BaseController;
use Vanderbilt\AdvancedImport\App\Helpers\Router;

require_once __DIR__."/bootstrap.php";

// httpMethod, route, handler
$routes = [
    ['GET', "/test[/{id:\d+}]", ['Vanderbilt\AdvancedImport\App\Controllers\BaseController/test']],
    ['GET', "settings", ['Vanderbilt\AdvancedImport\App\Controllers\SettingsController/getSettings']],
    // ['POST', "import", ['Vanderbilt\AdvancedImport\App\Controllers\ImportController/import']],
    ['POST', "enqueue", ['Vanderbilt\AdvancedImport\App\Controllers\ImportController/enqueue']],
    ['POST', "parse", ['Vanderbilt\AdvancedImport\App\Controllers\ImportController/parse']], // parse file and get info
    ['POST', "upload", ['Vanderbilt\AdvancedImport\App\Controllers\UploadController/upload']], // parse file and get info
    ['GET', "export", ['Vanderbilt\AdvancedImport\App\Controllers\ExportController/export']],
    ['GET', "logs", ['Vanderbilt\AdvancedImport\App\Controllers\LogsController/index']],
    ['DELETE', "logs", ['Vanderbilt\AdvancedImport\App\Controllers\LogsController/delete']],
    ['GET', "jobs", ['Vanderbilt\AdvancedImport\App\Controllers\JobsController/index']],
    ['POST', "jobs/{id:\d+}", ['Vanderbilt\AdvancedImport\App\Controllers\JobsController/updateJob']],
    ['POST', "jobs/{id:\d+}/stop", ['Vanderbilt\AdvancedImport\App\Controllers\JobsController/stopJob']],
    ['POST', "jobs/{id:\d+}/start", ['Vanderbilt\AdvancedImport\App\Controllers\JobsController/startJob']],
    ['DELETE', "jobs/{id:\d+}", ['Vanderbilt\AdvancedImport\App\Controllers\JobsController/deleteJob']],
];

// create a BaseController to manage common routes or errors
$baseController = new BaseController();

$router = new Router($routes, $baseController);

$route = Router::extractRoute('_route');

$router->dispatch($route);