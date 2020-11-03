<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

 class DatabaseQueryHelper
 {
    /**
     * create a query compatible list of elements
     *
     * @param array $items
     * @return string
     */
    public static function getQueryList($items) {
        $applyCheckull = function(&$value, $index) {
            $value = checkNull($value);
        };
        array_walk($items, $applyCheckull);
        return implode(',', $items);
    }

    /**
     * get the list of instructions to perform a pivot table rotation
     *
     * @param array $field_names list of values in a column that need to be rotated
     * @param string $field_with_key name of the field containing the keys to rotate (name of the column)
     * @param string $field_with_value name of the field containing the values to rotate (value of the column)
     * @return string
     */
    public static function getPivotRotation($field_names, $field_with_key, $field_with_value)
    {
        // MAX(CASE WHEN `field_name` = 'vitals_label' THEN `value` ELSE NULL END) AS vitals_label,
        $cases = array_map(function($field) use($field_with_key, $field_with_value){
            return "MAX(CASE WHEN `{$field_with_key}` = '$field' THEN `{$field_with_value}` ELSE NULL END) AS {$field}";
        }, $field_names);
        return implode(", \n", $cases);
    }
 }