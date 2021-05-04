<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

use Vanderbilt\AdvancedImport\AdvancedImport;

class JsonDatabaseObject
{
    const TABLE_PERFIX = '__ext_mod_table_'; //followed by 'table' name
    const AUTO_INCREMENT_KEY = '__ext_mod_auto_increment_'; //followed by 'table' name

    private $project_id;

    public function __construct($project_id)
    {
        $this->project_id = $project_id;
    }

    public function createTable($table_name) {
        $normalizedTableName = static::getRealTableName($table_name);
        $normalizedAutoIncrement = self::AUTO_INCREMENT_KEY.$table_name;
        $module = AdvancedImport::getInstance();
        $module->setProjectSetting($normalizedAutoIncrement, 0);
        $module->setProjectSetting($normalizedTableName, "{}");
    }
    public function query($query_string, $params=[]) {

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
        $module = AdvancedImport::getInstance();
        $autoIncrement = $module->getProjectSetting(self::AUTO_INCREMENT_KEY.$table_name);
        $next = intval($autoIncrement)+1;
        $module->setProjectSetting(self::AUTO_INCREMENT_KEY.$table_name, $next);
        return $next;
    }

    private function normalizeDataForStoring($data)
    {
        $json = json_encode($data);
        $escaped = addcslashes($json, "'");
        return $escaped;
    }

    public function insert($table_name, $data) {
        $getJsonObjectStatement = function($data) {
            $list = [];
            foreach ($data as $key => $value) {
                $list[] = checkNull($key);
                $list[] = checkNull($value);
            }
            $statement = sprintf("JSON_OBJECT(%s)", implode(', ', $list));
            return $statement;
        };
        $id = $this->getId($table_name);
        $normalizedTableName = static::getRealTableName($table_name);
        // $jsonStatement = $getJsonObjectStatement($data);
        $normalizedData = $this->normalizeDataForStoring($data);
        $query_string = sprintf(
            "UPDATE redcap_external_module_settings
            SET `value` = JSON_INSERT(`value`, '$._%u', CAST('%s' AS JSON) )
            WHERE project_id = %u
            AND `key` = %s ",
            $id, $normalizedData,
            $this->project_id, checkNull($normalizedTableName)
        );
        $result = db_query($query_string);
        if($result==false) throw new \Exception("Error inserting a new entry", 1);
        return $id;
    }

    public function delete($table_name, $id) {
        $normalizedTableName = static::getRealTableName($table_name);
        $query_string = sprintf(
            "UPDATE redcap_external_module_settings
            SET `value` = JSON_REMOVE(`value`, '$._%u' )
            WHERE project_id = %u
            AND `key` = %s ",
            $id,
            $this->project_id, checkNull($normalizedTableName)
        );
        $result = db_query($query_string);
        if($result==false) throw new \Exception(sprintf("Error deleting the entry id '%u'", $id), 1);
        return $id;
    }

    public function update($table_name, $id, $data) {
        $getReplaceList = function($id, $data) {
            $list = [];
            foreach ($data as $key => $value) {
                $list[] = sprintf("$._%u.%s", $id, $key);
                $list[] = checkNull($value);
            }
            return implode(', ', $list);
        };
        $normalizedTableName = static::getRealTableName($table_name);
        $replaceList = $getReplaceList($id, $data);
        $query_string = sprintf(
            "UPDATE redcap_external_module_settings
            SET `value` = JSON_REPLACE(`value`, %s)
            WHERE project_id = %u
            AND `key` = %s ",
            $replaceList,
            $this->project_id, checkNull($normalizedTableName)
        );
        $result = db_query($query_string);
        if($result==false) throw new \Exception(sprintf("Error updating the entry id '%u'", $id), 1);
        return true;
    }
 }