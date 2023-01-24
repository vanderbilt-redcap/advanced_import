<?php namespace Vanderbilt\AdvancedImport\Tests;

use Vanderbilt\AdvancedImport\AdvancedImport;

class CronTest extends \ExternalModules\ModuleBaseTest
{


    function testCron() {
        $module = AdvancedImport::getInstance();
        $module->cron_checkJobs($cronInfo=[]);
    }


}