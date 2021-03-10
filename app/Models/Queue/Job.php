<?php namespace Vanderbilt\AdvancedImport\App\Helpers\Queue;

use DateTime;
use Logging;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Helpers\DatabaseQueryHelper;
use Vanderbilt\AdvancedImport\App\Models\Import;
use Vanderbilt\AdvancedImport\App\Models\Response;

class Job
{
    const STATUS_READY = 'ready';
    const STATUS_ERROR = 'error';
    const STATUS_COMPLETED = 'completed';
    const STATUS_PROCESSING = 'processing';
    const STATUS_PAUSED = 'paused';

    private $properties = [];

    public function __construct($params)
    {
        $this->properties = [
            'id' => intval(@$params['id']),
            'project_id' => intval(@$params['project_id']),
            'user_id' => intval(@$params['user_id']),
            'filename' => @$params['filename'],
            'settings' => unserialize(@$params['settings']),
            'processed_lines' => intval(@$params['processed_lines']),
            'status' => @$params['status'],
            'created_at' => $this->getDate(@$params['created_at']),
            'updated_at' => $this->getDate(@$params['updated_at']),
            'completed_at' => $this->getDate(@$params['completed_at']),
            'error' => @$params['error'],
        ];
    }

    private static function getNow()
    {
        return date('Y-m-d H:i:s');
    }

    public function getStatus()
    {
        $query_string = sprintf(
            "SELECT `status` FROM `%s` WHERE id=%u",
            Queue::tableName(),
            $this->id
        );
        $result = db_query($query_string);
        if($error = db_error()) throw new \Exception(sprintf("Error getting the status of job id %u- %s", $this->id, $error), 400);
        if($row = db_fetch_assoc($result)) {
            $this->status = $status = @$row['status']; // also update the local one
            Logging::writeToFile('job_status.txt', "getStatus(): ".$status);
            return $this->status;
        }
        return false;
    }

    public function process()
    {
        $calcTotal = function($results) {
            $summable_types = [Response::SUCCESS,  Response::NO_CHANGE, Response::ERROR];
            $total = 0;
            foreach ($results as $key => $value) {
                if(in_array($key, $summable_types)) $total += $value;
            }
            return $total;
        };

        $this->markProcessing(); // update the status of the job

        $project_id = $this->project_id;
        $csv_path = AdvancedImport::getUploadedFilePath($this->filename);
        $settings = $this->settings;
        $processed_lines = $this->processed_lines;
        $start = $processed_lines+1;
        $settings['project_id'] = $project_id;
        $settings['data_row_start'] = $start;
        $importer = new Import();
        try {
            $results = $importer->processCSV($project_id, $csv_path, $settings);
            if(!$results) {
                $this->markCompleted();
            }else {
                $processed_lines = $this->processed_lines + $calcTotal($results);
                $update_params = [
                    'processed_lines' => $processed_lines,
                ];
                $this->update($update_params);
            }
        } catch (\Exception $e) {
            $message = sprintf("Error processing the CSV file - %s - (code %u)", $e->getMessage(), $e->getCode());
            $this->setError($message);
        }   
    }


    private function getDate($date_string)
    {
        if(!$date_string) return;
        return DateTime::createFromFormat( 'Y-m-d H:i:s', $date_string );
    }

    public static function create($project_id, $user_id, $filename, $settings)
    {
        $table = Queue::tableName();
        $data = [
            'project_id' => $project_id,
            'user_id' => $user_id,
            'filename' => $filename,
            'settings' => serialize($settings),
            'created_at' => $created_at = self::getNow(),
            'updated_at' => $created_at,
        ];
        $query_string = sprintf(
            "INSERT INTO %s (%s) VALUES (%s)",
            $table,
            DatabaseQueryHelper::implodeAndQuote(',', array_keys($data), '`'),
            DatabaseQueryHelper::getQueryList($data)
        );
        $result = db_query($query_string);
        if($error = db_error()) throw new \Exception(sprintf("Error creating job - %s", $error), 400);
        $job_id = db_insert_id();
        return $job_id;
    }

    function markProcessing() {
        $params = [
            'status' => self::STATUS_PROCESSING,
        ];
        $this->update($params);
    }

    public function setError($message)
    {
        $params = [
            'status' => self::STATUS_ERROR,
            'completed_at' => self::getNow(),
            'error' => $message,
        ];
        $this->update($params);
    }

    public function markCompleted()
    {
        $params = [
            'status' => self::STATUS_COMPLETED,
            'completed_at' => self::getNow(),
        ];
        $this->update($params);
    }

    public function update($params)
    {
        $params['updated_at'] = self::getNow();

        $table = Queue::tableName();
        $fields_to_skip = ['id', 'project_id', 'user_id', 'settings', 'filename', 'created_at'];
        $job_id = $this->id;

        $data = array_filter($params, function($key) use($fields_to_skip) {
            return !(in_array($key, $fields_to_skip));
        }, ARRAY_FILTER_USE_KEY);
        $update_statements = array_map(function($key, $value) {
            return sprintf("`%s`=%s", $key, checkNull($value));
        }, array_keys($data), $data);
        $update_statement_string = implode(",\n", $update_statements);

        $query_string = sprintf(
            "UPDATE `%s` SET %s
            WHERE `id`=%u",
            $table, $update_statement_string, $job_id
        );
        $result = db_query($query_string);
        if($error = db_error()) throw new \Exception(sprintf("Error updating job id %u- %s", $job_id, $error), 400);
        // also update the current instance values
        foreach ($data as $key => $value) {
            $this->{$key} = $value;
        }
        return $result;
    }
    /**
     * reset the status to ready so the job will be further procesed
     * on the next cron cycle
     *
     * @return void
     */
    public function putBackInQueue()
    {
        $params = [
            'status' => self::STATUS_READY,
        ];
        $this->update($params);
    }

    public function __get($name)
    {
        if (array_key_exists($name, $this->properties)) {
            return @$this->properties[$name];
        }

        $trace = debug_backtrace();
        trigger_error(
            'Undefined property via __get(): ' . $name .
            ' in ' . $trace[0]['file'] .
            ' on line ' . $trace[0]['line'],
            E_USER_NOTICE);
        return null;
    }

    protected function __set($name, $value)
    {
        if (!array_key_exists($name, $this->properties)) return;
        $this->properties[$name] = $value;
    }

}