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

    public function __construct($format)
    {
        if(!array_key_exists($format, self::FORMATS)) throw new \Exception("Invalid format provided: '{$format}'", 1);
        $this->format = self::FORMATS[$format];
    }

    public function validate($value)
    {
        if(empty($value)) return true;
        $datetime = \DateTime::createFromFormat($this->format, $value);
        if(!($datetime instanceof \DateTime)) throw new \Exception("The value '{$value}' is not in the valid format '{$this->format}", 1);
        return true;
    }
}