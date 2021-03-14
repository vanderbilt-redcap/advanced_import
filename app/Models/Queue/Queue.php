<?php namespace Vanderbilt\AdvancedImport\App\Models\Queue;

use PDO;
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
            AND project_id=?
            %s %s",
            Job::TABLE_NAME,
            $where_clause,
            $limit_clause
        );
        $stmt = AdvancedImport::db()->query($query_string, [$project_id]);
        $jobs = [];
        while($row = $stmt->fetch()) {
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
        $query_string = sprintf("SELECT COUNT(*) AS total FROM %s", Job::TABLE_NAME);
        $stmt = AdvancedImport::db()->query($query_string);
        if($row = $stmt->fetch()){
            return @$row['total'];
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
            Job::TABLE_NAME,
            DatabaseQueryHelper::getQueryList($skip_status)
        );
        $stmt = AdvancedImport::db()->query($query_string);
        while($row = $stmt->fetch()) {
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
            "UPDATE `%s` SET `status`=? WHERE project_id=? AND id=?",
            Job::TABLE_NAME
        );
        $stmt = AdvancedImport::db()->query($query_string, [$status, $project_id, $job_id]);
        if($stmt==false) return false;
        return true;
    }

    /**
     * delete a job
     * use both id and project_id to prevent
     * abuse from the API
     * the project ID is created in the controller and cannot be forged
     * by a user
     *
     * @param int $project_id
     * @param int $job_id
     * @return int|bool
     */
    public function deleteJob($project_id, $job_id)
    {
        $isFileUsedInOtherJobs = function($job_id, $filename) {
            $query_string = sprintf("SELECT * FROM %s WHERE id!=:id AND filename=:filename", Job::TABLE_NAME);
            $stmt = AdvancedImport::db()->query($query_string, ['id'=>$job_id, 'filename'=>$filename]); 
            if($stmt==false) throw new \Exception("Error checkingif file is used in other jobs", 1);
            $results = $stmt->fetchAll();
            $count = $stmt->rowCount();
            return count($results)>0;
        };
        $query_string = sprintf(
            "SELECT * FROM `%s` WHERE `id`=:id AND `project_id`=:project_id",
            Job::TABLE_NAME
        );
        $stmt = AdvancedImport::db()->query($query_string, ['id'=>$job_id, 'project_id'=>$project_id]);
        if ($row = $stmt->fetch()) {

            $db = AdvancedImport::db();
            $db->beginTransaction();

            $file_ok = false; // check if file has been deleted or is used by other jobs
            $filename = @$row['filename'];
            $deleted_job = $db->delete(Job::TABLE_NAME, ['id'=> $job_id]);
            $message = '';
            if($deleted_job) {
                if(!$isFileUsedInOtherJobs($job_id, $filename)) {
                    $file_path = AdvancedImport::getUploadedFilePath($filename);
                    $file_exists = is_file($file_path);
                    if(!$file_exists) {
                        // file not found; consider it deleted
                        $file_ok = true;
                    }else {
                        $file_ok = unlink($file_path);
                    }
                    $message = sprintf("The job ID %u and its associated file have been deleted", $job_id);
                }else {
                    $file_ok = true;
                    $message = sprintf("The job ID %u has been deleted", $job_id);
                }
            }
            if($deleted_job && $file_ok) {
                $db->commit();
                $this->notify('log', compact('message'));
                return $deleted_job;
            }else {
                $db->rollBack();
                $message = sprintf("There was ann error deleting the job ID %u", $job_id);
                $this->notify('log', compact('message'));
                return false;
            }
        }
        return false;
    }

    public function createJobsTable()
    {
        $query_string = sprintf(
            "CREATE TABLE IF NOT EXISTS `%s`
             (
                `id` INTEGER PRIMARY KEY,
                `project_id` INTEGER NOT NULL,
                `user_id` INTEGER NOT NULL,
                `filename` TEXT,
                `settings` BLOB,
                `processed_lines` INTEGER NOT NULL DEFAULT 0,
                `error` TEXT DEFAULT NULL,
                `status` TEXT DEFAULT '%s',
                `type` TEXT DEFAULT NULL,
                `created_at` TEXT DEFAULT NULL,
                `updated_at` TEXT DEFAULT NULL,
                `completed_at` TEXT DEFAULT NULL
            )",
            Job::TABLE_NAME, Job::STATUS_READY
        );
        $result = AdvancedImport::db()->query($query_string);
        if(!$result) {
            throw new \Exception("Error creating the Jobs table", 1);
            return false;
        }
        return $result;
    }
}