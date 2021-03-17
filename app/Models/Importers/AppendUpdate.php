<?php namespace Vanderbilt\AdvancedImport\App\Models\Importers;

use Vanderbilt\AdvancedImport\App\Helpers\ArrayBox;
use Vanderbilt\AdvancedImport\App\Models\Response;

use function Vanderbilt\AdvancedImport\App\Functional\partial;
// use function Functional\partial_left as partial;

/**
 * Append/Update: add new records or update existing ones
 */
class AppendUpdate extends AbstractImporter
{

	/**
	 *
	 * @param array $data
	 * @return array
	 */
	private function preProcess($data)
	{
		// extract settings
		$settings = $this->settings;
		$mapping = (array)$settings->mapping;
		$parsing_settings['dates_format'] = $settings->dates_format;
		$primary_key_name = $settings->primary_key;

		// create callables to process data
		$filterMappedColumns = partial([$this, 'filterMappedColumns'], $mapping); // filter data from CSV which is not mapped
		$assignColumnNames = partial([$this, 'assignColumnNames'], $mapping); // map the csv file using the columns names from the mapping
		$parse = partial([$this, 'applyParsers'], $this->project, $parsing_settings); // get parse function
		$validate = partial([$this, 'applyValidations'], $this->project); // get validate function (better leaving this to REDCap::save)
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

		$data = $processData($data);
		// check primary key
		$primary_key_value = @$data[$primary_key_name];
		if(!$primary_key_value) throw new \Exception("No primary key found.", 400);
		return $data;
	}

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
		list($project_primary_key, $project_secondary_key) = $this->record_helper->getPrimaryKeys();

		try {
			$data = $this->preProcess($data_to_process);
		}catch (\Exception $e) {
			$message = "Error pre-processing CSV data:\n".$e->getMessage();
			$this->log($message, compact('project_id','line'));
			return Response::ERROR;
		}
			// check primary key
		$primary_key_value = @$data[$primary_key_name];
	
		if($primary_key_name==$project_primary_key) {
			// record ID is provided in the user data
			$record_id = $primary_key_value;
		}else {
			//generate record_id
			$record_id = $this->record_helper->getRecordId($primary_key_name, $primary_key_value);
		}
		if($record_id==false) {
			$record_id = $this->record_helper->getAutoId($project_id);
			//create new record
			$instance_number = 1;
			// list($project_primary_key, $project_secondary_key) = $this->record_helper->getPrimaryKeys($this->project_id);
			$record = $this->record_helper->reduceRecord($record_id, $primary_key_name, $primary_key_value);
			foreach ($data as $key => $value) {
				$record = $this->record_helper->reduceRecord($record_id, $key, $value, $instance_number, $record);
			}
		}else {
			// check for existing full match
			// $instance_number = $this->temporary_table->findInstance($record, $data);
			$instance_number = $this->instanceSeeker->findMatches($record_id, $data, $full_match=true);
			if($instance_number) {
				//full match, no need to import
				return Response::NO_CHANGE;
			}else {
				// check for match, but skip dynamic keys
				$instance_number = $this->instanceSeeker->findMatches($record_id, $data,$full_match=false);
				if(!$instance_number) {
					// not found; need a new instance
					$instance_number = $this->instanceSeeker->getAutoInstanceNumber($record_id);
				}

				$record = $this->record_helper->reduceRecord($record_id, $primary_key_name, $primary_key_value);
				foreach ($data as $key => $value) {
					$record = $this->record_helper->reduceRecord($record_id, $key, $value, $instance_number, $record);
				}
				// return [$record, $record_id, $instance_number];
			}
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

	

}
