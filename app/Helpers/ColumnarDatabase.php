<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

use mysqli;
use Vanderbilt\AdvancedImport\AdvancedImport;

/**
 * this class uses the external module settings table to implement a columnar table.
 * each table has an autoincrement id key.
 * 
 * Structure of the settings tableBlade::component
 * `external_module_id` int(11)
 * `project_id` int(11), stores the ID of a virtual row not the actual project ID
 * `key` varchar(255), stores field name in the format `prefix_tableName,fieldName`
 * `type` varchar(12),  will always set to string on insert
 * `value` mediumtext, stores the value of a field in the virtual row
 */
class ColumnarDatabase
{
    const DEFAULT_PRIMARY_KEY = 'id';
    const PREFIX = '__ct_'; // (ct=columnar table) followed by 'table' name
    const EXTERNAL_MODULE_SETTINGS_TABLE = 'redcap_external_module_settings';
    const VALUES_TYPE = 'string'; // type to use when storing data ('type' field in the module settings table )

    /**
     *
     * @param AdvancedImport $advancedImport
     */
    public function __construct($advancedImport)
    {
        $this->module = $advancedImport;
    }

    public function dropDatabase()
    {
        $moduleId = intval($this->module->getId());
        if($moduleId<=0) return;
        $query_string = sprintf("DELETE FROM `redcap_external_module_settings` WHERE `external_module_id`=%u AND `key` LIKE '%s%%'", $moduleId, self::PREFIX);
        $result = db_query($query_string);
        return $result;

    }

