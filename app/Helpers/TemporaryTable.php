<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\ImportSettings;

class TemporaryTable
{
    private $project;
    private $project_id;
    private $settings;
    private $file_path;

    public static function unit_separator() { return chr(31); }
    public static function record_separator() { return chr(30); }

    /**
     *
     * @param Project $project_
     * @param ImportSettings $settings
     */
    public function __construct($project, $file_path, $settings)
    {
        $this->project = $project;
        $this->project_id = $project->project_id;
        $this->file_path = $file_path;
        $this->settings = $settings;
        $this->init();
    }

    private function init()
    {
        $event_id = $this->settings->event_id;
        $all_fields = $this->settings->getMappedFormFields($dynamic=true);
        $this->makeTemporaryTable($this->project_id, $event_id, $all_fields);
    }

    public function getTemporaryTableName()
    {
        $filename = pathinfo($this->file_path, PATHINFO_FILENAME);
        return AdvancedImport::TABLES_PREFIX."TEMP_".$filename;
    }

    /**
     * create a rotated temporary table with
     * all fields selected in the mapping process (both dynamic and static)
     *
     * @param int $project_id
     * @param int $event_id
     * @param array $fields
     * @return void
     */
    private function makeTemporaryTable($project_id, $event_id, $fields)
    {
        // helper to perform a table rotation
        $getPivotRotation = function($fields, $unit_separator) {
                // GROUP_CONCAT(CASE WHEN field_name = 'vitals_label' THEN value ELSE NULL END) AS vitals_label,
                $cases = [];
                foreach ($fields as $field) {
                        $cases[] = sprintf("GROUP_CONCAT(CASE WHEN `field_name` = '%s' THEN value ELSE NULL END ORDER BY `value` ASC SEPARATOR '%s') AS `%s`", $field, $unit_separator, $field);
                }
                return implode(", \n", $cases);
        };
        $pivot = $getPivotRotation($fields, self::unit_separator());

        $fields_list = DatabaseQueryHelper::getQueryList($fields);
        $pivot_query_string = sprintf(
            "SELECT `record`, IFNULL(instance, 1) `normalized_instance`,
                %s
            FROM redcap_data 
            WHERE `project_id` = %u
            AND `event_id` = %u
            AND `field_name` IN (%s)
            GROUP BY record, normalized_instance
            ORDER BY record, normalized_instance",
            $pivot,
            $project_id, $event_id,
            $fields_list
        );

        /* $unique_keys = array_map(function($key) {
            return sprintf("`%s`(255)", $key); // must specify alength for TEXT/BLOB keys (in redcap_data `value` is a TEXT)
        }, $fields);
        $unique_keys_string = implode(",", $unique_keys);
        $create_table_query_string = sprintf(
            "CREATE TEMPORARY TABLE IF NOT EXISTS `%s` 
            ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
            $this->getTemporaryTableName(), $unique_keys_string
        ); */

        $query_string = sprintf(
            "CREATE TEMPORARY TABLE IF NOT EXISTS `%s` 
            ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
            AS ( %s )",
            $this->getTemporaryTableName(), $pivot_query_string
        );
        $result = db_query($query_string);
        // Logging::writeToFile('extra_query.txt', $query_string);
        // $error = db_error();
        if(!$result) throw new \Exception("Error creating the temporary table", 1);
    }

    public function insert($record, $normalized_instance, $data)
    {
      $valid_keys = array_flip($this->settings->getMappedFormFields($dynamic=true));
      $valid_data = array_intersect_key($valid_keys, $data); //the temp table only contains mapped data (primary keys could be exluded)
      $all_data = array_merge(compact('record', 'normalized_instance'), $valid_data);
      $fields_list = DatabaseQueryHelper::implodeAndQuote(",", array_keys($all_data), $quote="`");
      $values_list = DatabaseQueryHelper::implodeAndQuote(",", $all_data, $quote="'");
      $query_string = sprintf(
        "INSERT INTO `%s` (%s) VALUES (%s)",
        $this->getTemporaryTableName(), $fields_list, $values_list
      );
      $result = db_query($query_string);
      $error = db_error();
      if($result==false) {
        throw new \Exception(sprintf("Error inserting data in the temporary table -record: %s, instance: %u", $record, $normalized_instance), 1);
        
      }
    }

    /**
     * create a data signature of the data
     * used to retrieve duplicates in the temporary table
     *
     * @param array $data
     * @return string
     */
    private function makeDataSignature($data)
    {
        /**
         * if the value is an array then is probably a checkbox
         * since checkboxes are stored as arrays.
         * keep the values == 1 and join their keys using a comma
         */
        $transformIfCheckBoxValue = function($value){
            if(is_array($value)) {
                // deal with checkbox: use keys with value=1
                $filtered = array_filter($value, function($item) {
                    return intval($item)==1;
                });
                 // the separator here must match the one used in GROUP_CONCAT below
                $value = implode(self::unit_separator(), array_keys($filtered));
            }
            return $value;
        };

        $keyValuesToString = function($value, $key) use($transformIfCheckBoxValue) {
            $value = $transformIfCheckBoxValue($value);
            $value = $value ?: ''; // default to blank string
            return sprintf("%s%s%s", $key, self::unit_separator(), $value );
        };
        
        ksort($data); //sort keys alphabetically
        $key_values_strings = array_map($keyValuesToString, $data, array_keys($data));
        $data_string = implode(self::record_separator(), $key_values_strings);
        // Logging::writeToFile('advanced_import.txt', $data_string);
        return md5($data_string);
    }

