<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

use Project;
use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Models\ImportSettings;

class InstanceSeeker
{
    private $project;
    private $project_id;
    private $settings;
    /**
     * list of all fields in the form
     * specified in the settings
     *
     * @var array
     */
    private $form_fields;

    public static function unit_separator() { return chr(31); }
    public static function record_separator() { return chr(30); }

    /**
     *
     * @param Project $project_
     * @param ImportSettings $settings
     */
    public function __construct($project, $settings)
    {
        $this->project = $project;
        $this->project_id = $project->project_id;
        $this->settings = $settings;
        $form_name = $this->settings->form_name;
        $this->form_fields = array_keys(@$this->project->forms[$form_name]['fields']);
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


    private function getPivotRotationSubQuery($record)
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

      $project_id = $this->project_id;
      $event_id = $this->settings->event_id;

      $pivot = $getPivotRotation($this->form_fields, self::unit_separator());
      $query_string = sprintf(
        "SELECT `record`, IFNULL(instance, 1) `normalized_instance`,
            %s
        FROM redcap_data 
        WHERE `project_id` = %u
        AND `event_id` = %u
        AND `record`=%s
        GROUP BY record, normalized_instance
        ORDER BY record, normalized_instance",
        $pivot,
        $project_id, $event_id, checkNull($record)
      );
      return $query_string;
    }

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

      // $fields_list = DatabaseQueryHelper::getQueryList($fields);
      $subQuery = $this->getPivotRotationSubQuery($record);

      $query_string = sprintf(
        "SELECT * FROM (
          %s
        ) AS pivot
        WHERE %s",
        $subQuery,
        $buildWhereClause($valid_data)
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

    function getAutoInstanceNumber($record_id)
    {
      $project_id = $this->project_id;
      $event_id = $this->settings->event_id;

      $field_list = DatabaseQueryHelper::getQueryList($this->form_fields);

      $query_string = sprintf(
        "SELECT COALESCE(MAX(IFNULL(instance,1)),0)+1 AS next_instance
        FROM redcap_data WHERE
        `project_id` = %u
        AND `event_id` = %u
        AND `record`=%s
        AND `field_name` IN (%s)",
        $project_id, $event_id, checkNull($record_id), $field_list
      );
      $result = db_query($query_string);
      if($row=db_fetch_assoc($result)) {
          $next_instance = @$row['next_instance'];
          return intval($next_instance);
      }
      throw new \Exception("Error finding the next instance number in project {$this->project_id}, record {$record_id}", 1);
    }

    



 }