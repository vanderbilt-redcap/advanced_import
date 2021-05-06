<?php namespace Vanderbilt\AdvancedImport\App\Models\Queue;

use PDO;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Traits\Observer\SubjectTrait;

class Queue
{

    use SubjectTrait;

    public function __construct() {}

    public function getJobs($params=[])
    {
        $start = @$params['start'] ?: 0;
        $limit= @$params['limit'] ?: 100;
        $status_list = @$params['status'] ?: [];
        $project_id = @$params['project_id'] ?: 0;
        
        $where_clause = '`project_id`=?';
        $status_to_get = array_map('checkNull', $status_list);
        if(!empty($status_to_get)) $where_clause = printf(" AND `status IN (%s)`", implode(',', $status_to_get));
        $limit_clause = '';
        if($limit>0) {
            $start = intval($start);
            $limit_clause = sprintf("LIMIT %u, %u", $start, $limit);
        }

        $db = AdvancedImport::colDb();
        $query_string = sprintf(
            "SELECT * FROM `%s` WHERE %s %s",
            Job::TABLE_NAME, $where_clause, $limit_clause
        );
        $criteria = [$project_id];

        $result = $db->query($query_string, $criteria);
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

    public function countJobs($project_id)
    {
        $db = AdvancedImport::colDb();
        $query_string = sprintf('SELECT COUNT(1) as `total` FROM `%s` WHERE `project_id`=?', Job::TABLE_NAME);
        $result = $db->query($query_string, [$project_id]);
        if($row = db_fetch_assoc($result)) {
            return intval($row['total']);
        }
        return 0;
    }

    /**
     *
     * @return Generator|Job[]
     */
    public function jobsGenerator()
    {
        $db = AdvancedImport::colDb();
        $results = $db->search(Job::TABLE_NAME, '`status`=?', [Job::STATUS_READY]);
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
    }

    public function updateJob($project_id, $job_id, $data)
    {
        $db = AdvancedImport::colDb();
        $results = $db->search(Job::TABLE_NAME, '`id`=? AND `project_id`=?', [$job_id, $project_id]);
        $job = $results->current();
        if(!$job) return false;
        $filtered = [];
        // filter allowed
        foreach($data as $key=>$value) {
            if(!array_key_exists($key, $job)) continue;
            $filtered[$key] = $value;
        }
        $updated = $db->update(Job::TABLE_NAME, $filtered, '`id`=?', [$job_id]);
        return $updated;
    }

    public function updateJobStatus($project_id, $job_id, $status)
    {
        $db = AdvancedImport::colDb();
        $results = $db->search(Job::TABLE_NAME, '`id`=? AND `project_id`=?', [$job_id, $project_id]);
        $job = $results->current();
        if(!$job) return false;
        $updated = $db->update(Job::TABLE_NAME, ['status'=>$status], '`id`=?', [$job_id]);
        return $updated;
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
        $db = AdvancedImport::colDb();
        $results = $db->search(Job::TABLE_NAME, '`id`=? AND `project_id`=?', [$job_id, $project_id]);
        $job = $results->current();
        if(!$job) {
            $message = sprintf("The job ID %u wa s not found and cannot be deleted", $job_id);
            $this->notify('log', compact('message'));
            return false;
        };
        $deleted = $db->delete(Job::TABLE_NAME, '`id`=?', [$job_id]);
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
            $entries = $db->getEntries(Job::TABLE_NAME, '`filename`=?', [$$filename]);
            if(!empty($entries)) $unlink = false; // file used by other jobs; cannot delete
            if($unlink) $unlinked = $unlinkFile($filename);
            return $unlinked;
        };

        $deleted = $deleteFile($job);
        if(!$deleted) $message = sprintf("The job ID %u has been deleted", $job_id);
        else $message = sprintf("The job ID %u and its associated file have been deleted", $job_id);
        $this->notify('log', compact('message'));
        return $deleted;
    }

    public function createJobsTable()
    {
        $db = AdvancedImport::colDb();
        return $db->createTable(Job::TABLE_NAME, [
            'primary_key'=>'id',
            'fields' => ['type','error','status','user_id','filename','settings','created_at','project_id','updated_at','completed_at','processed_lines'],
        ]);
    }

}