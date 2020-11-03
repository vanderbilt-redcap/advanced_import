<?php namespace Vanderbilt\AdvancedImport\App\Controllers;

use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Logger;

class LogController extends BaseController
{
    private $module;

    function __construct()
    {
        // global $module;
        parent::__construct();
		
        // $this->module = $module;
		$this->module = new AdvancedImport();
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
            $model = new Logger($this->module);
            $logs = $model->getList($start, $limit);
            $total = $model->getTotal();
            $response = array(
                'data' => $logs,
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

    /**
     * delete logs for the current project
     *
     * @return void
     */
    public function delete()
    {
        try {
            $project_id = $this->module->getProjectId();
            $model = new Logger($this->module);
            $result = $model->delete($project_id);
            $response = [
                'message'=>'ok',
                'result' => $result,
            ];
            $this->printJSON($response);
        } catch (\Exception $e) {
            $response = [
                'message'=> $e->getMessage(),
            ];
            $this->printJSON($response, $e->getCode());
        }
    }
    

}