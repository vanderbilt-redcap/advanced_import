<?php namespace Vanderbilt\AdvancedImport\App\Models\Queue;

use SplObserver;
use SplSubject;
use Vanderbilt\AdvancedImport\App\Models\Import;

class ImportJob extends Job
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
        $importer->attach($this, "data:process_started");
        $importer->attach($this, "data:line_processed");
        $importer->attach($this, "data:completed");
        // $importer->attach($this, "data:chunk_completed");
        $importer->attach($this, "data:stopped");
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
    public function update($importManager, string $event = null, $data = null)
    {
        switch ($event) {
            case 'data:process_started':
                $this->markProcessing(); // update the status of the job
                break;
            case 'data:line_processed':
                $processed_lines = @$data['processed_line'];
                $update_params = [
                    'processed_lines' => $processed_lines,
                ];
                $this->updateProperties($update_params);
                break;
            case 'data:completed':
                $this->markCompleted();
                break;
            /* case 'data:chunk_completed':
                //set back to ready when a chunk has been completed
                $params = [
                    'status' => self::STATUS_READY,
                ];
                $this->updateProperties($params);
                break; */
            case 'data:stopped':
                // do nothing
                break;
            default:
                # code...
                break;
        }
    }

}