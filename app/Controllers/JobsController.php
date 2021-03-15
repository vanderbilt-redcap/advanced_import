<?php namespace Vanderbilt\AdvancedImport\App\Controllers;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;
use Vanderbilt\AdvancedImport\App\Models\Queue\Queue;

class JobsController extends BaseController
{

    /**
     *
     * @var AdvancedImport
     */
    private $module;

    function __construct()
    {
        $this->module = AdvancedImport::getInstance();
        parent::__construct();
    }

 
    /**
     * get a list of logs for the current project
     *
     * @return void
     */
    function index()
    {
        try {
            $project_id = @$_GET['pid'];
            $project = new Project($project_id);
            $start = @$_GET['_start'];
            $limit =  @$_GET['_limit'];
            $status =  json_decode(@$_GET['_status'], $assoc=true);
            $queue = new Queue();
            $params = [
                'start' => $start,
                'limit' => $limit,
                'project_id' => $project_id,
                'status' => $status,
            ];
            $entries = $queue->getJobs($params);
            $total = $queue->countJobs($project_id);
            $response = array(
                'data' => $entries,
                'metadata' => [
                    'total' => $total,
                ]
            );
            $this->printJSON($response);
        } catch (\Exception $e) {
            $message = $e->getMessage();
            $this->printJSON(compact('message'), $e->getCode());
        }
    }

    function stopJob($id)
    {
        try {
            $project_id = @$_GET['pid'];
            $queue = new Queue();
            $response = $queue->updateJobStatus($project_id, $id, Job::STATUS_STOPPED);
            $this->printJSON($response, $code=200);
        } catch (\Throwable $th) {
            $message = $th->getMessage();
            $code = $th->getCode();
            $response = [
                'error' => true,
                'message' => $message,
            ];
            $this->printJSON($response, $code);
        }
    }

    function deleteJob($id)
    {
        try {
            $project_id = @$_GET['pid'];
            $queue = new Queue();
            $response = $queue->deleteJob($project_id, $id);
            $this->printJSON($response, $code=200);
        } catch (\Throwable $th) {
            $message = $th->getMessage();
            $code = $th->getCode();
            $response = [
                'error' => true,
                'message' => $message,
            ];
            $this->printJSON($response, $code);
        }
    }

    function updateJob($id)
    {
        try {
            $project_id = @$_GET['pid'];
            $data = json_decode(@$_POST['data'], $assoc=true);
            $queue = new Queue();
            $response = $queue->updateJob($project_id, $id, $data);
            $this->printJSON($response, $code=200);
        } catch (\Throwable $th) {
            $message = $th->getMessage();
            $code = $th->getCode();
            $response = [
                'error' => true,
                'message' => $message,
            ];
            $this->printJSON($response, $code);
        }
    }
    

}