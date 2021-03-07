<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

use Vanderbilt\AdvancedImport\AdvancedImport;
use Vanderbilt\AdvancedImport\App\Traits\CanReadCSV;

class TemporaryTable
{
  use CanReadCSV;

  private $table_name;
  private $file_path;

  public function __construct($file_path=null)
  {
    $this->file_path = $file_path; // not realy used
    $this->table_name = $this->getTableName($file_path); // not realy used
  }

  public function createTempTable($columns, $table_name, $temporary = false, $connection=null)
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

    $temporary_modifier = $temporary ? 'TEMPORARY' : ''; // should the table be temporary?

    $query_string = sprintf(
      "CREATE %s TABLE %s
      (
        %s,
        `id` int(11) NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (`id`)
      )
      ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      ", $temporary_modifier, $table_name, $getColumnsStatement($columns)
    );
    $result = db_query($query_string);
    if($error = db_error()) throw new \Exception(sprintf("Error creating temporary table `%s` - %s", $table_name, $error), 400);
    return $result;
  }

  public function loadDataInfile($file_path, $settings)
  {
      global $rc_connection;
      $connection = $rc_connection;

      $tableExists = function($table_name) {
          $result = db_query(sprintf("SELECT 1 from `%s` LIMIT 1", $table_name));
          return $result;
      };

      $path_parts = pathinfo($file_path);
      $filename = @$path_parts['filename'];
      $table_name = AdvancedImport::TABLES_PREFIX.$filename;
      if($tableExists($table_name)) {
        $this->table_name = $table_name;
        return $table_name; // exit if table exists
      }

      $first_line = $this->readFileAtLine($file_path, 0);
      $column_names = $this->readCSVLine($first_line, $settings->field_delimiter, $settings->text_qualifier);
      $created = $this->createTempTable($column_names, $table_name, $temporary=false, $connection);
      if(!$created) return;
      $field_delimiter = addcslashes($settings->field_delimiter, "'");
      $text_qualifier = addcslashes($settings->text_qualifier, "'");
      $query_string = sprintf(
          "LOAD DATA LOCAL INFILE '%s' INTO TABLE %s
          FIELDS
          TERMINATED BY '%s'
          -- OPTIONALLY ENCLOSED BY '%s'
          IGNORE 1 LINES
          (%s)
          SET id = NULL", // for auto increment
          $file_path, $table_name, $field_delimiter, $text_qualifier, implode(',', $column_names)
      );
      // mysqli_free_result($connection);
      $option_ok = mysqli_options($connection, MYSQLI_OPT_LOCAL_INFILE, true);
      $result = db_query($query_string, $connection);
      $error = db_error($connection);
      if(!$result) return false;
      $loaded_rows = db_affected_rows($connection);
      $this->table_name = $table_name;
      return $table_name;
  }


  private static function implodeAndQuote($glue, $array, $quote="'")
  {
    return $quote.implode($quote.$glue.$quote, $array).$quote;
  }

  /**
   * Undocumented function
   *
   * @param string $file_path
   * @param mixed $settings
   * @param integer $start starting line in the file. start at 1 to skip column names
   * @return integer total imported lines
   */
  function loadData($file_path, $settings, $start=0)
  {
    /**
     * mass insert a list of values in a temp table
     *
     * @param string $table_name
     * @param string $column_list_statement
     * @param array $values_statements
     * @return void
     */
    $insert = function($table_name, $column_list_statement, $values_statements)
    {
      $query_string = sprintf(
        "INSERT INTO `%s`
        %s VALUES %s",
        $table_name, $column_list_statement, implode(",\n", $values_statements)
      );

      $result = db_query($query_string);
      if($error = db_error()) throw new \Exception(sprintf("Error importing data in the database table `%s` - %s", $table_name, $error), 400);
      return $result;
    };

    $file = $this->openFile($file_path);
    $file->seek($start);
    $table_name = $this->getTableName($file_path);

    $mapping = $settings->mapping;
    $delimiter = $settings->field_delimiter;
    $enclosure = $settings->text_qualifier;

    $column_list_statement = "(".self::implodeAndQuote(',', array_keys($mapping), '`').")";
    $values_statements = [];
    
    $total_inserted = 0;
    $max = 10000;
    $counter = 0;
    while($line = $file->current()) {
      $data = $this->readCSVLine($line, $delimiter, $enclosure);
      // extract the data using the mapping indexs
      $mapped_data = array_map(function($index) use ($data) {
        return db_escape($data[$index]);
      },$mapping);
      $values_statements[] = "(".self::implodeAndQuote(',', $mapped_data).")";
      $file->next();
      // check if we are at end of file or we are at max lines
      if(++$counter>=$max || !$file->current()) {
        $insert($table_name, $column_list_statement, $values_statements);
        $total_inserted += $counter;
        $counter = 0; //reset the counter
        $values_statements = []; // reset the container
      }
    }

    return $total_inserted;
  }


  /**
   * get the name of the temporary table created for a file
   *
   * @param string $file_path
   * @return string
   */
  public function getTableName($file_path)
  {
    $path_parts = pathinfo($file_path);
    $filename = @$path_parts['filename'];
    $table_name = AdvancedImport::TABLES_PREFIX.$filename;
    return $table_name;
  }

  public function tableExists($table_name) {
    $result = db_query(sprintf("SELECT 1 from `%s` LIMIT 1", $table_name));
    return $result;
  }

  /**
   * Undocumented function
   *
   * @param string $table_name
   * @param integer $line the line is actually the id of the row since we use auto increment to populate the table
   * @return array
   */
  public function getLine($table_name, $fields, $line)
  {
    $fields_statement = $this->implodeAndQuote(', ', $fields, '`');
    $query_string = sprintf(
      "SELECT %s FROM `%s` WHERE id=%u",
      $fields_statement, $table_name, $line
    );
    $result = db_query($query_string);
    if($row=db_fetch_assoc($result)) return $row;
  }

  public function dropTable($file_path)
  {
    $table_name = $this->getTableName($file_path);
    $query_string = sprintf(
      "DROP TABLE IF EXISTS `%s`",
      $table_name
    );
    $result = db_query($query_string);
    if($error = db_error()) throw new \Exception(sprintf("Error dropping the temporary table `%s` - %s", $table_name, $error), 400);
    return $result;

  }
}