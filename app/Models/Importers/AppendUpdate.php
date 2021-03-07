<?php namespace Vanderbilt\AdvancedImport\App\Models\Importers;

use Vanderbilt\AdvancedImport\App\Helpers\ArrayBox;
use Vanderbilt\AdvancedImport\App\Helpers\RecordHelper;
use Vanderbilt\AdvancedImport\App\Models\Response;

use function Vanderbilt\AdvancedImport\App\Functional\partial;
// use function Functional\partial_left as partial;

/**
 * Append/Update: add new records or update existing ones
 */
class AppendUpdate extends AbstractImporter
{
	/**
	 * Undocumented function
	 *
	 * @param array $data_to_process
	 * @param integer $line
	 * @return void
	 */
	function process($data_to_process, $line)
	{
		$project_id = $this->project_id;
		$this->line = $line;

		// extract settings
		$settings = $this->settings;
		$event_id = $settings->event_id;
		$form_name = $settings->form_name;
		$mapping = (array)$settings->mapping;
		$parsing_settings['dates_format'] = $settings->dates_format;
		$primary_key_name = $settings->primary_key;

		// create callables to process data
		$filterMappedColumns = partial([$this, 'filterMappedColumns'], $mapping); // filter data from CSV which is not mapped
		$assignColumnNames = partial([$this, 'assignColumnNames'], $mapping); // map the csv file using the columns names from the mapping
		$parse = partial([$this, 'applyParsers'], $project_id, $parsing_settings); // get parse function
		$validate = partial([$this, 'applyValidations'], $project_id); // get validate function
		/**
		 * perform operations on the data_to_process: parsing, validation, mapping
		 */
		$processData = function($data_to_process) use($filterMappedColumns, $assignColumnNames, $parse, $validate) {
			$boxed_data = ArrayBox::from($data_to_process);
							$boxed_data = $boxed_data->filter($filterMappedColumns);
							$boxed_data = $boxed_data->mapKeys($assignColumnNames);
							$boxed_data = $boxed_data->map($parse); // transform dates, numbers...
							//->map($validate); // validate (let REDCap do the validation on save)
			return $boxed_data();
		};

		try {
			$data = $processData($data_to_process);
			// check primary key
			$primary_key_value = @$data[$primary_key_name];
			if(!$primary_key_value) throw new \Exception("No primary key found.", 400);
		}catch (\Exception $e) {
			$message = "Error processing CSV data:\n".$e->getMessage();
			// $this->log($message, compact('project_id','line'));
			return Response::ERROR;
		}

		list($record, $record_id, $instance_number) = $this->getRecord($project_id, $event_id, $form_name, $data);
		
		if(empty($record)) {
			return Response::NO_CHANGE;
		}

		$save_response = \REDCap::saveData($project_id, 'array', $record);
		if(empty(@$save_response['errors'])) {
			$saved_ids = $save_response['ids'] ?: [];
			$ids_string = implode(',', $saved_ids);
			$saved_fields_count = $save_response['item_count'] ?: 0;
			$message = "Data saved: record #{$record_id}, instance #{$instance_number} (total fields saved: {$saved_fields_count})";
			// $this->log($message, compact('project_id','record_id', 'instance_number', 'save_response', 'line'));
			return Response::SUCCESS;
		}else {
			$errors = @$save_response['errors'];
			if(is_array($errors)) $errors = implode("\n", $errors);
			$message = "Error saving data #{$record_id}, instance #{$instance_number}:\n {$errors}";
			$this->log($message, compact('project_id','record_id', 'instance_number', 'save_response', 'line'));
			return Response::ERROR;
		}
	}

	/**
	 * look for existing record or instance and create a record
	 *
	 * @param int $project_id
	 * @param int $event_id
	 * @param string $form_name
	 * @param array $data
	 * @return array
	 */
	private function getRecord($project_id, $event_id, $form_name, $data)
	{
		$settings = $this->settings;
		$line = $this->line;
		$primary_key_name = $settings->primary_key;
		$primary_key_value = @$data[$primary_key_name];
		if(!$primary_key_value) {
			// $this->log("No primary key found using key '{$primary_key_name}'.", compact('line'));
			return;
		}

		$all_data = $settings->getFormData($data, $include_dynamic=true);
		// static data is used to determine uniqueness of a record/instance
		$static_data = $settings->getFormData($data, $include_dynamic=false);

		/**
		 * check if data is empty before creating a new instance or a new record
		 */
		$isEmpty = function($data) { return !array_filter($data); };
		if($isEmpty($all_data)) {
			$this->log("No data to insert. Skipping entry", compact('line','message'));
			return;
		}

		$record_helper = new RecordHelper($project_id);
		$record_id = $record_helper->getRecordId($project_id, $event_id, $primary_key_name, $primary_key_value);
		$instance_number = null;

		$getInstamceNumber = function($record_id) use ($record_helper, $project_id, $event_id, $form_name, $all_data, $static_data) {
			// check for perfect match
			if($matching_instance = $record_helper->findInstance($project_id, $event_id, $record_id, $all_data)) {
				// $this->log("Matching data in record {$record_id}, instance {$matching_instance} has been found; skipping entry", compact('line','record_id'));
				return false;
			}

			$is_repeating = $record_helper->isRepeatingForm($project_id, $event_id, $form_name);
			if(!$is_repeating) {
				// $this->log("The form '{$form_name}' is not repeatable. Record {$record_id}, instance 1 will be updated.", compact('line','record_id'));
				return 1;
			}

			// check for similar match
			$existing_instance_number = $record_helper->findInstance($project_id, $event_id, $record_id, $static_data);
			if($existing_instance_number) {
				// overwrite
				// $this->log("Existing instance in record {$record_id}, number {$existing_instance_number} will be updated.", compact('line','record_id'));
				return $existing_instance_number;
			}else {
				// create new instance
				$instance_number = $record_helper->getAutoInstanceNumber($project_id, $event_id, $record_id, $form_name); // auto instance if no instance provided
				// $this->log("No similar instance found in REDCap for record {$record_id}; will insert data using instance number {$instance_number}.", compact('line','record_id','instance_number'));
				return $instance_number;
			}
		};

		if($record_id) {
			$instance_number = $getInstamceNumber($record_id);
		}else {	
			// $primary_keys = $record_helper->getPrimaryKeys();
			// $record_id = $record_id ?: $record_helper->getAutoId($project_id);
			// create a new record with the provided primary key value
			$record_id = $primary_key_value;
			$instance_number = 1;
			// $this->log("No record found in REDCap; will insert new record #{$record_id}, instance #{$instance_number}.", compact('line','record_id','instance_number'));
		}

		if(!$instance_number) return; // skip entry

		$record = $record_helper->reduceRecord($project_id, $event_id, $record_id, $primary_key_name, $primary_key_value);
		foreach ($all_data as $key => $value) {
			$record = $record_helper->reduceRecord($project_id, $event_id, $record_id, $key, $value, $instance_number, $record);
		}
		return [$record, $record_id, $instance_number];
	}

}