    /**
     * get the database connection globally available in REDCap
     *
     * @return \mysqli $rc_connection 
     */
    public function getConnection()
    {
        global $rc_connection;
        /* if(count($rc_connection->error_list)) {
            $rc_connection->close();
        } */
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
     * $query_string = ""SELECT * FROM `jobs` WHERE `status`=?"";
     * $query = $db->runQuery($query_string, [2,'processing']);
     * 
     * @param string $query_string
     * @param array $params [['s','2'], ['i', 2], etc...]
     * @return QueryResult
     */
    public function runQuery($query_string, $params=[])
    {   
        $query = new Query($this, $query_string, $params);
        return $query;
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
     * @return QueryResult
     */
    public function search($tableName, $whereStatement='', $params=[]) {
        $whereStatement = preg_replace("/[\s]*WHERE[\s]*/i", '', $whereStatement); //remove WHERE if included
        $query_string = sprintf("SELECT * FROM `%s` WHERE %s", $tableName, $whereStatement);
        return $this->runQuery($query_string, $params);
    }

    /**
     * utility method to search and return all values
     *
     * @param string $tableName
     * @param string $whereStatement
     * @param array $params
     * @return array
     */
    public function getEntries($tableName, $whereStatement='', $params=[])
    {
        $args = func_get_args();
        $result = $this->search(...$args);
        // $entries = iterator_to_array($generator); // collect all those results first
        $entries = $result->fetch_all();
        return $entries;
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
     * @param int $id
     * @param string $fieldName
     * @return string
     */
    private function getFieldName($tableName, $id, $fieldName)
    {
        $normalizedTableName = static::getRealTableName($tableName);
        return implode(static::getSeparatorCharacter(), [$normalizedTableName, $id, $fieldName]);
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
        $data = $this->filterData($metadata, $data);
        
        $module_id = $this->module->getId();
        $id = $this->getId($tableName);
        $getKey = function($fieldName) use($tableName, $id) {
            return $this->getFieldName($tableName, $id, $fieldName);
        };

        $tableData = [
            'external_module_id' => $module_id,
            // 'project_id' => null, // will contain the ID
            'type' => checkNull(self::VALUES_TYPE),
            'key' => null,
            'value' => null,
        ];
        $fields = array_keys($tableData);
        array_multisort($tableData, $fields);
        $valuesReducer = function($accumulator=[], $fieldName) use($id, $getKey, $data, $tableData, $fields) {
            $value = @$data[$fieldName];
            if(is_array($value)) $value = json_encode($value);
            if(!is_numeric($value)) $value = checkNull($value);
            $key = $getKey($fieldName);
            // $tableData['project_id'] = intval($id);
            $tableData['key'] = checkNull($key);
            $tableData['value'] = $value;
            // array_multisort($tableData, $fields);
            $valueString = sprintf("(%s)", implode(',', $tableData));
            $accumulator[] = $valueString;
            return $accumulator;
        };
        
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

    /**
     * delete an entry 
     *
     * @param string $tableName
     * @param array $where_params
     * @return bool
     */
    public function delete($tableName, $whereStatement='', $whereParams=[])
    {
        $stopTransaction = function() {
            db_query("ROLLBACK");
            return false;
        };
        db_query("START TRANSACTION");
        $primaryKey = @$this->getMetadata($tableName)['primary_key'];
        $matches = $this->getEntries($tableName, $whereStatement, $whereParams);
        $ids = array_column($matches, $primaryKey);
        if(empty($ids)) return $stopTransaction();

        $moduleId = $this->module->getId();
        $realTableName = $this->getRealTableName($tableName);
        // NOTE LIKE '%s,%%'. the comma is to make sure to delete virtual rows fields
        foreach ($ids as $id) {
            $delete_query = sprintf(
                "DELETE FROM `%s` WHERE `external_module_id`=%u AND `key` LIKE '%s,%u,%%'",
                self::EXTERNAL_MODULE_SETTINGS_TABLE, $moduleId, $realTableName, $id
            );
            $result = db_query($delete_query);
            if($result==false) return $stopTransaction();
        }
        db_query("COMMIT");
        return $result; 
    }

    /**
     * update an entry
     * Example:
     * $result = $this->update($tableName, ['processed_lines'=>$index, 'status'=>'processing'], ['id', 2, '=']);
     *
     * @param string $tableName
     * @param array $params associative array [fieldName=>value]
     * @param array $whereStatement a WHERE statement (WHERE word can be omitted)
     * @param array $whereParams params applied to $stmt->bind_param
     * @return void
     */
    public function update($tableName, $params, $whereStatement='', $whereParams=[]) {
        $stopTransaction = function() {
            db_query("ROLLBACK");
            return false;
        };
        db_query("START TRANSACTION");
        $matches = $this->getEntries($tableName, $whereStatement, $whereParams);
        $primaryKey = @$this->getMetadata($tableName)['primary_key'];
        $ids = array_column($matches, $primaryKey);
        if(empty($ids)) return $stopTransaction();

        $moduleId = $this->module->getId();
        $getUpdateStatement = function($key, $value) use($moduleId){
            if(is_array($value)) $value = json_encode($value);
            if(!is_numeric($value)) $value = checkNull($value);
            $query_string = sprintf(
                "UPDATE `%s` SET `value`=%s WHERE `key`='%s' AND `external_module_id`=%u",
                self::EXTERNAL_MODULE_SETTINGS_TABLE, $value, $key, $moduleId
            );
            return $query_string;
        };
        $metadata = $this->getMetadata($tableName);
        $data = $this->filterData($metadata, $params);
        foreach ($ids as $id) {
            foreach ($data as $fieldName => $value) {
                $key = $this->getFieldName($tableName, $id, $fieldName);
                $update_query = $getUpdateStatement($key, $value);
                $result = db_query($update_query);
                if($result==false) return $stopTransaction();
            }
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
    public static function implodeQuote($list, $quoteChar="'") {
        return $quoteChar.implode("$quoteChar, $quoteChar", $list). $quoteChar;
    }

    private static function is_multidimensional_array($array) {
        foreach ($array as $value) {
            if (is_array($value)) return true;
        }
        return false;
    }

    private function filterData($metadata, $data)
    {
        $tableFields = @$metadata['fields'];
        $filtered = array_filter($data, function($key) use($tableFields){
            return in_array($key, $tableFields);
        }, ARRAY_FILTER_USE_KEY);
        return $filtered;
    }

    /**
     * get the query for the table rotation
     *
     * @param string $tableName
     * @return string
     */
    public function getRotatedTableQuery($tableName) {
        $metadata = $this->getMetadata($tableName);
        
        $moduleId = $this->module->getId();
        $fields = @$metadata['fields'];
        $primary_key = @$metadata['primary_key'] ?: self::DEFAULT_PRIMARY_KEY;

        $groupContacts = array_map(function($fieldName) use($tableName){
            return "GROUP_CONCAT(CASE WHEN `virtual_key`='{$fieldName}' THEN `value` ELSE NULL END ORDER BY `value` ASC SEPARATOR '') AS `{$fieldName}`\n";
        }, $fields);
        $realTableName = self::getRealTableName($tableName);
        $query_string = sprintf(
            "SELECT `virtual_id` AS `%s`, %s FROM 
            (
                SELECT 
                SUBSTRING_INDEX(SUBSTRING_INDEX(`key`, ',', 1), ',', -1) AS `table_name`,
                SUBSTRING_INDEX(SUBSTRING_INDEX(`key`, ',', 2), ',', -1) as `virtual_id`,
                SUBSTRING_INDEX(SUBSTRING_INDEX(`key`, ',', 3), ',', -1) AS `virtual_key`,
                `value`
                FROM 
                `%s`
                WHERE `external_module_id`=%u
                HAVING `table_name`='%s'
                ORDER BY `virtual_id`
            ) AS `virtual_table` GROUP BY `virtual_id`",
            $primary_key,
            implode(',', $groupContacts), self::EXTERNAL_MODULE_SETTINGS_TABLE,
            intval($moduleId), $realTableName
        );
        return $query_string;
    }
}