<?php namespace Vanderbilt\AdvancedImport\Tests;

use Vanderbilt\AdvancedImport\App\Models\Response;
use Vanderbilt\AdvancedImport\App\Traits\CanReadCSV;
use Vanderbilt\AdvancedImport\App\Helpers\RecordHelper;
use Vanderbilt\AdvancedImport\App\Models\ImportSettings;
use Vanderbilt\AdvancedImport\App\Helpers\InstanceSeeker;
use Vanderbilt\AdvancedImport\App\Interfaces\ObserverInterface;
use Vanderbilt\AdvancedImport\App\Models\Importers\AppendUpdate;



class ParsingSecondaryKeyTest extends \ExternalModules\ModuleBaseTest
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
            'form_name' => "form_1",
            'primary_key' => "secondary_key",
            'dynamic_fields' => ['phone'],
            'mapping' => [
                'record_id' => [0],
                'secondary_key' => [1],
                'text_box' => [2],
                'notes_box' => [3],
                'multiple_choice_drop_down' => [4],
                'multiple_choice_radio_buttons' => [5],
                'checkbox' =>[
                    '1' => 6,
                    '2' => 7,
                    '3' => 8,
                    '4' => 9,
                    'test' => 10,
                ],
                'yes_no' => [11],
                'true_false' => [12],
                'date_time_ymd_hm' => [13],
                'email' => [14],
                'integer' => [15],
                'number' => [16],
                'phone' => [17],
                // 'time' => [18], // need to fix this and provide date formats at mapping level
                'zipcode' => [19],
            ]
        ];
        $file_path = dirname(__FILE__).'/data/example_participant_upload.csv';

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