    /**
     * find record and istance of a set of data
     * from the temporary table using a md5 signature
     *
     * @param string $primary_key
     * @param array $data
     * @return array [record, normalized_instance]
     */
    // public function findInstance($record, $data)
    // {
    //     // helper to create an MD5 signature in the create table query
    //     $getConcat = function($fields, $unit_separator, $record_separator) {
    //         // 'vitals_label',':',COALESCE(vitals_label, ''), ';',
    //         $concats = array_map(function($key) use($unit_separator){
    //             return sprintf("'%s','%s',COALESCE(`%s`, '')", $key, $unit_separator, $key);
    //         }, $fields);
    //         return implode(", '$record_separator',\n", $concats);
    //     };
    //     $fields = array_keys($data);
    //     $concat = $getConcat($fields, self::unit_separator(), self::record_separator());
    //     $data_signature = $this->makeDataSignature($data);
    //     $query_string = sprintf(
    //         "SELECT `record`, `normalized_instance`,
    //             MD5(CONCAT(%s)) AS signature
    //             FROM %s
    //             WHERE `record`=%s
    //             HAVING signature=%s",
    //         $concat,
    //         $this->getTemporaryTableName(),
    //         checkNull($record),
    //         checkNull($data_signature)
    //     );
    //     $result = db_query($query_string);
    //     if($row = db_fetch_assoc($result)) {
    //       return @$row['normalized_instance'];
    //     }
    //     return false;
    // }

    /**
     * tried to use the standard horizonatl approach of redcap_data,
     * but is not working
     *
     * @param string $record
     * @param array $data
     * @param boolean $full_match
     * @return void
     */
    // public function findMatchesAltTest($record, $data, $full_match=true)
    // {
    //   /* SELECT * FROM redcap_data
    //   WHERE project_id = 14
    //   AND event_id= 41
    //   AND record = '003'
    //   AND (
    //     (field_name='first_name' AND value='Kaipara District')
    //     OR (field_name='last_name' AND value='24')
    //   ) */
    //   $buildFieldsClause = function($data) {
    //     $wheres = array_map(function($key, $value) {
    //       return sprintf("(`field_name`='%s' AND `value`=%s)", $key, checkNull($value));
    //     }, array_keys($data), $data);
    //     return implode(" OR \n", $wheres);
    //   };

    //   $project_id = $this->project_id;
    //   $event_id = $this->settings->event_id;
    //   if($full_match) {
    //     $fields = $this->settings->getMappedFormFields($dynamic=true);
    //   }else {
    //     $fields = $this->settings->getMappedFormFields($dynamic=false);
    //   }
    //   // only use keys for the form (skip record_id or other unwanted)
    //   $valid_data = array_intersect_key($data, array_flip($fields));

    //   $query_string = sprintf(
    //     "SELECT *, IFNULL(instance, 1) `normalized_instance`
    //     FROM redcap_data
    //     WHERE record = %s
    //     AND project_id = %u
    //     AND event_id = %u
    //     AND (%s)
    //     ",
    //     checkNull($record), $project_id, $event_id,
    //     $buildFieldsClause($valid_data)
    //   );
    //   $result = db_query($query_string);
    //   if($result==false) return false;
    //   // for a match, the resulting rows should match the fields we are looking for
    //   $match = db_num_rows($result)>=count($valid_data); // check for duplicates
    //   if($match==false) return false;
    //   if($row=db_fetch_assoc($result)) {
    //     return @$row['normalized_instance'];
    //   }
    //   return false;
    // }

    public function findMatches($record, $data, $full_match=true)
    {
      $buildWhereClause = function($data) {
        $wheres = array_map(function($key, $value) {
          return sprintf("`%s`<=>%s", $key, checkNull($value));
        }, array_keys($data), $data);
        return implode(' AND ', $wheres);
      };

      if($full_match) {
        $fields = $this->settings->getMappedFormFields($dynamic=true);
      }else {
        $fields = $this->settings->getMappedFormFields($dynamic=false);
      }
      // only use keys for the form (skip record_id or other unwanted)
      $valid_data = array_intersect_key($data, array_flip($fields));

      $query_string = sprintf(
        "SELECT * FROM %s WHERE record=%s AND %s",
        $this->getTemporaryTableName(), checkNull($record), $buildWhereClause($valid_data)
      );
      $result = db_query($query_string);
      $total_matches = db_num_rows($result);
      if($full_match && $total_matches>1) {
        // log a warning
      }
      if($row=db_fetch_assoc($result)) {
        // return the first valid match
        return @$row['normalized_instance'];
      }
      return false;
    }

    /**
     * get the next available instance number for a form
     * return 1 if the form is not repeatable
     *
     * @param int $project_id
     * @param int $event_id
     * @param string $record
     * @param string $form_name
     * @return int
     */
    function getAutoInstanceNumber($record_id)
    {

      $query_string = sprintf(
        "SELECT COALESCE(MAX(IFNULL(normalized_instance,1)),0)+1 AS next_instance
        FROM %s WHERE record=%s",
        $this->getTemporaryTableName(), checkNull($record_id)
      );
      $result = db_query($query_string);
      if($row=db_fetch_assoc($result)) {
          $next_instance = @$row['next_instance'];
          return intval($next_instance);
      }
      throw new \Exception("Error finding the next instance number in project {$this->project_id}, record {$record_id}", 1);
    }



 }