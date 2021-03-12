<?php namespace Vanderbilt\AdvancedImport\App\Controllers;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Settings;

class SettingsController extends BaseController
{
    function __construct()
    {
        parent::__construct();
    }
    
    function getSettings()
    {
        global $lang;
        $project_id = $_GET['pid'];
        $project = new Project($project_id);
        $model = new Settings($project);
        $data = $model->getSettings();
        return $this->printJSON($data);
    }
}