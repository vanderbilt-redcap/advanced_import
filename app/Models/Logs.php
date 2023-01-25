<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Traits\Observer\SubjectTrait;

class Logs extends BaseModel
{
    use SubjectTrait;

    const NOTIFICATION_LOG = 'Logs:log';
    const NOTIFICATION_EMERGENCY = 'Logs:emergency';
    const NOTIFICATION_ALERT = 'Logs:alert';
    const NOTIFICATION_CRITICAL = 'Logs:critical';
    const NOTIFICATION_ERROR = 'Logs:error';
    const NOTIFICATION_WARNING = 'Logs:warning';
    const NOTIFICATION_NOTICE = 'Logs:notice';
    const NOTIFICATION_INFO = 'Logs:info';
    const NOTIFICATION_DEBUG = 'Logs:debug';

    /**
     *
     * @var AdvancedImport
     */
    private $module;
    
    /**
     * constructor
     *
     * @param AdvancedImport $module
     */
	function __construct($module)
	{
        $this->module = $module;
        parent::__construct();
        $this->attach($this->module, self::NOTIFICATION_LOG);
        $this->attach($this->module, self::NOTIFICATION_EMERGENCY);
        $this->attach($this->module, self::NOTIFICATION_ALERT);
        $this->attach($this->module, self::NOTIFICATION_CRITICAL);
        $this->attach($this->module, self::NOTIFICATION_ERROR);
        $this->attach($this->module, self::NOTIFICATION_WARNING);
        $this->attach($this->module, self::NOTIFICATION_NOTICE);
        $this->attach($this->module, self::NOTIFICATION_INFO);
        $this->attach($this->module, self::NOTIFICATION_DEBUG);
    }

    public function getList($start=0, $limit=100)
    {
        $start = $start ?: 0;
        $limit =  $limit ?: 100;
        $query_string = "SELECT * FROM redcap_external_modules_log ORDER BY log_id DESC, timestamp DESC";
		$params = [];
		if($limit>0) {
            $query_string .= " LIMIT ?, ?";
            $params[] = $start;
            $params[] = $limit;
        }
		$result = db_query($query_string, $params);
		$logs = [];
		while($row = db_fetch_object($result)){
			$logs[] = AdvancedImport::escape($row);
        }
        return $logs;
    }

    public function getTotal()
    {
        $query_string = "SELECT COUNT(1) AS total";
        $result = $this->module->queryLogs($query_string, $params=[]);
        if($row = db_fetch_object($result)){
            return $row->total;
        }
        return 0;
    }

    public function delete($project_id)
    {
        $prefix = $this->module->PREFIX;
        if(empty($project_id || empty($prfix)))
        {
            throw new \Exception("Error: no project_id or module prefix have been specified. Cannot delete.", 400);
        }
        $logs_table = 'redcap_external_modules_log';
        $where_clauses = [
            "{$logs_table}.external_module_id = (SELECT external_module_id FROM redcap_external_modules WHERE directory_prefix = '$prefix')",
            "{$logs_table}.project_id = {$project_id}",
        ];
        $query_string = sprintf(
            "DELETE FROM %s
            WHERE %s",
            $logs_table, implode(' AND ', $where_clauses)
        );
        $result = db_query($query_string);
        if(!$result) {
            $message = "Error deleting logs from the database";
            $this->notify(self::NOTIFICATION_LOG, compact('message'));
            throw new \Exception($message, 1);
        }
        return true;
    }


}