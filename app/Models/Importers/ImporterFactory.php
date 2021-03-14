<?php namespace Vanderbilt\AdvancedImport\App\Models\Importers;

use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Helpers\InstanceSeeker;
use Vanderbilt\AdvancedImport\App\Helpers\RecordHelper;
use Vanderbilt\AdvancedImport\App\Helpers\TemporaryTable;
use Vanderbilt\AdvancedImport\App\Models\ImportSettings;

class ImporterFactory
{
    /**
     * Undocumented function
     *
     * @param int $project_id
     * @param ImportSettings
     * @param InstanceSeeker
     * @param RecordHelper
     * @return AbstractImporter
     */
    static function create($project_id, $settings, $instanceSeeker, $record_helper)
    {
        $mode = $settings->import_mode;
        $import_strategies = [
            'append' => Append::class, //Append: add new records
            'update' => Update::class, //Update: update existing records
            'append-update' => AppendUpdate::class, //Append/Update: add new records or update existing ones
            'delete' => Delete::class, //Delete: delete matching records
            'copy' => Copy::class, //Copy: delete all records and repopulate from the source
        ];
        if(!array_key_exists($mode, $import_strategies))
            throw new \Exception(sprintf("A valid import strategy must be provided: %s", implode(', ', array_keys($import_strategies))), 400);
     
        $import_strategy = new $import_strategies[$mode]($project_id, $settings, $instanceSeeker, $record_helper);
        return $import_strategy;
    }
}