<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Traits\CanGetProjectData;

class Settings extends BaseModel
{
    use CanGetProjectData;

    /**
     * constructor
     *
     * @param AdvancedImport $module
     */
	function __construct($module)
	{
        $this->module = $module;
		parent::__construct();
    }
    

    function getSettings($project_id)
    {   
        $project_data = $this->getProjectData($project_id);
        $primary_keys = $this->getPrimaryKeys($project_id);
        $data = compact('project_id', 'project_data', 'primary_keys');
        return $data;
    }


}