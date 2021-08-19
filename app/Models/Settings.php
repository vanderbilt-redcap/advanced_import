<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Traits\CanGetProjectData;

class Settings
{
    use CanGetProjectData;

    /**
     *
     * @param Project $project
     */
	function __construct($project)
	{
        $this->project = $project;
    }
    

    function getSettings()
    {   
        $project_id = $this->project->project_id;
        $project_data = $this->getProjectData($this->project);
        $primary_keys = $this->getPrimaryKeys($this->project);
        $redcap_version = REDCAP_VERSION;
        $app_path_webroot_full = APP_PATH_WEBROOT_FULL;
        $project_dashboard_url = "{$app_path_webroot_full}redcap_v{$redcap_version}/DataEntry/record_status_dashboard.php?pid={$project_id}";
        $checkbox_fields = \MetaData::getCheckboxFields($project_id);
        $data = compact(
            'project_id',
            'project_data',
            'primary_keys',
            'redcap_version',
            'app_path_webroot_full',
            'project_dashboard_url',
            'checkbox_fields',
        );
        return $data;
    }


}