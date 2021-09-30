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
* guided CSV to REDCap mapping
* automatically detect common date formats
* automatically detect CSV options (field delimiter, text qualifier)

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

### How existing data is identified
Imported fields are compared to existing data in REDCap using a *full match* and a *partial match*; based on the match, the row in the CSV file will be skipped, will create a new entry or will update an existing one.
* the *full match* compares every imported CSV field with the mapped REDCap field
* the *partial match* uses *dynamic fields*, a special indicator used to mark those fields that are not decisive for the uniqueness of an entry.

### Dynamic fields usage example
You have a repeatable instrument called "medications" and you import this CSV file:
```
patient_id, medication_name, medication_dosage, medication_status
0001, MORPHINE SULFATE, 0.5 MG/ML, active
0002, ASPIRIN, 325 MG, on-hold
```

At a later time you import this CSV file
(notice the different status in line 2 and the new line 3)

```
patient_id, medication_name, medication_dosage, medication_status
0001, MORPHINE SULFATE, 0.5 MG/ML, active
0002, ASPIRIN, 325 MG, stopped
0002, FENTANYL CITRATE, 50 MCG/ML, active
```
In this case you should mark "medication_status" as *dynamic* and the module will
* skip the entry matching line 1 (*full match*)
* update the status for the entry matching line 2 (*partial match*)
* create a new entry with data on line 3

If you DO NOT mark "medication_status" as *dynamic* the module will
* skip line 1 (*full match*)
* create a new entry with data on line 2
* create a new entry with data on line 3
## Export (NOT YET FULLY IMPLEMENTED)
For now the module will only export the structure of an instrument.

## How it works
The module saves the job related settings in a virtual table stored in the *redcap_external_module_settings* table.

Logs are saved in the *redcap_external_modules_log* and *redcap_external_modules_log_parameters* tables.

Files are uploaded in chunks using the file API to avoid POST size limits of the server and saved in the *edocs* folder in REDCap.

A cronjob process checks for “ready” jobs every minute and starts them, one at a time. When a process takes too much time, it pauses for a minute and is resumed at the next cron cycle to avoid timeout issues.
