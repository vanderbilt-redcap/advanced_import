<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

use Vanderbilt\AdvancedImport\App\Traits\CanGetProjectData;
use Vanderbilt\AdvancedImport\App\Traits\CanGetRecordData;

class RecordHelper
 {
    use CanGetProjectData;
    use CanGetRecordData;

    public function __construct($project_id)
    {
        $this->project_id = $project_id;
    }

    public function setProjectId($project_id)
    {
        $this->project_id = $project_id;
    }

    /**
     * create a record data structure
     *
     * @param int $project_id
     * @param int $event_id
     * @param string $record_id
     * @param string $field_name
     * @param mixed $value
     * @param int $instance_number
     * @param array $record_seed
     * @return array
     */
    function reduceRecord($project_id, $event_id, $record_id, $field_name, $value, $instance_number=null, $record_seed=[])
    {
        $addRepeatingData = function($form_name, $field_name, $value) use($record_id, $event_id, $instance_number, &$record_seed) {
            @$record_seed[$record_id]['repeat_instances'][$event_id][$form_name][$instance_number][$field_name] = $value;
        };
        $addData = function($field_name, $value) use($record_id, $event_id, &$record_seed) {
            @$record_seed[$record_id][$event_id][$field_name] = $value;
        };
        
        $form_name = $this->getFormNameForField($project_id, $field_name);
        $is_repeating = $this->isRepeatingForm($project_id, $event_id, $form_name);
        if($is_repeating) $addRepeatingData($form_name, $field_name, $value);
        else $addData($field_name, $value);

        return $record_seed;
    }

    function getAutoId($project_id)
    {
        return \DataEntry::getAutoId($project_id);
    }

    /**
     * get the next available instance number for a form
     *
     * @param int $project_id
     * @param int $event_id
     * @param string $record
     * @param string $form_name
     * @return int
     */
    function getAutoInstanceNumber($project_id, $event_id, $record, $form_name)
    {

        $form_fields = $this->getProjectFormFields($project_id, $form_name);
        $fields_list = DatabaseQueryHelper::getQueryList($form_fields);
        $query_string = sprintf(
            "SELECT COALESCE(MAX(IFNULL(instance,1)),0)+1 AS next_instance
            FROM redcap_data
            WHERE project_id=%u
            AND event_id=%u
            AND record=%s
            AND field_name IN (%s)",
            $project_id, $event_id, checkNull($record), $fields_list
        );
        $result = db_query($query_string);
        if($row=db_fetch_object($result)) {
            $next_instance = $row->next_instance;
            return intval($next_instance);
        }
        throw new \Exception("Error finding the next instance number in project {$project_id}, record {$record}", 1);    
    }

 }