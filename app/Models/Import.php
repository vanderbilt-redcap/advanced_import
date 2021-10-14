<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Helpers\InstanceSeeker;
use Vanderbilt\AdvancedImport\App\Helpers\RecordHelper;
use Vanderbilt\AdvancedImport\App\Helpers\TemporaryTable;
use Vanderbilt\AdvancedImport\App\Models\Importers\ImporterFactory;
use Vanderbilt\AdvancedImport\App\Models\Queue\ImportJob;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;
use Vanderbilt\AdvancedImport\App\Traits\CanReadCSV;
use Vanderbilt\AdvancedImport\App\Traits\Observer\SubjectTrait;

class Import extends BaseModel
{
    use CanReadCSV;
    use SubjectTrait;

    const IMPORT_STRATEGY_APPEND = 'append';
    const IMPORT_STRATEGY_UPDATE = 'update';
    const IMPORT_STRATEGY_APPEND_UPDATE = 'append-update';
    const IMPORT_STRATEGY_DELETE = 'delete';
    const IMPORT_STRATEGY_COPY = 'copy';

    const NOTIFICATION_PROCESS_STARTED = 'Import:process_started';
    const NOTIFICATION_LINE_PROCESSED = 'Import:line_processed';
    const NOTIFICATION_PROCESS_COMPLETED = 'Import:process_completed';
    const NOTIFICATION_PROCESS_STOPPED = 'Import:process_stopped';

    /**
     * overwrite behaviour available in REDCap::saveData
     */
    const OVERWRITE_BEHAVIOR_NORMAL = 'normal';
    const OVERWRITE_BEHAVIOR_OVERWRITE = 'overwrite';

    const MAX_LINES_PER_PROCESS = 1000;

	function __construct()
	{
		parent::__construct();
    }
    
    /* function importCSV($project_id, $file_path, $settings)
    {
        $settings = new ImportSettings($settings);
        $importer = ImporterFactory::create($project_id, $settings);
        // if(empty($file_path)) throw new \Exception("No file path", 1);
        $row_index = $settings->data_row_start ?: 1;
        
        $results = [];
        while($line = $this->readFileAtLine($file_path, $row_index)) {
            $csv_data = $this->readCSVLine($line, $settings->field_delimiter, $settings->text_qualifier);
            if(!empty($csv_data)) {
                $response = $importer->process($csv_data, $row_index);
                $results = $this->reduceResults($response, $results);
            }
            $row_index++;
        }

        return $results;
    } */

    /**
     * process a Job
     *
     * @param ImportJob $job
     * @return bool
     */
    public function processJob($job)
    {
        $project_id = $job->project_id;
        $job_settings =$job->settings;
        $file_path = AdvancedImport::getUploadedFilePath($job->filename);
        $processed_lines = intval($job->processed_lines); // 0 on failure
        
        $project = new Project($project_id);
        $settings = new ImportSettings($job_settings, $project);
        $instanceSeeker = new InstanceSeeker($project, $settings);
        $record_helper = new RecordHelper($project, $file_path, $settings);
        $importer = ImporterFactory::create($project, $settings, $instanceSeeker, $record_helper);
        
        $row_index = $processed_lines + 1; // start after the last processd line. when starting from 0 also skips the `fields` row

        $results = [];
        $this->notify(self::NOTIFICATION_PROCESS_STARTED, []);
        while($line = $this->readFileAtLine($file_path, $row_index)) {
            $job_status = $job->getStatus();
            if($job_status==Job::STATUS_STOPPED) {
                $this->notify(self::NOTIFICATION_PROCESS_STOPPED, []);
                return;
            }
            
            $csv_data = $this->readCSVLine($line, $settings->field_delimiter, $settings->text_qualifier);
            if(!empty($csv_data)) {
                $response = $importer->process($csv_data, $row_index);
                $results = $this->reduceResults($response, $results);
                // use the observer pattern to update the processed lines in the job
                $this->notify(self::NOTIFICATION_LINE_PROCESSED, [
                    'data' => $csv_data,
                    'processed_line' => $row_index,
                    'results' => $results,
                ]);
            }
            $row_index++;
        }
        if(!$line || empty($results)) {
            $this->notify(self::NOTIFICATION_PROCESS_COMPLETED, []);
            return true;
        }
        return false;
    }

    public function countLines($file_path)
    {
        $counter = 0;
        return $counter;
        $handle = fopen($file_path, "r");
        while(!feof($handle)){
        $line = fgets($handle, 4096);
        $counter += substr_count($line, PHP_EOL);
        }

        fclose($handle);

        return $counter;
    }

    private function reduceResults($response, $seed=[])
    {
        if(array_key_exists($response, $seed)) {
            $seed[$response]++;
        }else {
            $seed[$response] = 1;
        }
        return $seed;
    }

    /**
     * check if the file is valid
     * 
     * - guess the delimiter
     * - get the column names
     *
     * @return void
     */
    function parseFile($text_line, $settings)
    {
        $settings = new ImportSettings($project_id=null, $settings); // don't need the project ID
        if(empty($text_line)) throw new \Exception("No text to parse", 1);
        $settings->field_delimiter = $delimiter = $this->guessDelimiter($text_line);
        $columns = $this->getColumnNames($text_line, $settings->field_delimiter, $settings->text_qualifier);
        $data = compact('columns','delimiter');
        return $data;
    }

    function getColumnNames($field_name_row, $field_delimiter, $text_qualifier)
    {
        $colum_names = $this->readCSVLine($field_name_row, $field_delimiter, $text_qualifier);
        return $colum_names;
    }


}