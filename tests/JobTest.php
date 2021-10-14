<?php namespace Vanderbilt\AdvancedImport\tests;

use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\Queue\ImportJob;
use Vanderbilt\AdvancedImport\App\Interfaces\ObserverInterface;
use Vanderbilt\AdvancedImport\App\Models\Importers\AppendUpdate;


// For now, the path to "redcap_connect.php" on your system must be hard coded.
$root = dirname(dirname(dirname(__DIR__)));
require_once $root . '/redcap_connect.php';

class JobTest extends \ExternalModules\ModuleBaseTest
{
    /**
     * Undocumented function
     *
     * @return void
     */
    public function setUp():void {
        $this->jobID = 10;
    }
    
    function testProcess() {
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
        $db = AdvancedImport::colDb();
        $query = $db->search(ImportJob::TABLE_NAME, '`id`=?', [$this->jobID]);
        if($row = $query->fetch_assoc()) {
            $job = new ImportJob($row);
            $job->process();
        }

        $this->assertTrue(true);
    }

   
}