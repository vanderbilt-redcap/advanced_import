<?php namespace Vanderbilt\AdvancedImport\App\Models\Parser;

use Vanderbilt\AdvancedImport\App\Models\DateTimeFormat;

class DateTimeParser extends AbstractParser
{

    /**
     *
     * @param string $from format as found in the CSV file
     * @param string $validation_format format expected by the REDCap field
     */
    public function __construct($from, $validation_format)
    {
        $this->from = $from;
        $this->validation_format = $validation_format;
    }

    /**
     * convert the parsed date to a DB compatible format
     * and based on the validation type of the REDCap field
     *
     * @param \DateTime $date
     * @param string $validation_format
     * @return void
     */
    private function convert($date, $validation_format) {
        $format = DateTimeFormat::getRedcapFormat($validation_format);
        $converted = '';
        switch ($format) {
            case DateTimeFormat::TIME:
                $converted = $date->format(DateTimeFormat::TIME);
                break;
            case DateTimeFormat::DATE:
            case DateTimeFormat::DATE_MDY:
            case DateTimeFormat::DATE_DMY:
                $converted = $date->format(DateTimeFormat::DATE);
                break;
            case DateTimeFormat::DATETIME:
            case DateTimeFormat::DATETIME_MDY:
            case DateTimeFormat::DATETIME_DMY:
                $converted = $date->format(DateTimeFormat::DATETIME);
                break;
            case DateTimeFormat::DATETIME_SECONDS:
            case DateTimeFormat::DATETIME_SECONDS_MDY:
            case DateTimeFormat::DATETIME_SECONDS_DMY:
                $converted = $date->format(DateTimeFormat::DATETIME_SECONDS);
                break;
            default:
                break;
        }
        return $converted;
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
        if($this->validation_format == DateTimeFormat::REDCAP_TIME) return $value; // skip parsing for time
        $datetime = \DateTime::createFromFormat($this->from, $value);
        if(!($datetime instanceof \DateTime)) throw new \Exception("The value '{$value}' is not in the expected format '{$this->from}", 1);
        // Dates must be imported here only in "Y-m-d H:i:[s]" format, regardless of the specific date format designated for this field.)
        $date_string = $this->convert($datetime, $this->validation_format);
        return $date_string;
    }
}