<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Traits\Observer\SubjectTrait;

class Logs extends BaseModel
{
    use SubjectTrait;

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
        $this->attach($this->module, '*'); // attache the module as a subscriber
    }

    public function getList($start=0, $limit=100)
    {
        $start = $start ?: 0;
        $limit =  $limit ?: 100;
        $fields = [
            'log_id',
            'project_id',
            'record_id',
            'instance_number',
            'timestamp',
            'line',
            'message',
            'ip',
        ];
        $query_string = sprintf(
            "SELECT %s
            ORDER BY log_id DESC, timestamp DESC",
            implode(',',$fields)
        );
		if($limit>0) $query_string .= " LIMIT {$start}, {$limit}";
		$result = $this->module->queryLogs($query_string);
		$logs = [];
		while($row = db_fetch_object($result)){
			$logs[] = $row;
        }
        return $logs;
    }

    public function getTotal()
    {
        $query_string = "SELECT COUNT(*) AS total";
        $result = $this->module->queryLogs($query_string);
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
            $this->notify('log', compact('message'));
            throw new \Exception($message, 1);
            
        }
        if($row = db_fetch_object($result)){
            return $row;
        }
    }


}