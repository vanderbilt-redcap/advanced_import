<?php namespace Vanderbilt\AdvancedImport\App\Models\Parser;

use Vanderbilt\AdvancedImport\App\Models\DateTimeFormat;

class CheckBoxParser extends AbstractParser
{

    /**
     *
     * @param string $from format as found in the CSV file
     * @param string $validation_format format expected by the REDCap field
     */
    public function __construct()
    {
    }


    /**
     * return the value if already in array format.
     * convert to array if the value is a string with a valid separator (based on the regular expression)
     * 
     * if an array is provided, then check for truty values to determine which indexes of the checkbox
     * will be enabled.
     * note: the first element [0] will always be null because checkboxes index starts at 1
     *
     * @return array
     */
    public function parse($value)
    {
        $getRealValue = function($value) {
            $bool = filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            if(!is_null($bool)) return $bool;
            if(is_numeric($value)) return $value+0;
            return $value;
        };
        /**
         * if only one field is provided then split the values using a regexp
         * else get one value per provided index
         */
        if(count($value)===1) {
            $index = reset($csvIndexes);
            $values = preg_split('/[,;\s]/', $value[$index] ?? '');
            $values = array_filter($values, function($value) {
                return preg_match('/\d+/', $value);
            });
        }else {
            /**
             * check each field and if truty for a
             * specific key then add that key
             * in the list
             */
            $values = [];
            foreach ($value as $key=>$valueItem) {
                if(is_null($valueItem)) continue;
                $realValue = $getRealValue($valueItem);
                $boolValue = boolval($realValue);
                if($boolValue) $values[] = $key;
            }
        }
        sort($values); // sort to match the pivot rotation query
        return $values;
    }
}