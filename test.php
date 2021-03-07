<?php
namespace Vanderbilt\AdvancedImport;

use Project;
use SplFileObject;
use Vanderbilt\AdvancedImport\App\Traits\CanOpenFile;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
$module_path = $module->getModulePath();
include($module_path.'header.php');


class CsvManager
{
  use CanOpenFile;

  public function readFileAtLine($file, $line_number)
  {
    if(!($file instanceof SplFileObject)) $file = $this->openFile($file);
    $file->seek($line_number);
    if($line = $file->current()) return $line;
  }

  /**
	 * parse a file and get the csv data as array of lines
	 *
	 * @param string $file_path
	 * @param string $delimiter the delimiter character or 'auto' to guess the delimiter from the first line of the file
	 * @param string $enclosure
	 * @param string $escape_char
	 * @param integer $length Reading ends when length - 1 bytes have been read
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

  public function createTempTable($columns)
  {
    $random_name = function() {
      $random_string = time();
      for ($i=0; $i < 10; $i++) {
        $random_string .= rand(0,9);
      }
      return $random_string;
    };
    $getColumnsStatement = function($columns) {

      $statements = array_map(function($column_name) {
        return sprintf("`%s` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL", $column_name);
      }, $columns); 
      return implode(",\n", $statements);
    };

    $query_string = sprintf(
      "CREATE TEMPORARY TABLE advanced_import_%s
      (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (`id`),
        %s
      )
      ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      ", $random_name(), $getColumnsStatement($columns));
      $result = db_query($query_string);
      return $result;
  }
  
  public function loadData($file_path)
  {
    $line = $this->readFileAtLine($file_path, 0);
    $columns = $this->readCSVLine($line);
    $result = $this->createTempTable($columns);

    echo $result;
    // $query_string = sprintf("LOAD DATA INFILE '%s' INTO TABLE advanced_import_my_table", $file_path);
    // $resutls = db_query($query_string);
  }

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
}

$csv_file_path = $module_path."data/200kb.csv";
// $manager = new CsvManager();
// $manager->loadData($csv_file_path);

$project = new Project(25);
$info = $project->project;

?>
<?= print_r($info) ?>

<?php 
$page->PrintFooterExt();
?>

