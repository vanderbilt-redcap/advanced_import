<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

use Vanderbilt\AdvancedImport\AdvancedImport;

/**
 * this class uses the external module settings table to implement a columnar table.
 * each table has an autoincrement id key.
 * 
 * Structure of the settings tableBlade::component
 * `external_module_id` int(11)
 * `project_id` int(11)
 * `key` varchar(255), stores field name in the format `prefix_tableName,fieldName`
 * `type` varchar(12), stores the ID of a virtual row
 * `value` mediumtext, stores the value of a field in the virtual row
 */
class ColumnarDatabase
{
    const DEFAULT_PRIMARY_KEY = 'id';
    const PREFIX = '__ct_'; // (ct=columnar table) followed by 'table' name
    const EXTERNAL_MODULE_SETTINGS_TABLE = 'redcap_external_module_settings';

    public function __construct()
    {
        $this->module = AdvancedImport::getInstance();
    }

    /**
     * get the database connection globally available in REDCap
     *
     * @return \mysqli $rc_connection 
     */
    public function getConnection()
    {
        global $rc_connection;
        return $rc_connection;
    }

    /**
     * get the characetr that separates the table name (with prefix) from
     * the field name and the ID in the `key` column
     *
     * @return string
     */
    private static function getSeparatorCharacter() { return ','; }

    public function getMetadataKey($tableName)
    {
        return self::PREFIX.$tableName.'_meta';
    }

    /**
     * getter for the metadata of a virtual table
     * it contains at least the primary_key and the auto_increment value
     *
     * @param string $tableName
     * @return array
     */
    public function getMetadata($tableName)
    {
        $metadataKey = $this->getMetadataKey($tableName);
        return $this->module->getSystemSetting($metadataKey) ?: [];
    }

