<?php namespace Vanderbilt\AdvancedImport\App\Traits;

use SplFileObject;

trait CanReadCSV {

	use CanOpenFile;

	/**
	 * guess the delimiter of a CSV file.
	 * parsing a line of text
	 *
	 * @param string $line
	 * @return string
	 */
	public function guessDelimiter($line)
	{
		$record_separator = chr(30); //  ASCII code 30: invisible character used to separate values
		$unit_separator = chr(31); //  ASCII code 31: delimiting character
		$delimiters = array(",", "\t", "|", ";", "^", $record_separator, $unit_separator);
		$pattern = sprintf('/[%s]/', implode('', $delimiters));
		preg_match($pattern, $line, $matches);
		if(count($matches) > 0) return $matches[0];
		// use the default delimiter if no matches
		$default_delimiter = ','; // use comma as the default delimiter
		return $default_delimiter;
	}

	/**
	 * get data from a line of text
	 *
	 * @param string $line
	 * @param string $delimiter the delimiter character or 'auto' to guess the delimiter from the first line of the file
	 * @param string $enclosure
	 * @param string $escape_char
	 * @return array interpreted line of text
	*/
	public function readCSVLine($line, $delimiter='auto', $enclosure='"', $escape_char="\\")
  {
		if(empty($delimiter) || $delimiter=='auto') {
			$delimiter = $this->guessDelimiter($line);
		}
		$line = removeBOMfromUTF8($line); // Remove BOM, if applicable
		$fields = str_getcsv( $line, $delimiter, $enclosure, $escape_char);
		return $fields;
	}

	/**
	 * read a line from a file
	 *
	 * @param SplFileObject|string $file
	 * @param string $line_number
	 * @return string
	 */
	public function readFileAtLine($file, $line_number)
	{
		if(!($file instanceof SplFileObject)) $file = $this->openFile($file);
		$file->seek($line_number);
		if($line = $file->current()) return $line;
	}

	/**
	 * Helper method to get all rows at once from the readCSV generator.
	 * convert the genarator to an array.
	 *
	 * @return array
	 */
	public function getCsvAsArray()
	{
		$args = func_get_args();
		$csv_generator = call_user_func_array(array($this, 'readCSV'), $args);
		return iterator_to_array($csv_generator);
	}
}