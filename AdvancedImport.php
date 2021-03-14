<?php
namespace Vanderbilt\AdvancedImport;

$autoload = join([__DIR__,'vendor','autoload.php'],DIRECTORY_SEPARATOR);
if(file_exists($autoload)) require_once($autoload);

use DateInterval;
use DateTime;
use ExternalModules\AbstractExternalModule;
use Logging;
use PDO;
use SQLite3;
use Vanderbilt\AdvancedImport\App\Helpers\Database;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;
use Vanderbilt\AdvancedImport\App\Models\Queue\Queue;
use Vanderbilt\AdvancedImport\App\Models\Mediator;

class AdvancedImport extends AbstractExternalModule implements Mediator
{
    private static $instance;
    /**
     * name of the SQLite database
     */
    const DB_NAME = 'advanced_import.db';

    const TABLES_PREFIX = 'advanced_ie_';
    const MAX_CRON_EXECUTION_TIME = '10 minutes';
    const UPLOAD_FOLDER_NAME = 'uploads';

    function __construct()
    {
        parent::__construct();
    }

    /**
     * path to the data directory:
     * contains the 'uploads' folder and the SQLite database
     *
     * @return string
     */
    public static function getDataDirectory()
    {
        $data_directrory = EDOC_PATH."advanced_import";
        return $data_directrory;
    }
    
    /**
     * path to the folder where the
     * CSV files are stored before being processed
     *
     * @return string
     */
    public static function getUploadDirectory()
    {
        // $upload_dir = dirname(__FILE__).DIRECTORY_SEPARATOR.self::UPLOAD_FOLDER_NAME;
        $data_directory = self::getDataDirectory();
        $upload_dir = $data_directory."/uploads";
        return $upload_dir;
    }

    /**
     * path to a file insiede the uploads directory
     *
     * @param string $filename
     * @return string
     */
    public static function getUploadedFilePath($filename)
    {
        $basename = pathinfo($filename, PATHINFO_BASENAME); //make sure it's just the file name (no subdirectories)
        $upload_dir = self::getUploadDirectory();
        if(!preg_match("#/$#", $upload_dir))
        {
            $upload_dir .= DIRECTORY_SEPARATOR;
        }
        return $upload_dir.$basename;
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
        $job = $jobs_generator->current();
        while($job) {
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
                        $status = $job->getStatus();
                        $keep_processing = $status == Job::STATUS_PROCESSING;
                    }
                } catch (\Exception $e) {
                    $job->setError($e->getMessage());
                }
            } while($keep_processing);
            $job = $jobs_generator->next();
        }
    }

    /**
     * check jobs marked as 'deleted' and remove them from the database
     * along with it's associated file
     *
     * @return void
     */
    /* function cleanupUploads()
    {
        $queue = new Queue();
        $queue->attach($this); // listen for all events
        $queue->cleanup();
        // $completed_jobs = $queue->getJobs($params);
    } */

    function cron_processQueue($cronInfo)
    {
        try {
            $cron_name = @$cronInfo['cron_name'] ?: 'AdvancedImport';
            $this->processQueue();
            return sprintf("%s - all jobs have been processed", $cron_name);
        } catch (\Exception $e) {
            return sprintf("%s -  error processing the jobs ( %s )", $cron_name, $e->getMessage());
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
            $this->onModuleSystemEnable();
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }


    /**
     * get a reference to the sqlite3 DB
     * create the database if not exists
     *
     * @return Database
     */
    public static function db()
    {
        $db_path = self::getDataDirectory().DIRECTORY_SEPARATOR.self::DB_NAME;
        $database = new Database($db_path);
        return $database;
    }

    /**
     * helper method to delete all files from a folder
     *
     * @param string $path
     * @return void
     */
    private function cleanupDirectory($path)
    {
        $files = glob($path."/*", GLOB_BRACE); // get all file names
        foreach($files as $file){ // iterate files
            if(is_file($file)) {
                unlink($file); // delete file
            }
        }
    }

    /**
     * delete all created files and folders
     *
     * @return void
     */
    function onModuleSystemDisable()
    {
        $upload_directory = self::getUploadDirectory();
        $this->cleanupDirectory($upload_directory);
        unlink($upload_directory);

        $data_directory = self::getDataDirectory();
        $this->cleanupDirectory($data_directory);
        unlink($data_directory);
    }

    function redcap_module_system_disable($version)
    {
        try {
            $this->onModuleSystemDisable();
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }

    /**
     * create the data and uploads directory
     * and the SQLite database with the jobs table
     *
     * @return void
     */
    public function onModuleSystemEnable()
    {
        $dataDir = self::getDataDirectory();
        $uploadDir = self::getUploadDirectory();
        $dirs = [$dataDir, $uploadDir];
        foreach ($dirs as $dir) {
            if(!file_exists($dir)) mkdir($dir, 0777, $recursive=true);
        }
        $queue = new Queue();
        $queue->createJobsTable();
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