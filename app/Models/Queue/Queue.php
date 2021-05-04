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
        
        
        $where_clause = '';
        $status_to_get = array_map('checkNull', $status_list);
        if(!empty($status_to_get)) $where_clause = printf(" AND `status IN (%s)`", implode(',', $status_to_get));
        $limit_clause = '';
        if($limit>0) {
            $start = intval($start);
            $limit_clause = sprintf("LIMIT %u, %u", $start, $limit);
        }
        $fields = array_map(function($key) {
            return sprintf('`{%s}` AS `%s`', $key, $key);
        }, Job::getKeys());

        $db = AdvancedImport::dbExMod();
        $query_string = sprintf(
            "SELECT `value` FROM %s WHERE `{project_id}`=? %s %s",
            Job::TABLE_NAME, $where_clause, $limit_clause
        );
        $criteria = [$project_id];

        $result = $db->query($query_string, $criteria);
        $jobs = [];
        while($row = db_fetch_assoc($result)) {
            $entry = json_decode(@$row['value'], $assoc=true);
            $type = @$entry['type'];
            if($type==Job::TYPE_IMPORT) {
                $job = new ImportJob($entry);
            }else {
                throw new \Exception("Error creating a list of jobs", 1);
            }
            $jobs[] = $job;
        }
        return $jobs;

        /* if($limit>0) {
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
        return $jobs; */
    }

    public function countJobs($project_id)
    {
        $db = AdvancedImport::dbExMod();
        $query_string = sprintf('SELECT COUNT(1) as total FROM %s WHERE `{project_id}`=?', Job::TABLE_NAME);
        $result = $db->query($query_string, [$project_id]);
        if($row = db_fetch_assoc($result)) {
            return intval($row['total']);
        }
        return 0;
        /* $results = $db->search(Job::TABLE_NAME, ['project_id', $project_id]);
        $all = $results->getReturn();
        return count($all); */
        
        /* $query_string = sprintf("SELECT COUNT(*) AS total FROM %s WHERE project_id=:", Job::TABLE_NAME);
        $stmt = AdvancedImport::db()->query($query_string, ['project_id'=>$project_id]);
        if($row = $stmt->fetch()){
            return @$row['total'];
        }
        return 0; */
    }

    /**
     *
     * @return Generator|Job[]
     */
    public function jobsGenerator()
    {
        $db = AdvancedImport::dbExMod();
        $results = $db->search(Job::TABLE_NAME, ['status', Job::STATUS_READY]);
        while($row = $results->current()) {
            $type = @$row['type'];
            if($type==Job::TYPE_IMPORT) {
                $job = new ImportJob($row);
            }else {
                throw new \Exception("Error creating a list of jobs", 1);
            }
            yield $job;
            $results->next();
        }
        /* $query_string = sprintf(
            "SELECT * FROM %s WHERE status=:status",
            Job::TABLE_NAME
        );
        $stmt = AdvancedImport::db()->query($query_string, ['status'=>Job::STATUS_READY]);
        while($row = $stmt->fetch()) {
            $type = @$row['type'];
            if($type==Job::TYPE_IMPORT) {
                $job = new ImportJob($row);
            }else {
                throw new \Exception("Error creating a list of jobs", 1);
            }
            yield $job;
        } */
    }

    public function updateJob($project_id, $job_id, $data)
    {
        $db = AdvancedImport::dbExMod();
        $results = $db->search(Job::TABLE_NAME, [['id', $job_id], ['project_id', $project_id]]);
        $job = $results->current();
        if(!$job) return false;
        $filtered = [];
        // filter allowed
        foreach($data as $key=>$value) {
            if(!array_key_exists($key, $job)) continue;
            $filtered[$key] = $value;
        }
        $updated = $db->update(Job::TABLE_NAME, $filtered, ['id'=>$job_id]);
        return $updated;


        /* $pdo = AdvancedImport::db();
        $stmt = $pdo->query(sprintf("SELECT * FROM %s WHERE id=:id AND project_id=:project_id", Job::TABLE_NAME), ['id'=>$job_id, 'project_id'=>$project_id]);
        if(!$job=$stmt->fetch(PDO::FETCH_ASSOC)) return false;
        $filtered = [];
        // filter allowed and translate objects/arrays (settings) to string
        foreach($data as $key=>$value) {
            if(!array_key_exists($key, $job)) continue;
            if(is_object($value)|| is_array($value)) $value = json_encode($value, JSON_PRETTY_PRINT);
            $filtered[$key] = $value;
        }
        $result = $pdo->update(Job::TABLE_NAME, $filtered, ['id'=>$job_id]);
        return $result; */
    }

    public function updateJobStatus($project_id, $job_id, $status)
    {
        $db = AdvancedImport::dbExMod();
        $results = $db->search(Job::TABLE_NAME, [['id', $job_id], ['project_id', $project_id]]);
        $job = $results->current();
        if(!$job) return false;
        $updated = $db->update(Job::TABLE_NAME, ['status'=>$status], ['id', $job_id]);
        return $updated;

        /* $pdo = AdvancedImport::db();
        $stmt = $pdo->query(sprintf("SELECT * FROM %s WHERE id=:id AND project_id=:project_id", Job::TABLE_NAME), ['id'=>$job_id, 'project_id'=>$project_id]);
        if(!$job=$stmt->fetch()) return false;
        $updated = $pdo->update(Job::TABLE_NAME, ['status'=>$status], ['id'=>$job_id]);
        return $updated; */
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
        $db = AdvancedImport::dbExMod();
        $results = $db->search(Job::TABLE_NAME, [['id', $job_id], ['project_id', $project_id]]);
        $job = $results->current();
        if(!$job) {
            $message = sprintf("The job ID %u wa s not found and cannot be deleted", $job_id);
            $this->notify('log', compact('message'));
            return false;
        };
        $deleted = $db->delete(Job::TABLE_NAME, ['id', $job_id]);
        if(!$deleted) {
            $message = sprintf("There was ann error deleting the job ID %u", $job_id);
            $this->notify('log', compact('message'));
            return false;
        };

        $deleteFile = function($job) use($db){
            $unlinkFile = function($filename) {
                $file_path = AdvancedImport::getUploadedFilePath($filename);
                $file_exists = is_file($file_path);
                if(!$file_exists) return false;
                return unlink($file_path);
            };
            $unlink = true; // assume the file must be deleted
            $unlinked = false; //deletion state
            $filename = @$job['filename'];
            $results = $db->search(Job::TABLE_NAME, ['filename', $$filename]);
            $all = $results->getReturn();
            if(!empty($all)) $unlink = false; // file used by other jobs; cannot delete
            if($unlink) $unlinked = $unlinkFile($filename);
            return $unlinked;
        };

        $deleted = $deleteFile($job);
        if(!$deleted) $message = sprintf("The job ID %u has been deleted", $job_id);
        else $message = sprintf("The job ID %u and its associated file have been deleted", $job_id);
        $this->notify('log', compact('message'));
        return $deleted;


        /* $isFileUsedInOtherJobs = function($job_id, $filename) {
            $query_string = sprintf("SELECT COUNT(*) AS total FROM %s WHERE id!=:id AND filename=:filename", Job::TABLE_NAME);
            $stmt = AdvancedImport::db()->query($query_string, ['id'=>$job_id, 'filename'=>$filename]);
            if(!$stmt) throw new \Exception(sprintf("Error checking if data file '%s' is used in multiple jobs", $filename), 1);

            if($row=$stmt->fetch()) {
                $total = intval(@$row['total']);
                return $total>0;
            }
            return false;
        };
        $pdo = AdvancedImport::db();
        $query_string = sprintf("SELECT * FROM %s WHERE id=:id AND project_id=:project_id", Job::TABLE_NAME);
        $stmt = $pdo->query($query_string, ['id'=>$job_id, 'project_id'=>$project_id]);


        if ($job=$stmt->fetch()) {

            $file_ok = false; // check if file has been deleted or is used by other jobs
            $filename = @$job['filename'];
            
            $deleted_job = $pdo->delete(Job::TABLE_NAME, ['id'=>$job_id]);
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
                $this->notify('log', compact('message'));
                return $deleted_job;
            }else {
                $message = sprintf("There was ann error deleting the job ID %u", $job_id);
                $this->notify('log', compact('message'));
                return false;
            }
        }
        return false; */
    }

    public function createJobsTable()
    {
        $db = AdvancedImport::dbExMod();
        return $db->createTable(Job::TABLE_NAME);

        /* $query_string = sprintf(
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
        return $result; */
    }

}