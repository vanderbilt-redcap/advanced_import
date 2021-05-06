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

    /**
     * type of the job (used in creation)
     *
     * @var string
     */
    static protected $type = null;

    const STATUS_READY = 'ready';
    const STATUS_ERROR = 'error';
    const STATUS_COMPLETED = 'completed';
    const STATUS_PROCESSING = 'processing';
    const STATUS_STOPPED = 'stopped';
    const STATUS_DELETED = 'deleted';

    const TABLE_NAME = "jobs";
    const STORE_NAME = "jobs";

    /**
     * list of fields to skip in mass assignment (update)
     *
     * @var array
     */
    static $guarded = ['id', 'project_id', 'user_id', 'filename', 'settings', 'type', 'created_at'];

    /**
     * define the allowed keys for properties
     *
     * @var array
     */
    static protected $keys = ['id','project_id','user_id','filename','settings','processed_lines','status','type','created_at','updated_at','completed_at','error'];

    private $properties = [];

    public function __construct($params)
    {
        foreach ($params as $key => $value) {
            $this->{$key} = $value;
        }
    }

    /**
     * get list of valid keys for a Job
     *
     * @return array
     */
    public static function getKeys() {
        return static::$keys;
    }

    private static function getNow()
    {
        return date('Y-m-d H:i:s');
    }

    public function getStatus()
    {
        $query_string = sprintf(
            "SELECT `status` FROM `%s` WHERE `id`=?",
            self::TABLE_NAME
        );
        $result = AdvancedImport::colDb()->query($query_string, [$this->id]);
        if($result==false) throw new \Exception(sprintf("Error getting the status of job id %u", $this->id), 400);
        if($row = db_fetch_assoc($result)) {
            $this->status = $status = @$row['status']; // also update the local one
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

    /**
     * create a job
     *
     * @param int $project_id
     * @param int $user_id
     * @param string $filename
     * @param array $settings
     * @return int id og the created job
     */
    public static function create($project_id, $user_id, $filename, $settings)
    {
        $data = [
            'project_id' => $project_id,
            'user_id' => $user_id,
            'filename' => $filename,
            'processed_lines' => 0,
            'settings' => $settings,
            'type' => static::$type,
            'status' => Job::STATUS_READY,
            'error' => null,
            'created_at' => $created_at = self::getNow(),
            'updated_at' => $created_at,
            'completed_at' => null,
        ];
        $db = AdvancedImport::colDb();
        $id = $db->insert(Job::TABLE_NAME, $data);

        // $id = AdvancedImport::db()->insert(self::TABLE_NAME, $data);
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

    public function updateProperties($params)
    {
        $params['updated_at'] = self::getNow();
        $job_id = $this->id;
        $data = array_filter($params, function($value, $key) {
            $guarded = in_array($key, static::$guarded);
            if($guarded) return false;
            $this->{$key} = $value;
            return true;
        }, ARRAY_FILTER_USE_BOTH);
        $db = AdvancedImport::colDb();
        
        return $db->update(self::TABLE_NAME, $data, $where='`id`=?', [$job_id]);

        /* $result = AdvancedImport::db()->update(self::TABLE_NAME, $data, ['id'=>$job_id]);
        if($result==false) throw new \Exception(sprintf("Error updating job id %u", $job_id), 400);
        return $result; */
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
        if (in_array($name, static::$keys)) {
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

    public function __set($name, $value)
    {
        if (!in_array($name, static::$keys)) return;
        switch ($name) {
            case 'id':
                $this->properties['id'] = intval($value);
                break;
            case 'project_id':
                $this->properties['project_id'] = intval($value);
                break;
            case 'user_id':
                $this->properties['user_id'] = intval($value);
                break;
            case 'filename':
                $this->properties['filename'] = $value;
                break;
            case 'settings':
                $this->properties['settings'] = json_decode($value, $assoc=true);
                break;
            case 'processed_lines':
                $this->properties['processed_lines'] = intval($value);
                break;
            case 'status':
                $this->properties['status'] = $value;
                break;
            case 'type':
                $this->properties['type'] = $value;
                break;
            case 'created_at':
                $this->properties['created_at'] = $this->getDate($value);
                break;
            case 'updated_at':
                $this->properties['updated_at'] = $this->getDate($value);
                break;
            case 'completed_at':
                $this->properties['completed_at'] = $this->getDate($value);
                break;
            case 'error':
                $this->properties['error'] = $value;
                break;
        }
    }

    public function jsonSerialize()
    {
        $data =  $this->properties;
        foreach ($data as $key => $value) {
            if($value instanceof DateTime) {
                $data[$key] = $value->format('Y-m-d H:i:s');
            }
        }
        return $data;
    }

}