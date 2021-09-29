# Redcap Advanced Import/Export

This module makes it easy to import/export large amount of data to/from REDCap repeatable instruments.

## Prerequisites
* PHP >= 7.2
* REDCap >= 11.0.0
* REDCap storage option set to 'local'

## Features
* no file size limit
* no rows amount limit
* no timeout issues
* custom mapping of the fields

## Import
Data from a CSV file can be mapped to REDCap fields via a guided, multi-step process; at the end of the process an *import job* is created that will be run in the background.
There is no limit to file size or amount of rows that can be imported and the module can automatically recognize if a specific row in the CSV file must be saved as a new entry or update an existing one.


### Import strategies
The import process can adopt different strategies:
* Append/Update: add new records or update existing ones
* Append: add new records (NOT YET IMPLEMENTED)
* Update: update existing records (NOT YET IMPLEMENTED)
* Delete: delete matching records (NOT YET IMPLEMENTED)
* Copy: delete all records and repopulate from the source (NOT YET IMPLEMENTED)


## Export (TO BE IMPLEMENTED)
For now the module will only export the structure of an instrument.

## How it works
The module saves the job related settings in a virtual table stored in the *redcap_external_module_settings* table.
Logs are saved in the *redcap_external_modules_log* and *redcap_external_modules_log_parameters* tables.
CSV files are uploaded in the edocs folder in REDCap.
A cronjob process checks for “ready” jobs every minute and starts them, one at a time. When a process takes too much time, it pauses for a minute and is resumed at the next cron cycle to avoid timeout issues.
Files are uploaded in chunks using the file API to avoid POST size limits of the server.