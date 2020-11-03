<template>
    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Format/character</th>
                <th>Description</th>
                <th>Example</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(format, index) in formats" :key="index">
                <td>{{format.format}}</td>
                <td>{{format.description}}</td>
                <td>{{format.example}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
const formats = [
    {format:"Day",description:"---",example:"---"},
    {format:"d",description:"Day of the month, 2 digits with leading zeros",example:"01 to 31"},
    {format:"D",description:"A textual representation of a day, three letters",example:"Mon through Sun"},
    {format:"j",description:"Day of the month without leading zeros",example:"1 to 31"},
    {format:"l (lowercase 'L')",description:"A full textual representation of the day of the week",example:"Sunday through Saturday"},
    {format:"N",description:"ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0)",example:"1 (for Monday) through 7 (for Sunday)"},
    {format:"S",description:"English ordinal suffix for the day of the month, 2 characters",example:"st, nd, rd or th. Works well with j"},
    {format:"w",description:"Numeric representation of the day of the week",example:"0 (for Sunday) through 6 (for Saturday)"},
    {format:"z",description:"The day of the year (starting from 0)",example:"0 through 365"},
    {format:"Week",description:"---",example:"---"},
    {format:"W",description:"ISO-8601 week number of year, weeks starting on Monday",example:"Example: 42 (the 42nd week in the year)"},
    {format:"Month",description:"---",example:"---"},
    {format:"F",description:"A full textual representation of a month, such as January or March",example:"January through December"},
    {format:"m",description:"Numeric representation of a month, with leading zeros",example:"01 through 12"},
    {format:"M",description:"A short textual representation of a month, three letters",example:"Jan through Dec"},
    {format:"n",description:"Numeric representation of a month, without leading zeros",example:"1 through 12"},
    {format:"t",description:"Number of days in the given month",example:"28 through 31"},
    {format:"Year",description:"---",example:"---"},
    {format:"L",description:"Whether it's a leap year",example:"1 if it is a leap year, 0 otherwise."},
    {format:"o",description:"ISO-8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. (added in PHP 5.1.0)",example:"Examples: 1999 or 2003"},
    {format:"Y",description:"A full numeric representation of a year, 4 digits",example:"Examples: 1999 or 2003"},
    {format:"y",description:"A two digit representation of a year",example:"Examples: 99 or 03"},
    {format:"Time",description:"---",example:"---"},
    {format:"a",description:"Lowercase Ante meridiem and Post meridiem",example:"am or pm"},
    {format:"A",description:"Uppercase Ante meridiem and Post meridiem",example:"AM or PM"},
    {format:"B",description:"Swatch Internet time",example:"000 through 999"},
    {format:"g",description:"12-hour format of an hour without leading zeros",example:"1 through 12"},
    {format:"G",description:"24-hour format of an hour without leading zeros",example:"0 through 23"},
    {format:"h",description:"12-hour format of an hour with leading zeros",example:"01 through 12"},
    {format:"H",description:"24-hour format of an hour with leading zeros",example:"00 through 23"},
    {format:"i",description:"Minutes with leading zeros",example:"00 to 59"},
    {format:"s",description:"Seconds with leading zeros",example:"00 through 59"},
    {format:"u",description:"Microseconds (added in PHP 5.2.2). Note that date() will always generate 000000 since it takes an integer parameter, whereas DateTime::format() does support microseconds if DateTime was created with microseconds.",example:"Example: 654321"},
    {format:"v",description:"Milliseconds (added in PHP 7.0.0). Same note applies as for u.",example:"Example: 654"},
    {format:"Timezone",description:"---",example:"---"},
    {format:"e",description:"Timezone identifier (added in PHP 5.1.0)",example:"Examples: UTC, GMT, Atlantic/Azores"},
    {format:"I (capital i)",description:"Whether or not the date is in daylight saving time",example:"1 if Daylight Saving Time, 0 otherwise."},
    {format:"O",description:"Difference to Greenwich time (GMT) without colon between hours and minutes",example:"Example: +0200"},
    {format:"P",description:"Difference to Greenwich time (GMT) with colon between hours and minutes (added in PHP 5.1.3)",example:"Example: +02:00"},
    {format:"T",description:"Timezone abbreviation",example:"Examples: EST, MDT ..."},
    {format:"Z",description:"Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive.",example:"-43200 through 50400"},
    {format:"Full Date/Time",description:"---",example:"---"},
    {format:"c",description:"ISO 8601 date (added in PHP 5)",example:"2004-02-12T15:19:21+00:00"},
    {format:"r",description:"» RFC 2822 formatted date",example:"Example: Thu, 21 Dec 2000 16:01:07 +0200"},
    {format:"U",description:"Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)",example:"336421800"},
]
export default {
    data() {
        return {
            formats
        }
    }
}
</script>

<style>

</style>