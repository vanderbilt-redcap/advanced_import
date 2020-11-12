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

    const REDCAP_TIME = 'time';
    const REDCAP_DATE = 'date';
    const REDCAP_DATE_YMD = 'date_ymd';
    const REDCAP_DATE_MDY = 'date_mdy';
    const REDCAP_DATE_DMY = 'date_dmy';
    const REDCAP_DATETIME = 'datetime';
    const REDCAP_DATETIME_YMD = 'datetime_ymd';
    const REDCAP_DATETIME_MDY = 'datetime_mdy';
    const REDCAP_DATETIME_DMY = 'datetime_dmy';
    const REDCAP_DATETIME_SECONDS = 'datetime_seconds';
    const REDCAP_DATETIME_SECONDS_YMD = 'datetime_seconds_ymd';
    const REDCAP_DATETIME_SECONDS_MDY = 'datetime_seconds_mdy';
    const REDCAP_DATETIME_SECONDS_DMY = 'datetime_seconds_dmy';

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
        DateTimeFormat::REDCAP_TIME => DateTimeFormat::TIME,
        DateTimeFormat::REDCAP_DATE => DateTimeFormat::DATE,
        DateTimeFormat::REDCAP_DATE_YMD => DateTimeFormat::DATE_YMD,
        DateTimeFormat::REDCAP_DATE_MDY => DateTimeFormat::DATE_MDY,
        DateTimeFormat::REDCAP_DATE_DMY => DateTimeFormat::DATE_DMY,
        DateTimeFormat::REDCAP_DATETIME => DateTimeFormat::DATETIME,
        DateTimeFormat::REDCAP_DATETIME_YMD => DateTimeFormat::DATETIME_YMD,
        DateTimeFormat::REDCAP_DATETIME_MDY => DateTimeFormat::DATETIME_MDY,
        DateTimeFormat::REDCAP_DATETIME_DMY => DateTimeFormat::DATETIME_DMY,
        DateTimeFormat::REDCAP_DATETIME_SECONDS => DateTimeFormat::DATETIME_SECONDS,
        DateTimeFormat::REDCAP_DATETIME_SECONDS_YMD => DateTimeFormat::DATETIME_SECONDS_YMD,
        DateTimeFormat::REDCAP_DATETIME_SECONDS_MDY => DateTimeFormat::DATETIME_SECONDS_MDY,
        DateTimeFormat::REDCAP_DATETIME_SECONDS_DMY => DateTimeFormat::DATETIME_SECONDS_DMY,
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