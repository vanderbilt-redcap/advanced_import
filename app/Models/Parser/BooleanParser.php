<?php namespace Vanderbilt\AdvancedImport\App\Models\Parser;

class BooleanParser extends AbstractParser
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
     * return 0 or 1
     *
     * @return int
     */
    public function parse($value)
    {
        $this->makeSingleValue($value);
        $getRealValue = function($value) /* use($fieldMetadata, $numericTypes) */ {
            $bool = filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            if(!is_null($bool)) return $bool;
            if(is_numeric($value)) return $value+0;
            return $value;
        };

        $realValue = intval(boolval($getRealValue($value)));
        return $realValue;
    }
}