    /**
     * setter fot the metadata of a virtual table
     *
     * @param string $tableName
     * @param array $metadata
     * @return void
     */
    private function setMetadata($tableName, $metadata)
    {
        $metadataKey = $this->getMetadataKey($tableName);
        $this->module->setSystemSetting($metadataKey, $metadata);
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
     * $exMod_db = AdvancedImport::jsonDb();
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
         * remove the provided from and adjust using the external modules setting table
         */
        $normalizeQuery = function($query_string) {
            $fromRegExp = "/\sFROM\s*?['`]?(?<table>[^\s'`]+)['`]?(?<where> ?WHERE)?/i";
            preg_match($fromRegExp, $query_string, $matches);
            $tableName = @$matches['table'];
            $rotationQuery = $this->getRotatedTableQuery($tableName);
            $moduleId = $this->module->getId();
            $realTableName = static::getRealTableName($tableName);
            $whereClause = sprintf("WHERE 1", $realTableName, $moduleId);
            if($where = @$matches['where']) $whereClause .= " AND";
            
            $table = self::EXTERNAL_MODULE_SETTINGS_TABLE;
            $normalized_query = preg_replace($fromRegExp, " FROM ($rotationQuery) AS `{$table}` {$whereClause} ", $query_string);
            return $normalized_query;
        };
        $connection = $this->getConnection();
        $normalized_query = $normalizeQuery($query_string);
        $stmt = $connection->prepare($normalized_query);
        if(!$stmt) {
            $error = print_r(db_error(), true);
            throw new \Exception($error, 1);
        }
        $normalizedParams = $this->normalizeParams($params);
        // bind params
        $stmt->bind_param(...$normalizedParams);
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

    public function createTable($tableName, $params=[], $drop=false) {
        if($drop) $this->dropTable($tableName);
        $metadata = $this->getMetadata($tableName);
        if(!empty($metadata)) return; // exit if exists

        $metadata['fields'] = @$params['fields'] ?: [];
        if(empty($metadata['fields'])) throw new \Exception("A list of fields must be specified", 400);
        $primaryKey = @$params['primary_key'] ?: self::DEFAULT_PRIMARY_KEY;
        $metadata['primary_key'] = $primaryKey;
        $metadata['auto_increment'] = 0;
        $this->setMetadata($tableName, $metadata);
    }


    /**
     * get a list of entries matching the criteria specified in the whereStatement
     *
     * @param string $tableName
     * @param string $whereStatement a WHERE statement that can also include ORDER BY, LIMIT and all other supported statements
     * @param array $params paramenters to bind to the query
     * @return array
     */
    public function search($tableName, $whereStatement='', $params=[]) {
        $whereStatement = preg_replace("/[\s]*WHERE[\s]*/i", '', $whereStatement); //remove WHERE if included
        $query_string = sprintf("SELECT * FROM `%s` WHERE %s", $tableName, $whereStatement);
        $result = $this->query($query_string, $params);
        $results = [];
        while($row = db_fetch_assoc($result)) $results[] = $row;
        return $results;
    }

    /**
     * get the first part of the field name (perfix and table name).
     * The complete field name is composed by prefix, table name and field name
     *
     * @param string $tableName
     * @return string
     */
    public static function getRealTableName($tableName)
    {
        return self::PREFIX.$tableName;
    }

    /**
     * increase auto increment and return its value
     *
     * @param string $table_name
     * @return int
     */
    private function getId($table_name)
    {
        $metadata = $this->getMetadata($table_name);
        $autoIncrement = @$metadata['auto_increment'];
        $next = $metadata['auto_increment'] = intval($autoIncrement)+1;
        $this->setMetadata($table_name, $metadata);
        return $next;
    }

    /**
     * get the formatted key that contains table name, field name and id
     *
     * @param string $tableName
     * @param string $fieldName
     * @param int $id
     * @return string
     */
    private function getFieldName($tableName, $fieldName)
    {
        $normalizedTableName = static::getRealTableName($tableName);
        return implode(static::getSeparatorCharacter(), [$normalizedTableName,$fieldName]);
    }

    /**
     * insert an entry
     *
     * @param string $tableName
     * @param array $data
     * @return int|false
     */
    public function insert($tableName, $data) {
        $metadata = $this->getMetadata($tableName);

        // remove data that should not be saved
        $filterData = function($data) use($metadata) {
            $tableFields = @$metadata['fields'];
            $filtered = array_filter($data, function($key) use($tableFields){
                return in_array($key, $tableFields);
            }, ARRAY_FILTER_USE_KEY);
            return $filtered;
        };
        $data = $filterData($data);
        
        $module_id = $this->module->getId();
        $id = $this->getId($tableName);
        $getKey = function($fieldName) use($tableName) {
            return $this->getFieldName($tableName, $fieldName);
        };

        $tableData = [
            'external_module_id' => $module_id,
            // 'project_id',
            'type' => null, // will contain the ID
            'key' => null,
            'value' => null,
        ];
        $valuesReducer = function($accumulator=[], $fieldName) use($id, $getKey, $data, $tableData) {
            $value = @$data[$fieldName];
            if(is_array($value)) $value = json_encode($value);
            if(!is_numeric($value)) $value = checkNull($value);
            $key = $getKey($fieldName);
            $tableData['type'] = intval($id);
            $tableData['key'] = checkNull($key);
            $tableData['value'] = $value;
            array_multisort($tableData, $fields);
            $valueString = sprintf("(%s)", implode(',', $tableData));
            $accumulator[] = $valueString;
            return $accumulator;
        };
        $fields = array_keys($tableData);
        $values = array_reduce(array_keys($data), $valuesReducer);
        
        $query_string = sprintf(
            'INSERT INTO `%s` (%s) VALUES %s',
            self::EXTERNAL_MODULE_SETTINGS_TABLE,
            static::implodeQuote($fields, '`'),
            implode(', ', $values)
        );
        $result = db_query($query_string);
        if(!$result) return false;
        return $id;
    }

    private static function makeWhereStatements($criteria)
    {
        if(!self::is_multidimensional_array($criteria)) $where_params = [$criteria];
        $makeSingleCriteriaStatement = function($criteria) {
            list($field, $value, $operator) = $criteria;
            if(is_array($value)) $value = json_encode($value);
            if(!is_numeric($value)) $value = checkNull($value);
            $operator = $operator ?: '=';
            return sprintf('`%s`%s%s',$field, $operator, $value);
        };
        $whereStatements = array_map($makeSingleCriteriaStatement, $criteria);
        return $whereStatements;
    }

    /**
     * delete an entry 
     *
     * @param string $tableName
     * @param array $where_params
     * @return bool
     */
    public function delete($tableName, $whereStatement='', $whereParams=[])
    {
        db_query("START TRANSACTION");
        $primaryKey = @$this->getMetadata($tableName)['primary_key'];
        $matches = $this->search($tableName, $whereStatement, $whereParams);
        $ids = array_column($matches, $primaryKey);

        $moduleId = $this->module->getId();
        $realTableName = $this->getRealTableName($tableName);
        $delete_query = sprintf(
            "DELETE FROM `%s` WHERE
            `external_module_id`=%u AND `key` LIKE '%s%%' AND `%s` IN (%s)",
            self::EXTERNAL_MODULE_SETTINGS_TABLE, $moduleId, $realTableName, static::implodeQuote($ids, "'")
        );
        $result = db_query($delete_query);
        db_query("COMMIT");
        return $result; 
    }

    /**
     * update an entry
     * Example:
     * $result = $this->update($tableName, ['processed_lines'=>$index, 'status'=>'processing'], ['id', 2, '=']);
     *
     * @param string $tableName
     * @param array $params
     * @param array $whereStatement a WHERE statement (without the WHERE )
     * @return void
     */
    public function update($tableName, $params, $whereStatement='', $whereParams=[]) {
        db_query("START TRANSACTION");
        $matches = $this->search($tableName, $whereStatement, $whereParams);
        $primaryKey = @$this->getMetadata($tableName)['primary_key'];
        $ids = array_column($matches, $primaryKey);

        $moduleId = $this->module->getId();
        $getUpdateStatement = function($fieldName, $value) use($ids, $moduleId, $tableName){
            $key = $this->getFieldName($tableName, $fieldName);
            if(is_array($value)) $value = json_encode($value);
            if(!is_numeric($value)) $value = checkNull($value);
            $query_string = sprintf(
                "UPDATE `%s` SET `value`=%s WHERE `key`='%s' AND `external_module_id`=%u AND `type` IN (%s)",
                self::EXTERNAL_MODULE_SETTINGS_TABLE, $value, $key, $moduleId, static::implodeQuote($ids, "'")
            );
            return $query_string;
        };
        foreach ($params as $fieldName => $value) {
            $update_query = $getUpdateStatement($fieldName, $value);
            $result = db_query($update_query);
            // stop and exit if any update fails
            if($result==false) return false;
        }
        db_query("COMMIT");
        return true;
    }

    /**
     * apply a function to an array
     * and return true as soon as
     * the first element is true
     *
     * @param array $array
     * @param callable $fn
     * @return Boolean
     */
    private static function array_any(array $array, callable $fn) {
        foreach ($array as $value) {
            if($fn($value)) {
                return true;
            }
        }
        return false;
    }

    /**
     * apply a function to an array
     * and return true if all elements are truty
     *
     * @param array $array
     * @param callable $fn
     * @return Boolean
     */
    private static function array_every(array $array, callable $fn) {
        foreach ($array as $value) {
            if(!$fn($value)) {
                return false;
            }
        }
        return true;
    }

    /**
     * utility method to implode and quote a list of strings
     *
     * @param array $list
     * @param string $quoteChar
     * @return string
     */
    private static function implodeQuote($list, $quoteChar="'") {
        return $quoteChar.implode("$quoteChar, $quoteChar", $list). $quoteChar;
    }

    private static function is_multidimensional_array($array) {
        foreach ($array as $value) {
            if (is_array($value)) return true;
        }
        return false;
    }

    /**
     * turn into a format compatible with $stmt->bind_param
     *
     * @param array $params
     * @return array
     * 
     * @see https://www.php.net/manual/en/mysqli-stmt.bind-param.php
     */
    private function normalizeParams($params) {
        // turn a param into a [type, value] format
        $normalizeParam = function($param) {
            // by default return a string
            $type = 's';
            if(is_double($param)) $type = 'd';
            if(is_int($param)) $type = 'i';
            return [$type, $param];
        };
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
        return $normalizedParams;
    }

    /**
     * get the query for the table rotation
     *
     * @param string $tableName
     * @return string
     */
    private function getRotatedTableQuery($tableName) {
        $metadata = $this->getMetadata($tableName);
        
        $moduleId = $this->module->getId();
        $fields = @$metadata['fields'];
        $primary_key = @$metadata['primary_key'] ?: self::DEFAULT_PRIMARY_KEY;

        $realNames = [];
        $groupContacts = array_map(function($fieldName) use($tableName, &$realNames){
            $realNames[] = $realFieldName = $this->getFieldName($tableName, $fieldName);
            return "GROUP_CONCAT(CASE WHEN `key`='{$realFieldName}' THEN value ELSE NULL END ORDER BY `value` ASC SEPARATOR '') AS `{$fieldName}`";

        }, $fields);
        $query_string = sprintf(
            "SELECT `type` AS `%s`, %s FROM `%s` WHERE
            `external_module_id`=%u
            AND `key` IN (%s)
            GROUP BY `%s` ORDER BY `%s`",
            $primary_key,
            implode(',', $groupContacts), self::EXTERNAL_MODULE_SETTINGS_TABLE,
            intval($moduleId), static::implodeQuote($realNames, "'"), $primary_key, $primary_key
        );
        return $query_string;
    }
 }