<?php namespace Vanderbilt\AdvancedImport\App\Models\Parser;

use Vanderbilt\AdvancedImport\App\Models\DateTimeFormat;

class DateTimeParser extends AbstractParser
{

    public function __construct($from, $to)
    {
        $this->from = $from;
        $this->to = $to;
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
        $date_string = $datetime->format($this->to);
        return $date_string;
    }
}