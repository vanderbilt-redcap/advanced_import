<?php namespace Vanderbilt\AdvancedImport\App\Helpers;

use PDO;
use PDOStatement;

class Database {

  private $db_path;

  /**
   *
   * @var PDO
   */
  private $connection;

  public function __construct($path)
  {
    $this->db_path = $path;
  }

  /**
   *
   * @return PDO
   */
  public function getConnection()
  {
      if($this->connection==null){
        $this->connection = $this->connect();
      }
      return $this->connection;
  }

  /**
   * Turns off autocommit mode. While autocommit mode is turned off,
   * changes made to the database via the PDO object instance are not
   * committed until you end the transaction by calling {@link PDO::commit()}.
   *
   * @return bool
   */
  public function beginTransaction()
  {
    $connection = $this->getConnection();
    return $connection->beginTransaction();
  }

  /**
   * Commits a transaction
   *
   * @return bool
   */
  public function commit()
  {
    $connection = $this->getConnection();
    return $connection->commit();
  }

  /**
   * Rolls back a transaction
   *
   * @return bool
   */
  public function rollBack()
  {
    $connection = $this->getConnection();
    return $connection->rollBack();
  }

  /**
   * get a reference to the sqlite3 DB
   * create the database if not exists
   *
   * @return PDO
   */
  private function connect()
  {
    $db = new PDO("sqlite:".$this->db_path);
    $db->query("PRAGMA journal_mode=WAL");
    $db->query("PRAGMA synchronous=OFF");
    return $db;
  }

  /**
   *
   * @param string $query_string
   * @param array $params
   * @return PDOStatement
   */
  public function query($query_string, $params=[])
  {
    $db = $this->getConnection();
    $stmt = $db->prepare($query_string);
    if(!$stmt) {
      $error = print_r($db->errorInfo(), true);
      throw new \Exception($error, 1);
    }
    $stmt->execute($params);
    return $stmt;
  }


  /**
   * insert an associative array
   *
   * @param string $table_name
   * @param array $params
   * @return string
   */
  public function insert($table_name, $params=[])
  {
    $field_names = array_keys($params);
    $fields = array_map(function($field){
      return sprintf("`%s`", $field);
    }, $field_names);

    $fields_string = implode(', ', $fields);
    $values_placeholders = implode(', ', array_map(function($field) {
      return ':'.$field;
    }, $field_names));

    $query_string = sprintf(
      "INSERT INTO `%s` (%s) VALUES (%s)",
      $table_name, $fields_string, $values_placeholders
    );

    $db = $this->getConnection();
    $stmt = $db->prepare($query_string);
    $stmt->execute($params);
    if(!$stmt) {
      throw new \Exception($db->errorInfo(), 1);
    }
    return $db->lastInsertId();
  }

  /**
   * delete from a table
   *
   * @param string $table_name
   * @param array $params
   * @return int
   */
  public function delete($table_name, $params)
  {
    $where_placeholders = self::makePlaceholders($params, ' AND ');
    $query_string = sprintf("DELETE FROM `%s` WHERE %s", $table_name, $where_placeholders);
    $db = $this->getConnection();
    $stmt = $db->prepare($query_string);
    $stmt->execute($params);
    if(!$stmt) {
      throw new \Exception($db->errorInfo(), 1);
    }
    return $stmt->rowCount();
  }

  /**
   * create a copy of an array
   * where the keys have been prefixed with a string.
   * used with prepared statements
   *
   * @param array $array
   * @param string $prefix
   * @return array
   */
  private function prefixKeys($array, $prefix='my_prefix_') {
    //Format keys
    $map = function($key) use($prefix) {
      return $prefix.$key;
    };
    //Map keys to format function
    $keys = array_map($map, array_keys($array));

    //Use array_combine to map formatted keys to array values
    $array = array_combine($keys, $array);
    return $array;
  }

  private static function makePlaceholders($data, $glue=',', $prefix='')
  {
      $palceholders = array_map(function($field) use($prefix){
        return sprintf("`%s`=:%s", $field, $prefix.$field);
      }, array_keys($data));
      return implode($glue, $palceholders);
  }

  /**
   * update a table
   *
   * @param string $table_name
   * @param array $params
   * @param array $where_params
   * @return int
   */
  public function update($table_name, $params, $where_params)
  {
    $update_statement = self::makePlaceholders($params);
    
    $prefix = 'where_'; // define a prefix to use in the where statement
    $prefixed_where = $this->prefixKeys($where_params, $prefix);
    $where_statement = self::makePlaceholders($where_params, ' AND ', $prefix);

    $query_string = sprintf(
      "UPDATE `%s` SET %s WHERE %s",
      $table_name, $update_statement, $where_statement
    );
    $all_params = array_merge($params, $prefixed_where);

    $db = $this->getConnection();
    $stmt = $db->prepare($query_string);
    $stmt->execute($all_params);
    if(!$stmt) {
      throw new \Exception($db->errorInfo(), 1);
    }
    return $stmt->rowCount();
  }
  
}