<?php namespace Vanderbilt\AdvancedImport\App\Traits;

trait CanGetProjectData {

	function getProjectData($project_id)
    {
        $project = new \Project($project_id);
        $repeating_forms_events = $project->getRepeatingFormsEvents(); // list of repeating forms with custom label
        $data = [
            'project_info' => $project->project,
            'events_forms' => $project->eventsForms, // list of instruments
            'metadata' => $project->metadata, // data about fields
            'forms' => $project->forms, // list of forms with order (form_number) and fields
            'project' => $project, // list of instruments
            'repeating_forms_events' => $repeating_forms_events,
            'longitudinal' => $project->longitudinal,
        ];
        return (object)$data;
    }

    function getPrimaryKeys($project_id)
    {
        $project = new \Project($project_id);
        $primary_key = $project->table_pk;
        $secondary_key = $project->project['secondary_pk'];
        $primary_keys = [$primary_key];
        if(!empty($secondary_key)) $primary_keys[] = $secondary_key;
        return $primary_keys;
    }

    function getProjectMetadata($project_id)
    {
        $project = new \Project($project_id);
        return $project->metadata;
    }

	/**
	 * no use for this function yet and not sure what I want this to do
	 *
	 * @param object $project
	 * @return array
	 */
    function getProjectFormFields($project_id, $form_name)
    {
		$data = $this->getProjectData($project_id);
		$forms = $data->forms;
		$form = $forms[$form_name];
		return array_keys($form['fields']);
    }

    function isRepeatingForm($project_id, $event_id, $form_name)
    {
        $data = $this->getProjectData($project_id);
        $repeating_forms_events = $data->repeating_forms_events;
        if(!array_key_exists($event_id, $repeating_forms_events)) return false;
        if(!array_key_exists($form_name, $repeating_forms_events[$event_id])) return false;
        return true;
    }

    function getFieldMetadata($project_id, $field_name)
    {
        if(!$this->project_metadata) $this->project_metadata = $this->getProjectMetadata($project_id);
        if(!array_key_exists($field_name, $this->project_metadata)) throw new \Exception("Error: no metadata found for the field '{$field_name}' in the project {$this->project_id}", 1);
        $field_metadata = $this->project_metadata[$field_name];
        return $field_metadata;
    }

    function getFormNameForField($project_id, $field_name)
    {
        $field_metadata = $this->getFieldMetadata($project_id, $field_name);
        return @$field_metadata['form_name'] ?: false;
    }
	
}