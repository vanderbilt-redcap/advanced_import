<?php namespace Vanderbilt\AdvancedImport\App\Models\Parser;

use Vanderbilt\AdvancedImport\App\Models\DateTimeFormat;

class DateTimeParser extends AbstractParser
{

    public function __construct($from)
    {
        $this->from = $from;
    }

    /**
     * return the parsed date
     *
     * @return string
     * @throws Exception if the date cannot be parsed
     */
    public function parse($value)
    {
        if(empty($value)) return '';
        $datetime = \DateTime::createFromFormat($this->from, $value);
        if(!($datetime instanceof \DateTime)) throw new \Exception("The value '{$value}' is not in the expected format '{$this->from}", 1);
        // Dates must be imported here only in "Y-m-d H:i:[s]" format, regardless of the specific date format designated for this field.)
        $date_string = $datetime->format(DateTimeFormat::DATETIME_SECONDS);
        return $date_string;
    }
}