<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Vanderbilt\AdvancedImport\App\Traits\CanGetProjectData;

/**
 * @property string field_delimiter
 * @property string text_qualifier
 * @property string primary_key
 * @property array dynamic_keys
 * @property int field_name_row
 * @property int data_row_start
 * @property int|null data_row_end
 * @property array mapping
 * @property string import_mode
 * @property int project_id
 * @property int event_id
 * @property string form_name
 */
class ImportSettings
{
    use CanGetProjectData;

    const DEFAULT_SETTINGS = [
        'field_delimiter'   => "\t",
        'text_qualifier'    => ',',
        'primary_key'       => '',
        'dynamic_keys'      => [],
        'field_name_row'    => 0,
        'data_row_start'    => 1,
        'data_row_end'      => null,
        'mapping'           => [],
        // 'parsing'           => [], // dates_format
        'dates_format'      => [], // dates_format
        'import_mode'       => '',
        'project_id'        => null,
        'event_id'          => null,
        'form_name'         => null,
    ];

    /**
     * available settings
     *
     * @var object
     */
    private $settings;

    function __construct($settings)
    {
        $this->settings = $this->filterAllowedSettings($settings);
    }

    /**
     * get the mapped fields checking against the form fields.
     * remove the dynamic keys if specified.
     * dynamic keys are not used when looking for an unique instance in a record instance.
     *
     * @param boolean $include_dynamic
     * @return array
     */
    function getMappedFormFields($include_dynamic=true)
    {
        $mapping = (array)$this->mapping;
        $form_fields = $this->getProjectFormFields($this->project_id, $this->form_name);
        $mapped_fields = array_intersect($form_fields, array_keys($mapping));
        if(!$include_dynamic) $mapped_fields = array_diff($mapped_fields, $this->dynamic_keys);
        return $mapped_fields;
    }

    /**
     * use non dynamic mapped fields to filter
     * data. This data will be use to identify unique entries
     *
     * @param array $data
     * @return array filtered data
     */
    function getFormData($data, $include_dynamic=false)
    {
        $static_mapped_form_fields = $this->getMappedFormFields($include_dynamic); // get non-dynamic form fields
        $unique_data = array_intersect_key((array)$data, array_flip($static_mapped_form_fields));
        return $unique_data;
    }

    private function filterAllowedSettings($settings)
    {
        $settings = array_intersect_key((array)$settings, self::DEFAULT_SETTINGS);
        foreach ($settings as $key => $value) {
            // set default values for missing settings
            $settings[$key] = $value ?: self::DEFAULT_SETTINGS[$key];
        }
        return (object)$settings;
    }

    public function __get($name)
    {
        if (property_exists($this->settings, $name)) {
            return $this->settings->$name;
        }

        $trace = debug_backtrace();
        trigger_error(
            'Undefined property via __get(): ' . $name .
            ' in ' . $trace[0]['file'] .
            ' on line ' . $trace[0]['line'],
            E_USER_NOTICE);
        return null;
    }
}