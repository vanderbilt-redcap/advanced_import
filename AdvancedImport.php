<?php
namespace Vanderbilt\AdvancedImport;

$autoload = join([__DIR__,'vendor','autoload.php'],DIRECTORY_SEPARATOR);
if(file_exists($autoload)) require_once($autoload);

use DateInterval;
use DateTime;
use ExternalModules\AbstractExternalModule;
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
    const MAX_CRON_EXECUTION_TIME = '30 minutes';
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
     * path to the data directory:
     * contains the 'uploads' folder and the SQLite database
     *
     * @return string
     */
    public static function getDatabaseDirectory()
    {
        $base_path = self::getDataDirectory();
        $upload_dir = $base_path."/database";
        return $upload_dir;
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
        $base_path = self::getDataDirectory();
        $upload_dir = $base_path."/uploads";
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
        while($job = $jobs_generator->current()) {
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
            $jobs_generator->next();
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
        $project_id = @$data['project_id'];
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
                $data['project_id'] = $project_id ?: $this->getProjectId(); // this is filled anyway in log_internal
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
     * create the database if not exists.
     * 
     * NOTE: I need to update the privileges
     * of the database folder before using it
     * to avoid errors when the cronjob user
     * iss different from the webserver user
     *
     * @return Database
     */
    public static function db()
    {
        $logFileInfo = function($db_name, $db_path) {
            $permissions = shell_exec('getfacl '.$db_path);
            $file_exists = file_exists($db_path);
            $message = sprintf("getfacl for '%s': ", $db_name).$permissions;
            $message .= sprintf("file_exists: %s", $file_exists);
            self::getInstance()->log($message);
        };

        $db_dir = self::getDatabaseDirectory();
        $db_path = $db_dir.DIRECTORY_SEPARATOR.self::DB_NAME;
        // $logFileInfo(self::DB_NAME, $db_path);
        self::chmod_r($db_dir);
        $database = new Database($db_path);
        return $database;
    }

    /**
     * update privileges recursively in a folder
     *
     * @param string $path
     * @param integer $mode
     * @return void
     */
    public static function chmod_r($path, $mode=0777) {
        $dir = new \DirectoryIterator($path);
        foreach ($dir as $item) {
            chmod($item->getPathname(), $mode);
            if ($item->isDir() && !$item->isDot()) {
                self::chmod_r($item->getPathname(), $mode);
            }
        }
    }

    /**
     * get a SleekDB Store
     *
     * @param string $store_name
     * @return \SleekDB\Store
     */
    public static function dbStore($store_name)
    {
        $configuration = [
            "auto_cache" => true,
            "cache_lifetime" => null,
            "timeout" => 120,
            "primary_key" => "id",
            "search" => [
                "min_length" => 1,
                "mode" => "or",
                // "score_key" => null,
                // "algorithm" => Query::SEARCH_ALGORITHM["hits"]
            ]
        ];
        $db_path = self::getDatabaseDirectory();
        self::chmod_r($db_path);
        $store = new \SleekDB\Store($store_name, $db_path, $configuration);
        return $store;
    }

    /**
     * Recursively deletes a directory tree.
     *
     * @param string $folder         The directory path.
     * @param bool   $keepRootFolder Whether to keep the top-level folder.
     *
     * @return bool TRUE on success, otherwise FALSE.
     */
    private function deleteTree($folder, $keepRootFolder = false)
    {
        // Handle bad arguments.
        if (empty($folder) || !file_exists($folder)) {
            return true; // No such file/folder exists.
        } elseif (is_file($folder) || is_link($folder)) {
            return @unlink($folder); // Delete file/link.
        }

        // Delete all children.
        $files = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($folder, \RecursiveDirectoryIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::CHILD_FIRST
        );

        foreach ($files as $fileinfo) {
            $action = ($fileinfo->isDir() ? 'rmdir' : 'unlink');
            if (!@$action($fileinfo->getRealPath())) {
                return false; // Abort due to the failure.
            }
        }

        // Delete the root folder itself?
        return (!$keepRootFolder ? @rmdir($folder) : true);
    }

    /**
     * delete all created files and folders
     *
     * @return void
     */
    function onModuleSystemDisable()
    {
        $data_directory = self::getDataDirectory();
        $this->deleteTree($data_directory);
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
     * create the directories
     * needed by the module
     *
     * @return void
     */
    public function onModuleSystemEnable()
    {
        $dataDir = self::getDataDirectory();
        $uploadDir = self::getUploadDirectory();
        $databaseDir = self::getDatabaseDirectory();
        $dirs = [$dataDir, $databaseDir, $uploadDir];
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