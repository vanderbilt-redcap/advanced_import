<?php namespace Vanderbilt\AdvancedImport\App\Controllers;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Settings;

class SettingsController extends BaseController
{
    private $module;

    function __construct()
    {
        global $module;
        parent::__construct();
		
        $this->module = $module;
		$this->app = new AdvancedImport($module);
    }
    
    function getSettings()
    {
        global $lang;
        $project_id = $_GET['pid'];
        $model = new Settings($this->module);
        $data = $model->getSettings($project_id);
        return $this->printJSON($data);
    }
}