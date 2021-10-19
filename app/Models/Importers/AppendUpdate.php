<?php namespace Vanderbilt\AdvancedImport\App\Models\Importers;

use Vanderbilt\AdvancedImport\App\Models\Import;
use Vanderbilt\AdvancedImport\App\Models\Response;
use Vanderbilt\AdvancedImport\App\Models\ParserFactory;
use Vanderbilt\AdvancedImport\App\Traits\Observer\SubjectTrait;

/**
 * Append/Update: add new records or update existing ones
 */
class AppendUpdate extends AbstractImporter
{

	const NOTIFICATION_PROCESS_ERROR = 'AppendUpdate:process_error';
	const NOTIFICATION_DATA_SAVED = 'AppendUpdate:data_saved';
	const NOTIFICATION_DATA_SAVE_ERROR = 'AppendUpdate:data_save_error';

	/**
	 *
	 * @param array $data
	 * @return array
	 */
	private function preProcess($data)
	{
		// extract settings
		$settings = $this->settings;
		$mapping = $settings->getMapping();
		$parsing_settings['dates_format'] = $settings->dates_format;
		$primary_key_name = $settings->primary_key;

		// apply parsers to the data to normalize it
		$parsersFactory = new ParserFactory($this->project, $parsing_settings);

		$normalizedData = [];
		foreach ($mapping as $redcapField => $csvIndexes) {
			$values = $this->getValues($data, $csvIndexes); // extract value
			$normalizedData[$redcapField] = $this->applyParsers($parsersFactory, $redcapField, $values); // apply parsers
		}

		// $data = $processData($data);
		// check primary key
		$primary_key_value = @$normalizedData[$primary_key_name];
		if(!$primary_key_value) throw new \Exception("No primary key found.", 400);
		return $normalizedData;
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


		$parsing_settings['dates_format'] = $settings->dates_format;
		$primary_key_name = $settings->primary_key;
		list($project_primary_key, $project_secondary_key) = $this->record_helper->getPrimaryKeys();

		try {
			$data = $this->preProcess($data_to_process);
		}catch (\Exception $e) {
			$message = "Error pre-processing CSV data:\n".$e->getMessage();
			$this->notify(self::NOTIFICATION_PROCESS_ERROR, compact('e', 'message'));
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

		
		// check for new record
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
				if($instance_number==false) {
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
		
		// \Logging::writeToFile('append-update.txt', json_encode($record, JSON_PRETTY_PRINT));

		/**
		 * note: set OVERWRITE_BEHAVIOR_OVERWRITE or blank values will not be saved
		 */
		$save_response = \REDCap::saveData($project_id, 'array', $record, Import::OVERWRITE_BEHAVIOR_OVERWRITE);
		if(empty(@$save_response['errors'])) {
			$this->notify(self::NOTIFICATION_DATA_SAVED, compact('save_response', 'record'));
			$saved_ids = $save_response['ids'] ?: [];
			$ids_string = implode(',', $saved_ids);
			$saved_fields_count = $save_response['item_count'] ?: 0;
			$message = "Data saved: record #{$record_id}, instance #{$instance_number} (total fields saved: {$saved_fields_count})";
			// $this->log($message, compact('project_id','record_id', 'instance_number', 'save_response', 'line'));
			return Response::SUCCESS;
		}else {
			$errors = @$save_response['errors'];
			if(is_array($errors)) $errorsString = implode("\n", $errors);
			$message = "Error saving data #{$record_id}, instance #{$instance_number}:\n {$errorsString}";
			$this->notify(self::NOTIFICATION_DATA_SAVE_ERROR, compact('save_response', 'record', 'errors', 'message'));
			$this->log($message, compact('project_id','record_id', 'instance_number', 'save_response', 'line'));
			return Response::ERROR;
		}
	}

	

}
