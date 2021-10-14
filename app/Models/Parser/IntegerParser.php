<?php namespace Vanderbilt\AdvancedImport\App\Models\Parser;

use Vanderbilt\AdvancedImport\App\Models\DateTimeFormat;

class IntegerParser extends AbstractParser
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
     * return the value as is
     *
     * @return string
     */
    public function parse($value)
    {
        $this->makeSingleValue($value);
        if(is_numeric($value)) $value = $value+0;
        return intval($value);
    }
}