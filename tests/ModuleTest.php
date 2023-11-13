<?php namespace Vanderbilt\AdvancedImport\Tests;


use Records;

class ModuleTest extends \ExternalModules\ModuleBaseTest
{
    private $project_id;
    private $createdJobId = null;

    /**
     * Undocumented function
     *
     * @return void
     */
    public function setUp():void {
        $this->project_id = 33;
    }

    function testDeleteAllData() {
        define('PROJECT_ID', $this->project_id);
        $getTotal = function() {
            $dataTotalQueryString = sprintf(
                'SELECT count(`record`) AS `total` FROM '.Records::getDataTable($this->project_id).' WHERE project_id=%u',$this->project_id);
            $result = db_query($dataTotalQueryString);
            $deleted = false;
            if($row = db_fetch_assoc($result)) {
                return intval(@$row['total']);
            }
            return false;
        };
        $deleteAll = function() {
            $project = new \Project($this->project_id);
            $dataQueryString = sprintf('SELECT distinct `record` FROM '.Records::getDataTable($this->project_id).' WHERE project_id=%u', $this->project_id);
            $result = db_query($dataQueryString);
            while($row = db_fetch_assoc($result)) {
                $record = @$row['record'];
                Records::deleteRecord($record, $project->table_pk, $project->multiple_arms, $project->project['randomization'], $project->project['status'], $project->project['require_change_reason'], $arm_id=false, $logDescription=" (AdvancedImport module)");
            }
        };
        $totalStart = $getTotal();
        $deleted = $totalStart == 0;
        if(!$deleted) {
            $deleteAll();
            $totalEnd = $getTotal();
            $deleted = $totalEnd == 0;
        }
        $this->assertTrue($deleted);

    }

}