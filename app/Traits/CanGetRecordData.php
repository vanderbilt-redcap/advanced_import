<?php namespace Vanderbilt\AdvancedImport\App\Traits;

use FileManager;
use Logging;
use Vanderbilt\AdvancedImport\App\Helpers\DatabaseQueryHelper;

trait CanGetRecordData
{
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

    /**
     * find the instance number of a set of fields
     * using a data signature
     * performs a pivot rotation query on the redcap_data table
     *
     * @param int $project_id
     * @param int $event_id
     * @param string $record
     * @param array $data
     * @throws \Exception if more than 1 result is found
     * @return object
     */
    function findInstance($project_id, $event_id, $record, $data)
    {
        /* $getQueryClause = function($field_name, $value) {
            return sprintf("(`field_name`<=>%s AND `value`<=>%s)", checkNull($field_name), checkNull($value));
        };
        $queries = array_map($getQueryClause, array_keys($data), $data);
        $filter_query = implode("\nOR ", $queries); */
        if(empty($data)) return false;


        $getConcat = function($data, $unit_separator=':', $record_separator=',') {
            // 'vitals_label',':',COALESCE(vitals_label, ''), ';',
            $concats = array_map(function($key) use($unit_separator){
                return sprintf("'%s','%s',COALESCE(%s, '')", $key, $unit_separator, $key);
            }, array_keys($data));
            return implode(", '$record_separator',\n", $concats);
        };

        $createDataSignature = function($data, $unit_separator=':', $record_separator=',') {
            $keyValuesToString = function($value, $key) use($unit_separator) {
                $value = $value ?: ''; // default to blank string
                return sprintf("%s%s%s", $key, $unit_separator, $value );
            };
            ksort($data); //sort keys alphabetically
            $key_values_strings = array_map($keyValuesToString, $data, array_keys($data));
            $data_string = implode($record_separator, $key_values_strings);
            return md5($data_string);
        };

        $getPivotRotation = function($data) {
            // MAX(CASE WHEN field_name = 'vitals_label' THEN value ELSE NULL END) AS vitals_label,
            $cases = array_map(function($field) {
                return sprintf("MAX(CASE WHEN field_name = '%s' THEN value ELSE NULL END) AS %s", $field, $field);
            }, array_keys($data));
            return implode(", \n", $cases);
        };

        $record_separator = chr(30); //  ASCII code 30: invisible character used to separate values
        $unit_separator = chr(31); //  ASCII code 31: delimiting character
        ksort($data); //sort keys alphabetically

        $concat = $getConcat($data, $unit_separator, $record_separator);
        $pivot_rotation = $getPivotRotation($data);
        $data_signature = $createDataSignature($data, $unit_separator, $record_separator);
        $fields_list = DatabaseQueryHelper::getQueryList(array_keys($data));

        // pivot rotation query
        $query_string = sprintf(
            "SELECT record, normalized_instance,
                MD5(CONCAT(%s)) AS signature,
                CONCAT(%s) AS reference
                FROM
                (
                    SELECT record, IFNULL(instance, 1) normalized_instance,
                        %s
                    FROM redcap_data 
                    WHERE project_id=%u
                    AND event_id=%u
                    AND record=%s
                    AND field_name IN (%s)
                    GROUP BY record, normalized_instance
                    ORDER BY record, normalized_instance
                ) AS pivot
            HAVING signature=%s",
            $concat,
            $concat,
            $pivot_rotation,
            $project_id, $event_id, checkNull($record), $fields_list, checkNull($data_signature)
        );

        $result = db_query($query_string);

        if(!$result) throw new \Exception("Error retrieving the instance from the databse.", 400);
        if($result->num_rows>1) {
            throw new \Exception("Found more than 1 instance matching your data. Try a different set of fields to import to restrict the results.", 1);
        }
        if($instance=db_fetch_object($result))
        {
            $instance_number = $instance->normalized_instance;
            return $instance_number;
        }
        return false; //no instance found
    }
	
}

