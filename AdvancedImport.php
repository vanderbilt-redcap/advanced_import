<?php
namespace Vanderbilt\AdvancedImport;

$autoload = join(DIRECTORY_SEPARATOR, [__DIR__,'vendor','autoload.php']);
if(file_exists($autoload)) require_once($autoload);

use DateTime;
use ExternalModules\ExternalModules;
use ExternalModules\AbstractExternalModule;
use Vanderbilt\AdvancedImport\App\Models\Logs;
use Vanderbilt\AdvancedImport\App\Models\Mediator;
use Vanderbilt\AdvancedImport\App\Helpers\Database;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;
use Vanderbilt\AdvancedImport\App\Models\Queue\Queue;
use Vanderbilt\AdvancedImport\App\Helpers\ColumnarDatabase;
use Vanderbilt\AdvancedImport\App\Traits\CanCompareVersions;
use Vanderbilt\AdvancedImport\App\Interfaces\ObserverInterface;
use Vanderbilt\AdvancedImport\App\Models\ChunkUploader\ChunkUploader;

class AdvancedImport extends AbstractExternalModule implements Mediator, ObserverInterface
{

    use CanCompareVersions;

    /**
     * ID of the mnodule
     *
     * @var int
     */
    private $id;
    
    /**
     * instance of the module
     *
     * @var AdvancedImport
     */
    private static $instance;

    /**
     * reference to the DB instance
     *
     * @var Database
     */
    private $db;
    /**
     * name of the SQLite database
     */
    const DB_NAME = 'advanced_import.db';
    const TABLES_PREFIX = 'advanced_ie_';
    const UPLOAD_FOLDER_NAME = 'uploads';

    function getId()
    {
        if(!$this->id) {
            $this->id = ExternalModules::getIdForPrefix($this->PREFIX);
        }
        return $this->id;
    }

    /**
     * path to the data directory:
     * contains the 'uploads' folder and the SQLite database
     *
     * @return string
     */
    public static function getDataDirectory()
    {
        if(!defined('EDOC_PATH')) throw new \Exception("EDOC_PATH is not defined; the module's data directory cannot be set.", 1);
        
        $data_directrory = EDOC_PATH."advanced_import";
        if(!file_exists($data_directrory)) mkdir($data_directrory, 0777, $recursive=true);
        return realpath($data_directrory);
    }

    public static function getDataTable($project_id) {
        // Check if the getDataTable method exists in the REDCap class
        if (method_exists('\REDCap', 'getDataTable')) {
            // Call the getDataTable method with $project_id as parameter
            $result = call_user_func_array(['\REDCap', 'getDataTable'], [$project_id]);
        } else {
            // If the method does not exist, set a default value
            $result = "redcap_data";
        }
        return $result;
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
        if(!file_exists($upload_dir)) mkdir($upload_dir, 0777, $recursive=true);
        return realpath($upload_dir);
    }

