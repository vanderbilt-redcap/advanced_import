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
        $model = new Settings();
        $data = $model->getSettings($project_id);
        return $this->printJSON($data);
    }
}