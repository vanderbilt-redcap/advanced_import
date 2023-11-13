<?php namespace Vanderbilt\AdvancedImport\App\Controllers;

use User;
use Vanderbilt\AdvancedImport\App\Models\Queue\ImportJob;
use Vanderbilt\AdvancedImport\App\Models\Queue\Job;
use Vanderbilt\AdvancedImport\App\Models\Import;

class ImportController extends BaseController
{

    function __construct()
    {
        parent::__construct();
    }

    function enqueue()
    {
        try {
            $project_id = $_GET['pid'];
            $username = defined('USERID') ? USERID : false;
            $user_id = User::getUIIDByUsername($username);
            $data = file_get_contents("php://input");
            $params = json_decode($data, $assoc=true);
            $file_name = $params['file_name'] ?? null;
            $type = $params['type'] ?? null;
            $settings = $params['settings'] ?? null;
            // manage only import for now
            if($type==Job::TYPE_IMPORT) {
                $job_id = ImportJob::create($project_id, $user_id, $file_name, $settings);
                $response = [
                    'message' => 'Job created',
                    'job_id' => $job_id
                ];
            }else {
                throw new \Exception("Error adding the job to the que. Invalid parameters", 400);
            }
            
            return $this->printJSON($response);
        } catch (\Exception $e) {
            $response = ['message'=>$e->getMessage()];
            return $this->printJSON($response, $code=400);
        }
    }

    /**
     * check if the file is valid
     *
     * @return void
     */
    function parse()
    {
        try {
            $importer = new Import();
            $text = $_POST['text'] ?? '';
            $settings = json_decode($_POST['settings']);
            $data = $importer->parseFile($text, $settings);
            return $this->printJSON($data);
        } catch (\Exception $e) {
            $response = ['message'=>$e->getMessage()];
            $code = $e->getCode();
            return $this->printJSON($response, $code);
        }
    }

}