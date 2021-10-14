<?php namespace Vanderbilt\AdvancedImport\App\Models\Parser;

abstract class AbstractParser implements ParserInterface
{
    /**
     * transform an array of values to a single element
     * values are always supplied as arrays for compatibility
     * with checkboxes that expect arrays
     * 
     * 
     *
     * @param mixed $value
     * @return void
     */
    function makeSingleValue(&$value) {
        if(is_array($value)) $value = reset($value);
    }

}