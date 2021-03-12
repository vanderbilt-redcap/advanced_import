<?php namespace Vanderbilt\AdvancedImport\App\Traits;

use FileManager;
use Logging;
use Vanderbilt\AdvancedImport\App\Helpers\DatabaseQueryHelper;

trait CanGetRecordData
{
    /**
     * ASCII code 30: delimiter character for "End of Record"
     *
     * @return void
     */
    static function  getRecordSeparator() { return chr(30); }
    /**
     * ASCII code 31: delimiter character for "End of Field"
     */
    static function  getUnitSeparator() { return chr(31); }

	/**
     * find a record ID using a primary or secondary unique key
     *
     * @param int $project_id
     * @param int $event_id
     * @param mixed $primary_key_field
     * @param mixed $primary_key_value
     * @return string|null
     */
    function getRecordId($project_id, $event_id, $primary_key_field, $primary_key_value)
    {
        $query_string = sprintf(
            "SELECT record FROM redcap_data
            WHERE
            project_id=%u
            AND event_id=%u
            AND field_name=%s
            AND value=%s",
            $project_id, $event_id, checkNull($primary_key_field), checkNull($primary_key_value)
        );
        $result = db_query($query_string);
        if($row=db_fetch_object($result)) return $row->record;
        return;
    }
	
}

