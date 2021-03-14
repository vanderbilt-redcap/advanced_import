<?php namespace Vanderbilt\AdvancedImport\App\Models\Queue;

use DateTime;
use JsonSerializable;
use Logging;
use SplSubject;
use SQLite3;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Helpers\DatabaseQueryHelper;
use Vanderbilt\AdvancedImport\App\Models\Import;
use Vanderbilt\AdvancedImport\App\Models\Response;

/**
 * 
 * @var int id
 * @var int project_id
 * @var int user_id
 * @var string filename
 * @var array settings
 * @var int processed_lines
 * @var string status
 * @var string type
 * @var DateTime created_at
 * @var DateTime updated_at
 * @var DateTime completed_at
 * @var string error
 * @var string error
 */
abstract class Job implements JobInterface, JsonSerializable
{
    const TYPE_IMPORT = 'import';
    const TYPE_EXPORT = 'export';

    const STATUS_READY = 'ready';
    const STATUS_ERROR = 'error';
    const STATUS_COMPLETED = 'completed';
    const STATUS_PROCESSING = 'processing';
    const STATUS_STOPPED = 'stopped';
    const STATUS_DELETED = 'deleted';

    const TABLE_NAME = "jobs";

    /**
     * list of fields to skip in mass assignment (update)
     *
     * @var array
     */
    private $guarded = ['id', 'project_id', 'user_id', 'filename', 'settings', 'type', 'created_at'];

    private $properties = [];

    public function __construct($params)
    {
        $this->properties = [
            'id' => intval(@$params['id']),
            'project_id' => intval(@$params['project_id']),
            'user_id' => intval(@$params['user_id']),
            'filename' => @$params['filename'],
            'settings' => json_decode(@$params['settings'], $assoc=true),
            'processed_lines' => intval(@$params['processed_lines']),
            'status' => @$params['status'],
            'type' => @$params['type'],
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
            "SELECT `status` FROM `%s` WHERE id=?",
            self::TABLE_NAME
        );
        $stmt = AdvancedImport::db()->query($query_string, [$this->id]);
        if($stmt==false) throw new \Exception(sprintf("Error getting the status of job id %u", $this->id), 400);
        if($row = $stmt->fetch()) {
            $this->status = $status = @$row['status']; // also update the local one
            Logging::writeToFile('job_status.txt', "getStatus(): ".$status);
            return $this->status;
        }
        return false;
    }

    public function process() {}


    private function getDate($date_string)
    {
        if(!$date_string) return;
        return DateTime::createFromFormat( 'Y-m-d H:i:s', $date_string );
    }

    public static function create($project_id, $user_id, $filename, $settings, $type)
    {
        $data = [
            'project_id' => $project_id,
            'user_id' => $user_id,
            'filename' => $filename,
            'settings' => json_encode($settings),
            'type' => $type,
            'created_at' => $created_at = self::getNow(),
            'updated_at' => $created_at,
        ];
        $id = AdvancedImport::db()->insert(self::TABLE_NAME, $data);
        if($id==false) throw new \Exception("Error creating job", 400);
        return $id;
    }

    function markProcessing() {
        $params = [
            'status' => self::STATUS_PROCESSING,
        ];
        $this->updateProperties($params);
    }

    public function setError($message)
    {
        $params = [
            'status' => self::STATUS_ERROR,
            'completed_at' => self::getNow(),
            'error' => $message,
        ];
        $this->updateProperties($params);
    }

    public function markCompleted()
    {
        $params = [
            'status' => self::STATUS_COMPLETED,
            'completed_at' => self::getNow(),
        ];
        $this->updateProperties($params);
    }

    protected function updateProperties($params)
    {
        $params['updated_at'] = self::getNow();

        $job_id = $this->id;

        $data = array_filter($params, function($key) {
            return !(in_array($key, $this->guarded));
        }, ARRAY_FILTER_USE_KEY);

        $result = AdvancedImport::db()->update(self::TABLE_NAME, $data, ['id'=>$job_id]);
        if($result==false) throw new \Exception(sprintf("Error updating job id %u", $job_id), 400);
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
        $this->updateProperties($params);
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

    public function jsonSerialize()
    {
        $data =  $this->properties;
        return $data;
    }

}