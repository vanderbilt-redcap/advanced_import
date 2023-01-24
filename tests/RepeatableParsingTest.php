<?php namespace Vanderbilt\AdvancedImport\Tests;

use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Response;
use Vanderbilt\AdvancedImport\App\Traits\CanReadCSV;
use Vanderbilt\AdvancedImport\App\Helpers\RecordHelper;
use Vanderbilt\AdvancedImport\App\Models\ImportSettings;
use Vanderbilt\AdvancedImport\App\Helpers\InstanceSeeker;
use Vanderbilt\AdvancedImport\App\Models\Queue\ImportJob;
use Vanderbilt\AdvancedImport\App\Helpers\ColumnarDatabase;
use Vanderbilt\AdvancedImport\App\Interfaces\ObserverInterface;
use Vanderbilt\AdvancedImport\App\Models\Importers\AppendUpdate;



class RepeatableParsingTest extends \ExternalModules\ModuleBaseTest
{
    use CanReadCSV;
    /**
     * Undocumented function
     *
     * @return void
     */
    public function setUp():void {
        $this->project_id = 33;
        $this->event_id = 60;
        $this->user_id = 2;        
    }

    function getObserver() {
        $Observer = new class implements ObserverInterface {
            private $errors = [];
            function update($subject, $event = null, $data = null)
            {
                switch ($event) {
                    case AppendUpdate::NOTIFICATION_DATA_SAVE_ERROR:
                        $message = $data['message'];// ['save_response', 'record', 'errors', 'message']
                        print($message.PHP_EOL);
                        break;
                    case AppendUpdate::NOTIFICATION_PROCESS_ERROR:
                        $message = $data['message'];// ['save_response', 'record', 'errors', 'message']
                        print($message.PHP_EOL);
                        break;
                    default:
                        break;
                }
            }
        };
        return new $Observer();
    }
    
    function testParse() {
        $job_settings = [
            'field_delimiter' => ",",
            'text_qualifier' => "\"",
            'field_name_row' => 0,
            'data_row_start' => 1,
            'data_row_end' => null,
            'dates_format' => "Y-m-d H:i",
            'import_mode' => "append-update",
            'event_id' => $this->event_id,
            'form_name' => "repeatable_things",
            'primary_key' => "record_id",
            'dynamic_fields' => [],
            'mapping' => [
                'record_id' => [0],
                'repeated_text' => [1],
                'repeated_text2' => [2],
                'repeated_number' => [3],
            ]
        ];
        $file_path = dirname(__FILE__).'/data/repeatable_example.csv';

        $project = new \Project($this->project_id);
        $settings = new ImportSettings($job_settings, $project);

        $record_helper = new RecordHelper($project, $settings);
        $instanceSeeker = new InstanceSeeker($project, $settings);
        $appendUpdate = new AppendUpdate($project, $settings, $instanceSeeker, $record_helper);

        $observer = $this->getObserver();
        $appendUpdate->attach($observer);

        $responses = [];
        $index = 1;
        while($line = $this->readFileAtLine($file_path, $index)) {
            if(empty(trim($line))) break;
            $data = $this->readCSVLine($line);
            $response = $appendUpdate->process($data, $index);
            $validResponses = [Response::NO_CHANGE, Response::SUCCESS,];
            $responses[$index] = $response;
            $index++;
        }

        print_r($responses);

        $this->assertTrue(true);
    }

   
}