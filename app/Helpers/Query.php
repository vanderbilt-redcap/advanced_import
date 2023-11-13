<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;


use mysqli;


/**
 * helper class used to manage queries
 * and provide an alternative to $stmt->get_result()
 * where the mysqlind driver is not available
 */
class Query
{

    /**
     * normalized query
     * a pivot rotation query that will get values from the ExternalModules settings table
     *
     * @var string
     */
    private $query;

    private $result;

    /**
     *
     * @var ColumnarDatabase
     */
    private $db;

    /**
     *
     * @param ColumnarDatabase $db
     * @param string $query
     * @param array $params
     * @param mysqli $connection
     */
    public function __construct($db, $query, $params)
    {
        $this->db = $db;
        $prepared_query = $this->prepare($query, $params);
        $this->query = $this->normalizeQuery($prepared_query);
    }

    /**
     * replace question marks in the query with sprintf compatible symbols
     *
     * @param string $query
     * @param array $params
     * @return string
     */
    private function prepare($query, $params)
    {
        $originalParams = $params; //save a copy of provided params
        /**
         * apply parameters to the query
         * - numbers are left untuched
         * - turn booleans into 0/1
         * - other values are checked for NULL
         */
        $applyParams = function($match) use(&$params) {
            if(count($params)==0) throw new \Exception("More parameters must be provided for the provided query", 1);   
            $param = array_shift($params);
            if(is_double($param)) return $param;
            if(is_int($param)) return $param;
            if(is_bool($param)) return intval($param); // trsnaform booleans in 0 or 1
            return checkNull($param);
        };
        $prepared = preg_replace_callback('/\?/', $applyParams, $query);
        if(!$prepared) throw new \Exception("Error preparing the query `{$query}`", 400);
        return $prepared;
    }


    /**
     * Fetch a result row as an associative array 
     *
     * @return array|null
     */
    public function fetch_assoc()
    {
        if(!$this->result) $this->result = db_query($this->query);
        if($row = db_fetch_assoc($this->result)) return $row;
        return null;
    }

    /**
     * return all results as associative arrays
     *
     * @return array
     */
    public function fetch_all()
    {
        $rows = [];
        while($row = $this->fetch_assoc()) $rows[] = $row;
        return $rows;
    }

    /**
     * remove the provided FROM and adjust using the external modules setting table
     *
     * @param string $query_string
     * @return string
     */
    private function normalizeQuery($query_string) {
        $fromRegExp = "/\sFROM\s*?['`]?(?<table>[^\s'`]+)['`]?(?<where> ?WHERE)?/i";
        preg_match($fromRegExp, $query_string, $matches);
        $tableName = $matches['table'] ?? null;
        $rotationQuery = $this->db->getRotatedTableQuery($tableName);
        $moduleId = $this->db->getModule()->getId();
        $realTableName = ColumnarDatabase::getRealTableName($tableName);
        $whereClause = sprintf("WHERE 1", $realTableName, $moduleId);
        if($where = $matches['where'] ?? null) $whereClause .= " AND";
        
        $table = ColumnarDatabase::EXTERNAL_MODULE_SETTINGS_TABLE;
        $normalized_query = preg_replace($fromRegExp, " FROM ($rotationQuery) AS `{$table}` {$whereClause} ", $query_string);
        return $normalized_query;
    }


}