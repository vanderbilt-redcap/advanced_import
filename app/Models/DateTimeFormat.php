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
}