<?php namespace Vanderbilt\AdvancedImport\App\Models\Parser;


/**
 * basic parser that returns the value as is
 */
class TextParser extends AbstractParser
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
        return strval($value);
    }
}