    /**
     * path to a file inside the uploads directory
     *
     * @param string $filename
     * @return string
     */
    public static function getUploadedFilePath($filename)
    {
        $filename =  decrypt($filename); // file name is encrypted when stored so we must decrypt it first
        if($filename===false) throw new \Exception("could not decrypt the file name", 1);
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
     * check if the extension of the file being uploaded is valid
     *
     * @param string $filename
     * @return bool
     */
    public function checkUploadFileIsAllowed($filename)
    {
        $allowed = ['txt', 'csv'];
        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        return in_array($extension, $allowed);
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
     * check if the module is enabled in a specific project
     *
     * @param int $project_id
     * @return boolean
     */
    public function isEnabledInProject($project_id)
    {
        $enabled = $this->framework->isModuleEnabled($this->PREFIX, $project_id);
        return boolval($enabled);
    }

    /**
     * process valid jobs in the queue list
     *
     * @return void
     */
    public function processQueue()
    {

        $originalPid = $_GET['pid']; // save a reference to the original PID (if any)
        $queue = new Queue();
        $max_time = $this->addIntervalToDateTime(Queue::MAX_CRON_EXECUTION_TIME);
        $jobs = $queue->getJobsByStatus();
        /** @var Job $job */
        foreach($jobs as $job) {
            $project_id = $job->project_id; 
            if(!$this->isEnabledInProject($project_id)) continue; // do not process jobs for disabled projects
            $_GET['pid'] = $project_id; //set the project context
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
        }
        $_GET['pid'] = $originalPid; //restore the project context
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

    /**
     * use this if enabled at project level?
     * no, I'm setting the project context every time a job is processed
     *
     * @param array $cronInfo  [cron_name, cron_description, method, cron_processQueue, cron_frequency, cron_max_run_time]
     * @return string
     */
    function cron_processQueue($cronInfo)
    {
        try {
            $cron_name = @$cronInfo['cron_name'] ?: 'AdvancedImport';
            $this->processQueue();
            return sprintf("%s - all jobs have been processed", $cron_name);
        } catch (\Exception $e) {
            return sprintf("%s - error processing the jobs: %s", $cron_name, $e->getMessage());
        }
    }

    /**
     * get a list of running jobs and check if they 
     * stop stuck jobs and return a list of IDs
     *
     * @return array
     */
    private function stopStuckJobs() {
        $queue = new Queue();
        $jobs = $queue->getJobsByStatus(Job::STATUS_PROCESSING);
        $maxTime = $this->addIntervalToDateTime(Queue::MAX_CRON_EXECUTION_TIME);
        $doubleMaxTime = $this->addIntervalToDateTime(Queue::MAX_CRON_EXECUTION_TIME, $maxTime);
        $stuckJobs = [];
        foreach($jobs as $job) {
            if($job->updated_at>$doubleMaxTime) {
                $stuckJobsCounter[] = $job->id;
                $job->setError("the job ID {$job->id} exceeded the maximum allowed execution time and has been terminated.");
            }
        }
        return $stuckJobs;
    }

    /**
     * add an interval to the current time.
     * used, for example, to check if a queue has been running for too much time
     *
     * @return \DateTime
     */
    public function addIntervalToDateTime($dateString='30 minutes', $start=null)
    {
        if(!($start instanceof \DateTime)) $start = new \DateTime();
        $start = clone $start; // create a copy so the original is not modified
        $interval = \DateInterval::createFromDateString($dateString);
        $datetime = $start->add($interval);
        return $datetime;
    }

    /**
     * sanity check for jobs
     *
     * @param array $cronInfo
     * @return string
     */
    function cron_checkJobs($cronInfo)
    {
        $stuckJobs = $this->stopStuckJobs();
        $totalStuck = count($stuckJobs);
        $messages = ['All jobs have been checked.'];
        if($totalStuck>=1) {
            $ids = implode(', ', $stuckJobs);
            $cardinality = $totalStuck==1 ? ' was' : 's were';
            $messages[] = sprintf('%u job%s terminated because exceeded the maximum allowed process time: %s', $totalStuck, $cardinality, $ids);
        }
        return implode(' '.PHP_EOL, $messages);

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
            case Logs::NOTIFICATION_LOG:
            case Logs::NOTIFICATION_EMERGENCY:
            case Logs::NOTIFICATION_ALERT:
            case Logs::NOTIFICATION_CRITICAL:
            case Logs::NOTIFICATION_ERROR:
            case Logs::NOTIFICATION_WARNING:
            case Logs::NOTIFICATION_NOTICE:
            case Logs::NOTIFICATION_INFO:
            case Logs::NOTIFICATION_DEBUG:
                $project_id = @$data['project_id'];
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
            case ChunkUploader::NOTIFICATION_PROGRESS:
                break;
            case ChunkUploader::NOTIFICATION_COMPLETED:
                break;
            case ChunkUploader::NOTIFICATION_ERROR:
                break;
            default:
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
     *
     * @return ColumnarDatabase
     */
    public static function colDb()
    {
        $module = AdvancedImport::getInstance();
        $db = new ColumnarDatabase($module);
        return $db;
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
        // drop the columnar database when the module is disabled
        $db = self::colDb();
        $db->dropDatabase();
    }

    function redcap_module_system_disable($version)
    {
        try {
            $this->onModuleSystemDisable();
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }

    public function createWorkingDirectories()
    {
        $dataDir = self::getDataDirectory();
        $uploadDir = self::getUploadDirectory();
        $dirs = [$dataDir, $uploadDir];
        foreach ($dirs as $dir) {
            if(!file_exists($dir)) {
                $created = mkdir($dir, 0777, $recursive=true);
                if(!$created) return false;
            }
        }
        return true;
    }

    /**
     * create the directories
     * needed by the module
     *
     * @return void
     */
    public function onModuleSystemEnable()
    {
        // Logging::writeToFile($this->PREFIX.'_log.txt', 'onModuleSystemEnable');
        $this->createWorkingDirectories();
        // create tables
        $db = self::colDb();
        $this->checkDbIntegrity($db);
    }

    /**
     * create virtual tables if have not been created
     *
     * @return void
     */
    private function checkDbIntegrity($db)
    {
        $checkJobsTable = function($db){
            $tableName = Job::TABLE_NAME;
            $metadata = $db->getMetadata($tableName);
            if(!empty($metadata)) return;
            $queue = new Queue();
            $queue->createJobsTable();
        };
        $checkJobsTable($db);
    }

    

    /**
     * actions to perform when module
     *
     * @param string $version
     * @param string $old_version
     * @return void
     */
    public function redcap_module_system_change_version($version, $old_version)
    {        
        $db = self::colDb();
        /**
         * make sure to reset any previous job table created
         * before the columnar database was introduced in version 1.7.0
         */
        $checkColumnarDbInstalled = function() use($old_version){
            $columnarMinimunVersion = 'v1.7.0';
            $comparison = $this->compareVersions($columnarMinimunVersion, $old_version);
            if($comparison<0) {
                $queue = new Queue();
                $queue->createJobsTable($drop=true);
            };
        };
        /**
         * reset the jobs table on every update
         */
        $resetJobsTable = function() {
            $queue = new Queue();
            $queue->createJobsTable($drop=true);
        };
        $resetJobsTable();
        $this->checkDbIntegrity($db);
    }

    public static function escape($value){
		$type = gettype($value);

		/**
		 * The unnecessary casting on these first few types exists solely to inform psalm and avoid warnings.
		 */
		if($type === 'boolean'){
			return (bool) $value;
		}
		else if($type === 'integer'){
			return (int) $value;
		}
		else if($type === 'double'){
			return (float) $value;
		}
		else if($type === 'array'){
			$newValue = [];
			foreach($value as $key=>$subValue){
				$key = static::escape($key);
				$subValue = static::escape($subValue);
				$newValue[$key] = $subValue;
			}

			return $newValue;
		}
		else if($type === 'NULL'){
			return null;
		}
		else{
			/**
			* Handle strings, resources, and custom objects (via the __toString() method. 
			* Apart from escaping, this produces that same behavior as if the $value was echoed or appended via the "." operator.
			*/
			return htmlspecialchars(''.$value, ENT_QUOTES);
		}
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