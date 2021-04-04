<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

use DateTime;
use Vanderbilt\AdvancedImport\AdvancedImport;

class ExModDatabase
{
    const ID_KEY = '__id';
    const TABLE_PERFIX = '__ex_mod_table_'; //followed by 'table' name
    const AUTO_INCREMENT_KEY = '__ex_mode_auto_increment_'; //followed by 'table' name

    private $project_id;

    public function __construct($project_id)
    {
        $this->project_id = $project_id;
        $this->module = AdvancedImport::getInstance();
    }

    public function dropTable($table_name)
    {
        $normalizedTableName = static::getRealTableName($table_name);
        $query_string = sprintf(
            "DELETE FROM `redcap_external_module_settings`
            WHERE `project_id` = %u AND `external_module_id` = %u
            AND `key` LIKE '%s%%'",
            $this->project_id, $this->module->getId(), $normalizedTableName
        );
        $result = db_query($query_string);
        if($result==false) throw new \Exception(sprintf("Error dropping the table '%s'", $table_name), 1);
        return true;
    }

    public function createTable($table_name, $drop=false) {
        // $normalizedTableName = static::getRealTableName($table_name);
        if($drop) $this->dropTable($table_name);
        $normalizedAutoIncrement = self::AUTO_INCREMENT_KEY.$table_name;
        $this->module->setProjectSetting($normalizedAutoIncrement, 0);
        // $module->setProjectSetting($normalizedTableName, "[]");
    }

    private static function is_multidimensional_array($array) {
        foreach ($array as $value) {
            if (is_array($value)) return true;
        }
        return false;
    }

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
        $clause = sprintf("`value`->'%s'", $key);
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
            $key = self::adjustKey($key);
            $list[] = "'$key'";
            $list[] = checkNull($value);
        }
        return implode(', ', $list);
    }

    /**
     *
     * @param string $table_name
     * @param array $params [['key', '=', 'something']]
     * @return array
     */
    public function search($table_name, $criteria=[]) {
        if(!empty($criteria)) {
            if(!self::is_multidimensional_array(@$criteria[0])) $criteria = [$criteria];
            $whereClause = array_map(function($criteria) {
                return self::makeStatement(...$criteria);
            }, $criteria);
        }
        $whereClause[] = 1;

        $normalizedTableName = static::getRealTableName($table_name);
        $query_string = sprintf(
            "SELECT `value` FROM redcap_external_module_settings
            WHERE project_id=%u AND `external_module_id` = %u AND `key` LIKE '%s%%'
            AND %s",
            $this->project_id, $this->module->getId(), $normalizedTableName,
            implode("\nAND ", $whereClause)
        );
        $result = db_query($query_string);
        $rows = [];
        while($row = db_fetch_assoc($result)) {
            $rows[] = json_decode($row['value'], $assoc=true);
        }
        return $rows;
    }

    public function getRowById($table_name, $id) {
        $normalizedTableName = static::getRealTableName($table_name);
        $key = implode('-', [$normalizedTableName, $id]);
        $row = $this->module->getProjectSetting($key);
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
        $autoIncrement = $this->module->getProjectSetting(self::AUTO_INCREMENT_KEY.$table_name);
        $next = intval($autoIncrement)+1;
        $this->module->setProjectSetting(self::AUTO_INCREMENT_KEY.$table_name, $next);
        return $next;
    }

    public function insert($table_name, $data) {
        $id = $this->getId($table_name);
        $normalizedTableName = static::getRealTableName($table_name);
        $data[self::ID_KEY] = "{$id}"; // add unique id as string or JSON_SEARCH won't work
        $key = implode('-', [$normalizedTableName, $id]);
        $this->module->setProjectSetting($key, $data);
        return $id;
    }

    public function delete($table_name, $id) {
        $normalizedTableName = static::getRealTableName($table_name);
        $key = implode('-', [$normalizedTableName, $id]);
        $this->module->removeProjectSetting($key);
        return $id;
    }

    public function update($table_name, $params, $where_params) {
        if(!self::is_multidimensional_array(@$where_params[0])) $where_params = [$where_params];
        $updateStatement = self::makePathValueList($params);
        $whereClause = array_map(function($criteria){
            return self::makeStatement(...$criteria);
        }, $where_params);
        if(empty($whereClause)) $whereClause[] = 1;
        $normalizedTableName = static::getRealTableName($table_name);

        $query_string = sprintf(
            "UPDATE redcap_external_module_settings
            SET `value` = JSON_REPLACE(`value`, %s)
            WHERE `project_id` = %u AND `external_module_id` = %u AND `key` LIKE '%s%%'
            AND %s",
            $updateStatement,
            $this->project_id, $this->module->getId(), $normalizedTableName,
            implode("\nAND ", $whereClause)
        );
        $result = db_query($query_string);
        if($result==false) throw new \Exception(sprintf("Error updating the entry with params '' and search params ''", json_encode($params, JSON_PRETTY_PRINT),  json_encode($where_params, JSON_PRETTY_PRINT)), 1);
        return true;
    }
 }