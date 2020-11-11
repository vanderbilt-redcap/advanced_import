<?php namespace Vanderbilt\AdvancedImport\App\Models\Validator;

use Vanderbilt\AdvancedImport\App\Models\DateTimeFormat;

class DateTimeValidator implements ValidatorInterface
{

    const FORMATS = [
        'time' => DateTimeFormat::TIME,
        'date' => DateTimeFormat::DATE,
        'date_ymd' => DateTimeFormat::DATE_YMD,
        'date_mdy' => DateTimeFormat::DATE_MDY,
        'date_dmy' => DateTimeFormat::DATE_DMY,
        'datetime' => DateTimeFormat::DATETIME,
        'datetime_ymd' => DateTimeFormat::DATETIME_YMD,
        'datetime_mdy' => DateTimeFormat::DATETIME_MDY,
        'datetime_dmy' => DateTimeFormat::DATETIME_DMY,
        'datetime_seconds' => DateTimeFormat::DATETIME_SECONDS,
        'datetime_seconds_ymd' => DateTimeFormat::DATETIME_SECONDS_YMD,
        'datetime_seconds_mdy' => DateTimeFormat::DATETIME_SECONDS_MDY,
        'datetime_seconds_dmy' => DateTimeFormat::DATETIME_SECONDS_DMY,
    ];

    /**
     *
     * @param string $validation_format format expected by the REDCap field
     */
    public function __construct($validation_format)
    {
        $this->validation_format = $validation_format;
    }

    /**
     * get a DB compatible format based on the validation
     * rule of the REDCap field
     *
     * @param string $validation_format
     * @return void
     */
    private function getDBFormat($validation_format) {
        $redcap_format = DateTimeFormat::getRedcapFormat($validation_format);
        $db_format = null;
        switch ($redcap_format) {
            case DateTimeFormat::TIME:
                $format = DateTimeFormat::TIME;
                break;
            case DateTimeFormat::DATE:
            case DateTimeFormat::DATE_MDY:
            case DateTimeFormat::DATE_DMY:
                $format = DateTimeFormat::DATE;
                break;
            case DateTimeFormat::DATETIME:
            case DateTimeFormat::DATETIME_MDY:
            case DateTimeFormat::DATETIME_DMY:
                $format = DateTimeFormat::DATETIME;
                break;
            case DateTimeFormat::DATETIME_SECONDS:
            case DateTimeFormat::DATETIME_SECONDS_MDY:
            case DateTimeFormat::DATETIME_SECONDS_DMY:
                $format = DateTimeFormat::DATETIME_SECONDS;
                break;
            default:
                break;
        }
        return $format;
    }

    public function validate($value)
    {
        if(empty($value)) return true;
        $db_format = $this->getDBFormat($this->validation_format);
        $datetime = \DateTime::createFromFormat($db_format, $value);
        if(!($datetime instanceof \DateTime)) throw new \Exception("The value '{$value}' is not in the valid format '{$db_format}", 1);
        return true;
    }
}