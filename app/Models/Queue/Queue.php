<?php namespace Vanderbilt\AdvancedImport\App\Models\Queue;

use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Helpers\DatabaseQueryHelper;
use Vanderbilt\AdvancedImport\App\Traits\Observer\SubjectTrait;

class Queue
{

    use SubjectTrait;

    public function __construct()
    {
    }

    public function getJobs($params=[])
    {
        $start = @$params['start'] ?: 0;
        $limit= @$params['limit'] ?: 100;
        $status_list = @$params['status'] ?: [];
        $project_id = @$params['project_id'] ?: 0;

        if($limit>0) {
            $start = $start ?: 0;
            $limit_clause = sprintf("LIMIT %u, %u", $start, $limit);
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
            "SELECT * FROM %s
            WHERE 1
            AND project_id=%u
            %s %s",
            self::tableName(),
            $project_id,
            $where_clause,
            $limit_clause
        );
        $result = db_query($query_string);
        $jobs = [];
        while($row = db_fetch_assoc($result)) {
            $type = @$row['type'];
            if($type==Job::TYPE_IMPORT) {
                $job = new ImportJob($row);
            }else {
                throw new \Exception("Error creating a list of jobs", 1);
            }
            $jobs[] = $job;
        }
        return $jobs;
    }

    public function countJobs()
    {
        $query_string = sprintf("SELECT COUNT(*) AS total FROM %s", self::tableName());
        $result = db_query($query_string);
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
            Job::STATUS_ERROR,
            Job::STATUS_DELETED,
            Job::STATUS_STOPPED,
        ];

        $query_string = sprintf(
            "SELECT * FROM %s WHERE status NOT IN (%s)",
            self::tableName(),
            DatabaseQueryHelper::getQueryList($skip_status)
        );
        $result = db_query($query_string);
        while($row = db_fetch_assoc($result)) {
            $type = @$row['type'];
            if($type==Job::TYPE_IMPORT) {
                $job = new ImportJob($row);
            }else {
                throw new \Exception("Error creating a list of jobs", 1);
            }
            yield $job;
        }
    }

    public function updateJobStatus($project_id, $job_id, $status)
    {
        $query_string = sprintf(
            "UPDATE `%s` SET `status`='%s' WHERE project_id=%u AND id=%u",
            self::tableName(),  $status, $project_id, $job_id
        );
        $result = db_query($query_string);
        if($result==false) return false;
        return true;
    }

    public function deleteJob( $job_id)
    {
        $query_string = sprintf(
            "DELETE FROM `%s` WHERE id=%u",
            self::tableName(), $job_id
        );
        $result = db_query($query_string);
        if($result==false) return false;
        return true;
    }

    public function cleanup()
    {
        $query_string = sprintf(
            "SELECT * FROM `%s` WHERE `status`=%s",
            self::tableName(), checkNull(Job::STATUS_DELETED)
        );
        $result = db_query($query_string);
        while ($row=db_fetch_assoc($result)) {
            db_query("SET AUTOCOMMIT=0");
            db_query("BEGIN");
            $deleted_file = false;
            $id = @$row['id'];
            $filename = @$row['filename'];
            $deleted_job = $this->deleteJob($id);
            if($deleted_job) {
                $message = sprintf("The job ID %u and its associated file have been deleted", $id);
                $file_path = AdvancedImport::getUploadedFilePath($filename);
                $file_exists = is_file($file_path);
                if(!$file_exists) {
                    // file not found; consider it deleted
                    $deleted_file = true;
                }else {
                    $deleted_file = unlink($file_path);
                }
                if($deleted_file) $this->notify('log', compact('message'));
            }
            if(!$deleted_job || !$deleted_file) {
                db_query("ROLLBACK");
		        db_query("SET AUTOCOMMIT=1");
                $message = sprintf("There was ann error deleting the job ID %u and its associated file", $id);
                $this->notify('log', compact('message'));
            }

            db_query("COMMIT");
            db_query("SET AUTOCOMMIT=1");
        }
    }


    public static function tableName()
    {
        return  AdvancedImport::TABLES_PREFIX.'import_queue';
    }

    public static function createTable()
    {
        $status = [
            Job::STATUS_READY,
            Job::STATUS_ERROR,
            Job::STATUS_COMPLETED,
            Job::STATUS_PROCESSING,
            Job::STATUS_STOPPED,
            Job::STATUS_DELETED,
        ];
        $status_string = DatabaseQueryHelper::implodeAndQuote(', ', $status, "'");
        $types = [Job::TYPE_IMPORT, Job::TYPE_EXPORT];
        $typess_string = DatabaseQueryHelper::implodeAndQuote(', ', $types, "'");
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
                `status` ENUM(%s) DEFAULT '%s' COMMENT 'status of the job',
                `type` ENUM(%s) DEFAULT NULL COMMENT 'type of job',
                `created_at` datetime DEFAULT NULL,
                `updated_at` datetime DEFAULT NULL,
                `completed_at` datetime DEFAULT NULL
            )
            ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
            self::tableName(),
            $status_string, $status[0], $typess_string
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