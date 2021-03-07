<?php namespace Vanderbilt\AdvancedImport\App\Helpers\Queue;

use DateTime;
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

    public function getStatus()
    {
        $query_string = sprintf(
            "SELECT `status` FROM `%s` WHERE id=%u",
            self::tableName(),
            $this->id
        );
        $result = db_query($query_string);
        if($error = db_error()) throw new \Exception(sprintf("Error getting the status of job id %u- %s", $this->id, $error), 400);
        if($row = db_fetch_assoc($result)) {
            $this->status = @$row['status']; // also update the local one
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

    public function save()
    {
        $table = self::tableName();
        $fields_to_skip = ['id', 'project_id', 'user_id', 'settings', 'filename', 'created_at'];
        $job_id = $this->id;

        $fields_to_update = array_filter($this->properties, function($key) use($fields_to_skip) {
            return !in_array($key, $fields_to_skip);
        }, ARRAY_FILTER_USE_KEY);
        $update_statements = array_map(function($value, $key) {
            return sprintf("`%s`=%s", $key, checkNull($value));
        }, $fields_to_update, array_keys($fields_to_update));
        $query_string = sprintf(
            "UPDATE `%s` SET %s
            WHERE `id`=%u",
            $table, implode(",\n", $update_statements), $job_id
        );
        $result = db_query($query_string);
        if($error = db_error()) throw new \Exception(sprintf("Error updating job id %u- %s", $job_id, $error), 400);
        return $result;
    }

    private function getDate($date_string)
    {
        if(!$date_string) return;
        return DateTime::createFromFormat( 'Y-m-d H:i:s', $date_string );
    }

    public static function tableName()
    {
        return  AdvancedImport::TABLES_PREFIX.'in_jobs';
    }

    public static function create($project_id, $user_id, $filename, $settings)
    {
        $table = self::tableName();
        $data = [
            'project_id' => $project_id,
            'user_id' => $user_id,
            'filename' => $filename,
            'settings' => serialize($settings),
            'created_at' => $created_at = NOW,
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
        $this->status = self::STATUS_PROCESSING;
        $this->updated_at = NOW;
        $this->save();
    }

    public function setError($message)
    {
        $this->status = self::STATUS_ERROR;
        $this->updated_at = $updated_at = NOW;
        $this->completed_at = $updated_at;
        $this->error = $message;
        $this->save();
    }

    public function markCompleted()
    {
        $this->status = self::STATUS_COMPLETED;
        $this->updated_at = $updated_at = NOW;
        $this->completed_at = $updated_at;
        $this->save();
    }

    public function update($params)
    {
        foreach ($params as $key => $value) {
            $this->{$key} = $value;
        }
        $this->updated_at = NOW;
        $this->save();
    }
    /**
     * reset the status to ready so the job will be further procesed
     * on the next cron cycle
     *
     * @return void
     */
    public function putBackInQueue()
    {
        $this->status = self::STATUS_READY;
        $this->updated_at = NOW;
        $this->save();
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

    public static function createTable()
    {
        $query_string = sprintf(
            "CREATE TABLE IF NOT EXISTS `%s`
             (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                PRIMARY KEY (`id`),
                `project_id` int(11) NOT NULL,
                `user_id` int(11) NOT NULL,
                `filename` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'path to the uploaded CSV file',
                `settings` blob,
                `processed_lines` int(11) NOT NULL DEFAULT 0,
                `error` text COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'error if any',
                `status` ENUM('ready', 'error', 'completed', 'processing', 'paused') DEFAULT 'ready' COMMENT 'status of the job',
                `created_at` datetime DEFAULT NULL,
                `updated_at` datetime DEFAULT NULL,
                `completed_at` datetime DEFAULT NULL
            )
            ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
            self::tableName()
        );
        $result = db_query($query_string);
        return $result;
    }

    public static function dropTable()
    {
        $query_string = sprintf("DROP TABLE IF EXISTS `%s`", self::tableName());
        $result = db_query($query_string);
        return $result;
    }

}