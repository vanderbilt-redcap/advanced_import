<?php namespace Vanderbilt\AdvancedImport\App\Helpers\Queue;

use Vanderbilt\AdvancedImport\AdvancedImport;
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
            self::tableName(),
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
        $query_string = sprintf("SELECT COUNT(*) AS total FROM %s", self::tableName());
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
            self::tableName(),
            DatabaseQueryHelper::getQueryList($skip_status)
        );
        $result = db_query($query_string);
        while($row = db_fetch_assoc($result)) {
            $job = new Job($row);
            yield $job;
        }
    }

    public static function tableName()
    {
        return  AdvancedImport::TABLES_PREFIX.'import_queue';
    }

    public static function createTable()
    {
        $query_string = sprintf(
            "CREATE TABLE IF NOT EXISTS `%s`
             (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                PRIMARY KEY (`id`),
                `project_id` int(11) NOT NULL,
                `user_id` int(11) NOT NULL,
                `filename` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'path to the uploaded CSV file',
                `settings` blob,
                `processed_lines` int(11) NOT NULL DEFAULT 0,
                `error` text COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'error if any',
                `status` ENUM('ready', 'error', 'completed', 'processing', 'paused') DEFAULT 'ready' COMMENT 'status of the job',
                `created_at` datetime DEFAULT NULL,
                `updated_at` datetime DEFAULT NULL,
                `completed_at` datetime DEFAULT NULL
            )
            ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
            self::tableName()
        );
        $result = db_query($query_string);
        return $result;
    }

    public static function dropTable()
    {
        $query_string = sprintf("DROP TABLE IF EXISTS `%s`", self::tableName());
        $result = db_query($query_string);
        return $result;
    }


}