<?php namespace Vanderbilt\AdvancedImport\App\Models;

class DateTimeFormat
{
    const TIME = "H:i";
    const DATE = "Y-m-d";
    const DATE_YMD = self::DATE;
    const DATE_MDY = "m-d-Y";
    const DATE_DMY = "d-m-Y";
    const DATETIME = "Y-m-d H:i";
    const DATETIME_YMD = self::DATETIME;
    const DATETIME_MDY = "m-d-Y H:i";
    const DATETIME_DMY = "d-m-Y H:i";
    const DATETIME_SECONDS = "Y-m-d H:i:s";
    const DATETIME_SECONDS_YMD = self::DATETIME_SECONDS;
    const DATETIME_SECONDS_MDY = "m-d-Y H:i:s";
    const DATETIME_SECONDS_DMY = "d-m-Y H:i:s";
    const DEFAULT = '';

    const ALL_FORMATS = [
        DateTimeFormat::TIME,
        DateTimeFormat::DATE,
        DateTimeFormat::DATE_YMD,
        DateTimeFormat::DATE_MDY,
        DateTimeFormat::DATE_DMY,
        DateTimeFormat::DATETIME,
        DateTimeFormat::DATETIME_YMD,
        DateTimeFormat::DATETIME_MDY,
        DateTimeFormat::DATETIME_DMY,
        DateTimeFormat::DATETIME_SECONDS,
        DateTimeFormat::DATETIME_SECONDS_YMD,
        DateTimeFormat::DATETIME_SECONDS_MDY,
        DateTimeFormat::DATETIME_SECONDS_DMY,
    ];

    const REDCAP_FORMATS = [
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
     * returna a date format based on the provided REDCap validation type
     *
     * @param string $validation_type
     * @return string
     */
    public static function getRedcapFormat($validation_type)
    {
        if(!array_key_exists($validation_type, static::REDCAP_FORMATS)) return false;
        return static::REDCAP_FORMATS[$validation_type];
    }
}