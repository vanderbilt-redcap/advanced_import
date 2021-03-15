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

        $queryBuilder = AdvancedImport::dbStore(Job::STORE_NAME)->createQueryBuilder();
        $query = $queryBuilder->where(['project_id', '==', $project_id]);
        if(count($status_list)>0) $query = $query->where(['status', 'IN', $status_list]);
        if($limit>0) {
            $start = $start ?: 0;
            $query = $query->skip($start)->limit($limit);
        }

        $jobs = $query->getQuery()->fetch();
        return $jobs;
    }

    public function countJobs($project_id)
    {
        $store = AdvancedImport::dbStore(Job::STORE_NAME);
        $jobs = $store->findBy(['project_id', '==', $project_id]);
        return count($jobs);
    }

    /**
     *
     * @return Generator|Job[]
     */
    public function jobsGenerator()
    {
        $store = AdvancedImport::dbStore(Job::STORE_NAME);
        $jobs = $store->findBy(['status', '==', Job::STATUS_READY]);

        foreach ($jobs as $job_data) {
            $type = @$job_data['type'];
            if($type==Job::TYPE_IMPORT) {
                $job = new ImportJob($job_data);
            }else {
                throw new \Exception("Error creating a list of jobs", 1);
            }
            yield $job;
        }
    }

    public function updateJob($project_id, $id, $data)
    {
        $store = AdvancedImport::dbStore(Job::STORE_NAME);
        $job_data = @$store->findBy([['id','==', $id],['project_id','==',$project_id]])[0];
        if(!$job_data) return false;
        foreach ($job_data as $key => $value) {
            if(!array_key_exists($key, $data)) continue;
            $job_data[$key] = $data[$key];
        }
        $updated = $store->update($job_data);
        return $updated;
    }

    public function updateJobStatus($project_id, $job_id, $status)
    {
        $store = AdvancedImport::dbStore(Job::STORE_NAME);
        $job = $store->findBy([['id','==', $job_id],['project_id','==',$project_id]]);
        if(!$job) return false;
        $updated = $store->updateById($job_id, ['status'=>$status]);
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
        $isFileUsedInOtherJobs = function($job_id, $filename) {
            $jobs = AdvancedImport::dbStore(Job::STORE_NAME)->findBy([['id', '!=', $job_id],['filename', '=', $filename]]);
            return count($jobs)>0;
        };
        $store = AdvancedImport::dbStore(Job::STORE_NAME);
        $job = $store->findById($job_id);

        if ($job) {

            $file_ok = false; // check if file has been deleted or is used by other jobs
            $filename = @$job['filename'];
            $deleted_job = $store->deleteById($job_id);
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
        return false;
    }

}