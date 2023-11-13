<?php namespace Vanderbilt\AdvancedImport\App\Models\Queue;

use SplSubject;
use Vanderbilt\AdvancedImport\App\Interfaces\ObserverInterface;
use Vanderbilt\AdvancedImport\App\Models\Import;

class ImportJob extends Job implements ObserverInterface
{
    /**
     * type for this job
     *
     * @var string
     */
    static protected $type = Job::TYPE_IMPORT;

    public function process()
    {

        $importer = new Import();
        $importer->attach($this, Import::NOTIFICATION_PROCESS_STARTED);
        $importer->attach($this, Import::NOTIFICATION_LINE_PROCESSED);
        $importer->attach($this, Import::NOTIFICATION_PROCESS_COMPLETED);
        // $importer->attach($this, "data:chunk_completed");
        $importer->attach($this, Import::NOTIFICATION_PROCESS_STOPPED);
        try {
            $importer->processJob($this);
        } catch (\Exception $e) {
            $message = sprintf("Error processing the CSV file - %s - (code %u)", $e->getMessage(), $e->getCode());
            $this->setError($message);
        }   
    }

    /**
     * react when the observed import sends an update
     *
     * @param SplSubject $importManager
     * @param string $event
     * @param array $data
     * @return void
     */
    public function update($importManager, $event = null, $data = null)
    {
        switch ($event) {
            case Import::NOTIFICATION_PROCESS_STARTED:
                $this->markProcessing(); // update the status of the job
                break;
            case Import::NOTIFICATION_LINE_PROCESSED:
                $processed_lines = $data['processed_line'] ?? 0;
                $update_params = [
                    'processed_lines' => $processed_lines,
                ];
                $this->updateProperties($update_params);
                break;
            case Import::NOTIFICATION_PROCESS_COMPLETED:
                $this->markCompleted();
                break;
            /* case 'data:chunk_completed':
                //set back to ready when a chunk has been completed
                $params = [
                    'status' => self::STATUS_READY,
                ];
                $this->updateProperties($params);
                break; */
            case Import::NOTIFICATION_PROCESS_STOPPED:
                $this->markStopped();
                // do nothing
                break;
            default:
                # code...
                break;
        }
    }

}