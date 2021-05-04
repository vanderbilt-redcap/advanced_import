<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

use DateTime;
use Vanderbilt\AdvancedImport\AdvancedImport;

/**
 * this class uses the external module settings table to create virtual tables.
 * suitable for storing any kind of data as JSON objects.
 * each table as an autoincrement id key
 * 
 * Structure of the settings tableBlade::component
 * `external_module_id` int(11)
 * `project_id` int(11)
 * `key` varchar(255)
 * `type` varchar(12)
 * `value` mediumtext
 */
class JsonDatabase
{
    const ID_KEY = 'id';
    const TABLE_PERFIX = '__ext_mod_table_'; //followed by 'table' name
    const AUTO_INCREMENT_KEY = '__ext_mod_auto_increment_'; //followed by 'table' name
    const EXTERNAL_MODULE_SETTINGS_TABLE = 'redcap_external_module_settings';

    public function __construct()
    {
        $this->module = AdvancedImport::getInstance();
    }    

    /**
     * create a query and bind the provided params
     * params can be in the format [type, value] or just passed as values
     * available types are:
     * i: corresponding variable has type integer
     * d: corresponding variable has type double
     * s: corresponding variable has type string
     * b: corresponding variable is a blob and will be sent in packets
     * 
     * variable names surrounded in curly braces will be translated to the JSON extract format:
     * Example `{settings}` becomes `value`->>'$.settings'
     * 
     * Example query:
     * $exMod_db = AdvancedImport::dbExMod();
     * $query_string = "SELECT `{settings}` AS `settings` FROM `jobs` WHERE `{id}`=? AND `{status}`=?";
     * $result = $exMod_db->query($query_string, [2,'processing']);
     * 
     * @param string $query_string
     * @param array $params [['s','2'], ['i', 2], etc...]
     * @return mysqli_result|false
     */
    public function query($query_string, $params=[])
    {
        /**
         * @var \mysqli $rc_connection
         */
        global $rc_connection;
        // turn a param into a [type, value] format
        $normalizeParam = function($param) {
            // by default return a string
            $type = 's';
            if(is_double($param)) $type = 'd';
            if(is_int($param)) $type = 'i';
            return [$type, $param];
        };
        /**
         * turn into a format compatible with $stmt->bind_param
         * @see https://www.php.net/manual/en/mysqli-stmt.bind-param.php
         */
        $normalizeParams = function(&$params) use($normalizeParam) {
            $types = [];
            $values = [];
            foreach($params as $param) {
                if(!is_array($param)) $param = $normalizeParam($param);
                list($type, $value) = $param;
                $types[] = $type;
                $values[] = $value;
            }
            $normalizedTypes = implode('',$types);
            $normalizedParams = array_merge([$normalizedTypes], $values);
            $params = $normalizedParams;
        };

        /**
         * remove the provided from and adjust using the external modules setting table
         */
        $fixFrom = function() use(&$query_string) {
            $table = self::EXTERNAL_MODULE_SETTINGS_TABLE;
            $query_string = preg_replace("/\sFROM\s*?['`]?([^\s'`]+)['`]?/i", " FROM `{$table}`", $query_string);
        };
        $fixWhere = function() use(&$query_string) {
            /**
             * extract the name of the virtual table
             */
            $getTableName = function() use($query_string){
                preg_match("/\sFROM\s*?['`]?(?<table>[^\s'`]+)['`]?/i", $query_string, $matches);
                if($tableName = $matches['table']) return static::getRealTableName($tableName);
                return;
            };
            $tableName = $getTableName();
            $whereStatement = sprintf(
                " WHERE `external_module_id`=%u AND `key`='%s' AND ",
                $this->module->getId(), $tableName
            );
            $query_string = preg_replace("/\sWHERE\s/i", $whereStatement, $query_string);
        };
        /**
         * update all detected field names (variables surrounded by ' or ` except for the table because preceded by FROM)
         */
        $fixFieldNames = function() use(&$query_string) {
            $fixKeys = function($matches) {
                $field = $matches['fields'];
                $jsonKey = static::adjustKey($field);
                $key = "`value`->>'{$jsonKey}'";
                return $key;
            };
            $query_string = preg_replace_callback("/['`]?[{](?<fields>[^}]+)[}]['`]?/", $fixKeys, $query_string);
        };
        $removeExtraBlankSpaces = function() use(&$query_string) {
            $query_string = preg_replace("/[\s]{2,}/", ' ', $query_string);
        };
        // apply all fixes to the query string
        $removeExtraBlankSpaces();
        $fixFieldNames();
        $fixWhere();
        $fixFrom();

        $stmt = $rc_connection->prepare($query_string);
        if(!$stmt) {
            $error = print_r(db_error(), true);
            throw new \Exception($error, 1);
        }
        $normalizeParams($params);
        // bind params
        $stmt->bind_param(...$params);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }

