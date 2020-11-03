<?php namespace Vanderbilt\AdvancedImport\App\Traits;

trait CanWriteCSV {

	// use CanOpenFile;

	/**
     * create a csv 
     *
     * @param array $rows array of lines[] 
     * @param boolean $extract_headers if true, get the headers from the keys of the first row
     * @param string $delimiter csv delimiter
     * @param string $enclosure 
     * @param string $escape_char 
     * @return string|null
     */
	public function writeCSV($rows=[], $extract_headers=true, $delimiter=',', $enclosure='"', $escape_char="\\")
	{
        if(count($rows) <= 0) return;

		if($extract_headers)
		{
			$header = array_keys($rows[0]); //get the header
			array_unshift($rows, $header); // prepend the header
		}
		ob_start();
		// $file = $this->openFile("php://output",'w') or die("Can't open php://output");
		$handle = fopen("php://output",'w') or die("Can't open php://output");
		
		foreach($rows as $fields) {
			fputcsv($handle, $fields, $delimiter, $enclosure, $escape_char);
			// $file->fputcsv($fields, $delimiter, $enclosure, $escape_char);
		}
		// $file = null; // close file
		fclose($handle) or die("Can't close php://output");
		$output = ob_get_contents(); // stores buffer contents to the output variable
		ob_end_clean();  // clears buffer and closes buffering
		return $output;
	}
}