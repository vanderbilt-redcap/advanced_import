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
    const STORE_NAME = "jobs";

    /**
     * list of fields to skip in mass assignment (update)
     *
     * @var array
     */
    private $guarded = ['id', 'project_id', 'user_id', 'filename', 'settings', 'type', 'created_at'];

    private $properties = [];

    public function __construct($params)
    {
        // define the allowed keys for properties
        $this->properties = [
            'id' =>null,
            'project_id' =>null,
            'user_id' =>null,
            'filename' =>null,
            'settings' =>null,
            'processed_lines' =>null,
            'status' =>null,
            'type' =>null,
            'created_at' =>null,
            'updated_at' =>null,
            'completed_at' =>null,
            'error' =>null,
        ];
        foreach ($params as $key => $value) {
            $this->{$key} = $value;
        }
    }

    private static function getNow()
    {
        return date('Y-m-d H:i:s');
    }

    public function getStatus()
    {
        $job = AdvancedImport::dbStore(self::STORE_NAME)->findById($this->id);
        if($job==false) throw new \Exception(sprintf("Error getting the status of job id %u", $this->id), 500);
        $this->status = $status = @$job['status'];
        return $status;
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
            'processed_lines' => 0,
            'settings' => json_encode($settings),
            'type' => $type,
            'status' => Job::STATUS_READY,
            'error' => null,
            'created_at' => $created_at = self::getNow(),
            'updated_at' => $created_at,
            'completed_at' => null,
        ];
        $store = AdvancedImport::dbStore(Job::STORE_NAME);
        $job = $store->insert($data);
        $id = @$job['id'];
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
        $data = array_filter($params, function($value, $key) {
            $guarded = in_array($key, $this->guarded);
            if($guarded) return false;
            $this->{$key} = $value;
            return true;
        }, ARRAY_FILTER_USE_BOTH);
        $store = AdvancedImport::dbStore(Job::STORE_NAME);
        $job = $store->updateById($this->id, $data);
        return $job;
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
        return $data;
    }

}