<?php namespace Vanderbilt\AdvancedImport\App\Helpers\Queue;

use Vanderbilt\AdvancedImport\App\Helpers\DatabaseQueryHelper;

class Queue
{
    public function __construct()
    {
        
    }

    public function getJobs($params=[])
    {
        $start = @$params['start'] ?: 0;
        $offset= @$params['offset'] ?: 100;
        $status_list = @$params['status'] ?: [];

        $offset =  $offset ?: 100;
        if($offset>0) {
            $start = $start ?: 0;
            $limit_clause = sprintf("LIMIT %u, %u", $start, $offset);
        } else {
            $limit_clause = '';
        }
        
        $status_to_get = [];
        foreach($status_list as $status) {
            $status_to_get[] = checkNull($status);
        }
        if(empty($status_list)) {
            $where_clause = '';
        }else {
            $where_clause = printf(" AND `status IN (%s)`", implode(',', $status_to_get));
        }

        $query_string = sprintf(
            "SELECT * FROM %s WHERE 1 %s %s",
            Job::tableName(),
            $where_clause,
            $limit_clause
        );
        $result = db_query($query_string);
        $jobs = [];
        while($row = db_fetch_assoc($result)) {
            $job = new Job($row);
            $jobs[] = $job;
        }
        return $jobs;
    }

    public function countJobs()
    {
        $query_string = sprintf("SELECT COUNT(*) AS total FROM %s", Job::tableName());
        $result = $this->module->queryLogs($query_string);
        if($row = db_fetch_object($result)){
            return $row->total;
        }
        return 0;
    }

    /**
     *
     * @return Generator|Job[]
     */
    public function jobsGenerator()
    {
        $skip_status = [
            Job::STATUS_COMPLETED,
            Job::STATUS_PROCESSING,
            Job::STATUS_ERROR
        ];

        $query_string = sprintf(
            "SELECT * FROM %s WHERE status NOT IN (%s)",
            Job::tableName(),
            DatabaseQueryHelper::getQueryList($skip_status)
        );
        $result = db_query($query_string);
        while($row = db_fetch_assoc($result)) {
            $job = new Job($row);
            yield $job;
        }
    }


}