    public function dropTable($table_name)
    {
        $normalizedTableName = static::getRealTableName($table_name);
        $query_string = sprintf(
            "DELETE FROM `%s`
            WHERE `external_module_id` = %u
            AND `key` LIKE '%s%%'",
            self::EXTERNAL_MODULE_SETTINGS_TABLE,
            $this->module->getId(), $normalizedTableName
        );
        $result = db_query($query_string);
        if($result==false) throw new \Exception(sprintf("Error dropping the table '%s'", $table_name), 1);
        return true;
    }

    public function createTable($table_name, $drop=false) {
        // $normalizedTableName = static::getRealTableName($table_name);
        if($drop) $this->dropTable($table_name);
        $normalizedAutoIncrement = self::AUTO_INCREMENT_KEY.$table_name;
        $this->module->setSystemSetting($normalizedAutoIncrement, 0);
        // $module->setSystemSetting($normalizedTableName, "[]");
    }

    private static function is_multidimensional_array($array) {
        foreach ($array as $value) {
            if (is_array($value)) return true;
        }
        return false;
    }

    /**
     * adjust the key to be in a MySQL JSON compatible format.
     * could be:
     * - $.something (object)
     * - $[1] (array)
     * The key is not changed if starts with a dollar sign
     *
     * @param string $key
     * @return string
     */
    private static function adjustKey($key) {
        if(preg_match("/^\$/i", $key)) return; // do not change if starts with $
        if(preg_match("/^\d/i", $key)) return $key = "$[$key]"; // consider it an array key
        return $key = "$.$key"; // consider it as an object key
    }

    /**
     * create a statement
     * valid paths for arrays are [0], [1], [*]
     * valid paths for objects are .something, .**
     *
     * @param string $key
     * @param mixed $value
     * @param string $operator
     * @return string
     */
    private static function makeStatement($key, $value, $operator='=')
    {
        $castIfNeeded = function($clause, $value) {
            $convert = false;
            if(is_float($value)) $convert = 'DECIMAL';
            elseif(is_numeric($value)) $convert = 'SIGNED';
            elseif($value instanceof DateTime) $convert = 'DATETIME';
            if($convert) $clause = sprintf("CAST(%s AS %s)", $clause, $convert);
            return $clause;
        };
        $key = self::adjustKey($key);
        $clause = sprintf("`value`->>'%s'", $key);
        $clause = $castIfNeeded($clause, $value);
        $clause .= sprintf(" %s %s", $operator, checkNull($value));
        return $clause;
    }

    /**
     * make a list of path and values compatible
     * with JSON_SET, JSON_REPLACE, etc...
     * valid keys for arrays are [0], [1]
     * valid keys for objects are .a, .something
     *
     * @param array $data
     * @return string
     */
    private static function makePathValueList($data)
    {
        $list = [];
        foreach ($data as $key => $value) {
            if(!is_numeric($value)) $value = checkNull($value); // quote everything but numbers
            $key = self::adjustKey($key);
            $list[] = "'$key'";
            $list[] = $value;
        }
        return implode(', ', $list);
    }

    /**
     *
     * @param string $table_name
     * @param array $params [['key', '=', 'something']]
     * @return \Generator
     */
    public function search($table_name, $criteria=[], $limit=0, $offset=0) {
        if(!empty($criteria)) {
            if(!self::is_multidimensional_array($criteria)) $criteria = [$criteria];
            $whereClause = array_map(function($criteria) {
                return self::makeStatement(...$criteria);
            }, $criteria);
        }
        $whereClause[] = 1;

        $normalizedTableName = static::getRealTableName($table_name);
        $query_string = sprintf(
            "SELECT `value` FROM `%s`
            WHERE `external_module_id` = %u AND `key` = '%s'
            AND %s",
            self::EXTERNAL_MODULE_SETTINGS_TABLE,
            $this->module->getId(), $normalizedTableName,
            implode("\nAND ", $whereClause)
        );
        $result = db_query($query_string);
        $rows = [];
        
        $index = 0;
        if(intval($limit)<=0) $limit = false;
        $offset = $limit ? intval($offset) : false;
        while($row = db_fetch_assoc($result)) {
            if($offset!==false && $index++<$offset) continue; // skip under offset
            $decoded = json_decode($row['value'], $assoc=true);
            yield $decoded;
            $rows[] = $decoded;
            if($limit!==false && count($rows)>=$limit) break; // break if limit is reached
        }
        return $rows;
    }

