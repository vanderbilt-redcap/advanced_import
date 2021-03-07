<?php namespace Vanderbilt\AdvancedImport\App\Controllers;

use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Helpers\Queue\Queue;
use Vanderbilt\AdvancedImport\App\Models\Logs;

class QueueController extends BaseController
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
            // $project_id = $_GET['pid'];
            $start = @$_GET['_start'];
            $limit =  @$_GET['_limit'];
            $status =  @$_GET['_status'];
            $model = new Queue();
            $entries = $model->getJobs($start, $limit);
            $total = $model->countJobs();
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
    

}