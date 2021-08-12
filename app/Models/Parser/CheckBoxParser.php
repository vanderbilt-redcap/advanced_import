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
     * @return array
     */
    public function parse($value)
    {
        if(is_array($value)) return $value;
        $values = preg_split("/[\s,;]+/", $value);
        if($values===false) throw new \Exception("Error converting '$value' into an array. Values must be separated by space, comma or semicolon", 1);
        return $values;
    }
}