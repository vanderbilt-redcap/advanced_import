<?php namespace Vanderbilt\AdvancedImport\App\Models\Importers;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Helpers\RecordHelper;
use Vanderbilt\AdvancedImport\App\Helpers\TemporaryTable;
use Vanderbilt\AdvancedImport\App\Models\ImportSettings;
use Vanderbilt\AdvancedImport\App\Traits\CanLog;
use Vanderbilt\AdvancedImport\App\Traits\CanProcessCsvData;
use Vanderbilt\AdvancedImport\App\Traits\SubjectTrait;

abstract class AbstractImporter implements ImporterInterface
{
    use SubjectTrait;
    use CanLog;
    use CanProcessCsvData;
    
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
     * @var TemporaryTable
     */
    protected $temporary_table;
    /**
     *
     * @var RecordHelper
     */
    protected $record_helper;

    /**
     * @param Project $project_id
     * @param ImportSettings $settings
     * @param TemporaryTable
     * @param RecordHelper
     */
    public function __construct($project, $settings, $temporary_table, $record_helper)
    {
        $this->project = $project;
        $this->project_id = $project->project_id;
        $this->settings = $settings;
        $this->temporary_table = $temporary_table;
        $this->record_helper = $record_helper;
        $module = AdvancedImport::getInstance();
        $this->attach($module, '*'); // attach the module as a subscriber
    }

}