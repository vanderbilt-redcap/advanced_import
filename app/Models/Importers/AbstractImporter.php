<?php namespace Vanderbilt\AdvancedImport\App\Models\Importers;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Traits\CanLog;
use Vanderbilt\AdvancedImport\App\Helpers\RecordHelper;
use Vanderbilt\AdvancedImport\App\Models\ParserFactory;
use Vanderbilt\AdvancedImport\App\Models\ImportSettings;
use Vanderbilt\AdvancedImport\App\Helpers\InstanceSeeker;
use Vanderbilt\AdvancedImport\App\Traits\CanGetProjectData;
use Vanderbilt\AdvancedImport\App\Traits\CanProcessCsvData;
use Vanderbilt\AdvancedImport\App\Traits\Observer\SubjectTrait;

abstract class AbstractImporter implements ImporterInterface
{
    use SubjectTrait;
    use CanLog;
    use CanProcessCsvData;
    use CanGetProjectData;
    
    /**
     * @var int
     */
    protected $project_id;
    /**
     *
     * @var Project
     */
    protected $project;
    
    /**
     *
     * @var int
     */
    protected $line;

    /**
     * @var ImportSettings
     */
    protected $settings;

    /**
     *
     * @var InstanceSeeker
     */
    protected $instanceSeeker;
    /**
     *
     * @var RecordHelper
     */
    protected $record_helper;

    /**
     * @param Project $project_id
     * @param ImportSettings $settings
     * @param InstanceSeeker
     * @param RecordHelper
     */
    public function __construct($project, $settings, $instanceSeeker, $record_helper)
    {
        $this->project = $project;
        $this->project_id = $project->project_id;
        $this->settings = $settings;
        $this->instanceSeeker = $instanceSeeker;
        $this->record_helper = $record_helper;
        $module = AdvancedImport::getInstance();
        $this->attach($module, '*'); // attach the module as a subscriber
    }

    /**
     * Used in pre-processing
     * get values associated to a REDCap fields from the CSV data
     *
     * @param array $data
     * @param string $redcapField
     * @param array $csvIndexes
     * @return mixed
     */
    protected function getValues($data, $csvIndexes) {
        if(!is_array($csvIndexes)) $csvIndexes = [$csvIndexes];
        $values = [];
        foreach ($csvIndexes as $key=>$csvIndex) {
            $values[$key] = $data[$csvIndex] ?? null;
        }
        return $values;
    }

    /**
     * Used in pre-processing
     * apply parsers to the data to normalize it
     *
     * @param ParserFactory $parsersFactory
     * @param string $key
     * @param mixed $value
     * @return mixed
     */
    protected function applyParsers($parsersFactory, $key, $value) {
        $errors = [];
        $parsers = $parsersFactory->create($key);
        foreach($parsers as $parser) {
            try {
                $value = $parser->parse($value);
            } catch (\Exception $e) {
                $errors[] = $e->getMessage();
            }
        }
        if(empty($errors)) return $value;
        else {
            $message = "parsing errors for key '{$key}', value '{$value}':\n";
            $message .= implode("\n", $errors);
            throw new \Exception($message, 400);
        }
    }

}