    public function getRowById($table_name, $id) {
        $normalizedTableName = static::getRealTableName($table_name);
        $key = implode('-', [$normalizedTableName, $id]);
        $row = $this->module->getSystemSetting($key);
        return json_decode($row, $assoc=true);
    }

    public static function getRealTableName($table_name)
    {
        return self::TABLE_PERFIX.$table_name;
    }

    /**
     * increase auto increment and return its value
     *
     * @param string $table_name
     * @return int
     */
    private function getId($table_name)
    {
        $autoIncrement = $this->module->getSystemSetting(self::AUTO_INCREMENT_KEY.$table_name);
        $next = intval($autoIncrement)+1;
        $this->module->setSystemSetting(self::AUTO_INCREMENT_KEY.$table_name, $next);
        return $next;
    }

    public function insert($table_name, $data) {
        $implodeQuote = function($list) {
            return '`'.implode('`, `', $list). '`';
        };
        $module_id = $this->module->getId();
        $id = $this->getId($table_name);
        $normalizedTableName = static::getRealTableName($table_name);
        $data[self::ID_KEY] = $id;
        $table_data = [
            'external_module_id' => $module_id,
            // 'project_id',
            'key' => checkNull($normalizedTableName),
            'type' => checkNull('string'),
            'value' => checkNull(json_encode($data))
        ];

        $query_string = sprintf(
            'INSERT INTO `%s` (%s) VALUES (%s)',
            self::EXTERNAL_MODULE_SETTINGS_TABLE,
            $implodeQuote(array_keys($table_data)),
            implode(', ', $table_data)
        );
        $result = db_query($query_string);
        if(!$result) return false;
        return $id;
    }

    public function delete($table_name, $where_params=[]) {
        if(!self::is_multidimensional_array($where_params)) $where_params = [$where_params];
        $whereClause = array_map(function($criteria){
            return self::makeStatement(...$criteria);
        }, $where_params);
        if(empty($whereClause)) $whereClause[] = 1;

        $module_id = $this->module->getId();
        $normalizedTableName = static::getRealTableName($table_name);
        $query_string = sprintf(
            "DELETE FROM `%s` WHERE `external_module_id`=%u AND `key`=%s AND %s",
            self::EXTERNAL_MODULE_SETTINGS_TABLE, $module_id, checkNull($normalizedTableName), implode("\nAND ", $whereClause)
        );
        $result = db_query($query_string);
        if(!$result) return false;
        return true;
    }

    /**
     * update a json object.
     * Example:
     * $result = $this->update($tableName, ['processed_lines'=>$index, 'status'=>'processing'], ['id', 2]);
     *
     * @param [type] $table_name
     * @param [type] $params
     * @param [type] $where_params
     * @return void
     */
    public function update($table_name, $params, $where_params=[]) {
        if(!self::is_multidimensional_array($where_params)) $where_params = [$where_params];
        $updateStatement = self::makePathValueList($params);
        $whereClause = array_map(function($criteria){
            return self::makeStatement(...$criteria);
        }, $where_params);
        if(empty($whereClause)) $whereClause[] = 1;
        $normalizedTableName = static::getRealTableName($table_name);

        $query_string = sprintf(
            "UPDATE `%s`
            SET `value` = JSON_REPLACE(`value`, %s)
            WHERE `external_module_id` = %u AND `key`='%s'
            AND %s",
            self::EXTERNAL_MODULE_SETTINGS_TABLE,
            $updateStatement,
            $this->module->getId(), $normalizedTableName,
            implode("\nAND ", $whereClause)
        );
        $result = db_query($query_string);
        if(!$result) return false;
        return true;
    }
 }