<?php
namespace Vanderbilt\AdvancedImport;

$autoload = join([__DIR__,'vendor','autoload.php'],DIRECTORY_SEPARATOR);
if(file_exists($autoload)) require_once($autoload);

use DateInterval;
use DateTime;
use ExternalModules\AbstractExternalModule;
use Vanderbilt\AdvancedImport\App\Helpers\Queue\Job;
use Vanderbilt\AdvancedImport\App\Helpers\Queue\Queue;
use Vanderbilt\AdvancedImport\App\Models\Mediator;

class AdvancedImport extends AbstractExternalModule implements Mediator
{
    private static $instance;

    const TABLES_PREFIX = 'advanced_import_';
    const MAX_CRON_EXECUTION_TIME = '10 minutes';
    const UPLOAD_FOLDER_NAME = 'uploads';


    function __construct()
    {
        parent::__construct();
    }

    public static function getUploadDirectory()
    {
        $upload_dir = dirname(__FILE__).DIRECTORY_SEPARATOR.self::UPLOAD_FOLDER_NAME;
        return $upload_dir;
    }

    public static function getUploadedFilePath($filename)
    {
        $upload_dir = self::getUploadDirectory();
        if(!preg_match("#/$#", $upload_dir))
        {
            $upload_dir .= DIRECTORY_SEPARATOR;
        }
        return $upload_dir.$filename;
    }

    /**
     * get the singleton
     *
     * @return AdvancedImport
     */
    public static function getInstance()
    {
        global $module;
        if(!static::$instance) {
            if($module instanceof static) static::$instance = $module;
            else static::$instance = new static();
        }
        return static::$instance;
    }

     /**
     * Undocumented function
     *
     * @param mixed $sender
     * @param string $event
     * @param array $data
     * @return void
     */
    function notify($sender, $event, $details=[])
    {
        $message = @$details['message'] ?: '';
        unset($details['message']);
        switch ($event) {
            case 'log':
                $this->log($message, $details);
                break;
            default:
                # code...
                break;
        }
    }

    /**
     * process valid jobs in the queue list
     *
     * @return void
     */
    public function processQueue()
    {
        
        $start = new DateTime();
        $max_execution = DateInterval::createFromDateString(self::MAX_CRON_EXECUTION_TIME);
        $max_time = $start->add($max_execution);
        $queue = new Queue();
        $jobs_generator = $queue->jobsGenerator();
        if($job = $jobs_generator->current()) {
            do {
                try {
                    $now = new DateTime();
                    $too_much = $now > $max_time;
                    if($too_much) {
                        $job->putBackInQueue();
                        $keep_processing = false;
                    }
                    else {
                        $job->process();
                        $keep_processing = $job->getStatus() == Job::STATUS_PROCESSING;
                    }
                } catch (\Exception $e) {
                    $job->setError($e->getMessage());
                }
            } while($keep_processing);
        }
    }

    function cleanupUploads()
    {
        $queue = new Queue();
        $status = [JOB::STATUS_COMPLETED];
        $params = compact('status');
        // $completed_jobs = $queue->getJobs($params);

    }

    function run_cron_jobs($cronInfo)
    {
        try {
            $this->processQueue();
            $this->cleanupUploads();
            return "The AdvancedImport cron job completed successfully.";
        } catch (\Exception $e) {
            return sprintf("The AdvancedImport cron job failed. %s", $e->getMessage());
        }
    }

    /**
     * Undocumented function
     *
     * @param \SplSubject $repository
     * @param string $event
     * @param mixed $data
     * @return void
     */
    public function update($subject, $event = null, $data = null)
    {
        switch ($event) {
            case 'emergency':
            case 'alert':
            case 'critical':
            case 'error':
            case 'warning':
            case 'notice':
            case 'info':
            case 'debug':
            case 'log':
                $message =  @$data['message'] ?: '';
                unset($data['message']);
                $data['project_id'] = $this->getProjectId(); // this is filled anyway in log_internal
                $data['type'] = $event;
                $encoded_data = [];
                // transform all provided data to string
                foreach ($data as $key => $item) {
                    if($item instanceof object || is_array($item)) $item = json_encode($item, JSON_PRETTY_PRINT);
                    $encoded_data[$key] = $item;
                }
                $this->log($message, $encoded_data);
                break;
            default:
                # code...
                break;
        }
    }

    /**
     * function executed when the module is enabled at system level
     *
     * @param string $version
     * @return void
     */
    function redcap_module_system_enable($version) {
        try {
            $this->initTables();
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }

    function redcap_module_system_disable($version)
    {
        try {
            $this->dropTables();
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }

    public function initTables()
    {
        Job::createTable();
    }

    public function dropTables()
    {
        Job::dropTable();
    }

    /**
     * function executed when the module is enabled at project level
     *
     * @param string $version
     * @param integer $project_id
     * @return void
     */
    /* function redcap_module_project_enable($version, $project_id)
    {

    } */

}