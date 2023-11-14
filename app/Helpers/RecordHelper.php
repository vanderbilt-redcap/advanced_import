<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

use Project;
use Records;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Traits\CanReadCSV;
use Vanderbilt\AdvancedImport\App\Models\ImportSettings;
use Vanderbilt\AdvancedImport\App\Traits\CanGetRecordData;
use Vanderbilt\AdvancedImport\App\Traits\CanGetProjectData;

class RecordHelper
 {
    use CanGetProjectData;
    use CanGetRecordData;
    use CanReadCSV;

    private $project;
    private $project_id;
    private $settings;
    private $file_path;
    private $csv_to_redcap_mapping;

    static function unit_separator() { return chr(31); }
    static function record_separator() { return chr(30); }

    /**
     *
     * @param Project $project
     * @param ImportSettings $settings
     */
    public function __construct($project, $settings)
    {
        $this->project = $project;
        $this->project_id = $project->project_id;
        $this->settings = $settings;

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
    function reduceRecord($record_id, $field_name, $value, $instance_number=null, $record_seed=[])
    {
        $event_id = $this->settings->event_id;
        $addRepeatingData = function($form_name, $field_name, $value) use($record_id, $event_id, $instance_number, &$record_seed) {
            $record_seed[$record_id]['repeat_instances'][$event_id][$form_name][$instance_number][$field_name] = $value;
        };
        $addData = function($field_name, $value) use($record_id, $event_id, &$record_seed) {
            $record_seed[$record_id][$event_id][$field_name] = $value;
        };
        
        $form_name = $this->getFormNameForField($this->project, $field_name);
        $metadata =  $this->getFieldMetadata($this->project, $field_name);
        $fieldType = $metadata['element_type'] ?? null;
        // apply transformations based on field type
        switch ($fieldType) {
            case 'checkbox':
                $value = $this->visitCheckbox($field_name, $value);
                break;
            default:
                break;
        }
        $is_repeating = $this->isRepeatingForm($this->project, $event_id, $form_name);
        if($is_repeating) $addRepeatingData($form_name, $field_name, $value);
        else $addData($field_name, $value);

        return $record_seed;
    }

    /**
     * modify the value if the field is a checkbox:
     * use each value as key
     * set 1 if the value is present or 0 if not
     *
     * @param string $field_name
     * @param array $values list of values
     * @return array
     */
    private function visitCheckbox($field_name, $values=[])
    {
        $checkboxFields = \MetaData::getCheckboxFields($this->project_id);
        $allCheckboxValues = $checkboxFields[$field_name] ?? [];
        $checkboxValues = [];
        foreach ($allCheckboxValues as $checkboxKey => $checkboxValue) {
            $checkboxValues[$checkboxKey] = in_array($checkboxKey, $values) ? 1 : 0;
        }
        return $checkboxValues;
    }

    function getAutoId($project_id)
    {
        return \DataEntry::getAutoId($project_id);
    }

    public function getRecordId($primary_key_field, $primary_key_value)
    {
        $project_id = $this->project_id;
        $query_string = sprintf(
            "SELECT DISTINCT record FROM ".AdvancedImport::getDataTable($this->project_id).
            " WHERE project_id=%u
            AND `field_name`='%s'
            AND `value`=%s",
            $project_id,
            $primary_key_field, checkNull($primary_key_value)
        );
        $result = db_query($query_string);
        if($row=db_fetch_assoc($result)) {
            return $row['record'] ?? false;
        }
        return false;
    }

    /**
     * get field name for primary and secondary keys in a project
     *
     * @return array ['primary_key', 'secondary_key']
     */
    function getPrimaryKeys()
    {
        $primary_key = $this->project->table_pk;
        $secondary_key = $this->project->project['secondary_pk'] ?? null;
        return [$primary_key, $secondary_key];
    }

 }