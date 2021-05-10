<?php namespace Vanderbilt\AdvancedImport\tests;

// For now, the path to "redcap_connect.php" on your system must be hard coded.
require_once __DIR__ . '/../../../redcap_connect.php';

class VersionComparisonTest extends \ExternalModules\ModuleBaseTest
{
   function testFirstEqualToSecond() {
        $this->assertSame(true, $this->module->compareVersions('v1.7.3', 'v1.7.3', '=') );
        $this->assertSame(true, $this->module->compareVersions('v1.7.3', 'v1.7.3', '==') );
        $this->assertSame(true, $this->module->compareVersions('v1.7.3', 'v1.7.3', 'eq') );
        $this->assertSame(false, $this->module->compareVersions('v1.8.3', 'v1.7.3', 'eq') );
   }

   function testFirstNotEqualToSecond() {
        $this->assertSame(true, $this->module->compareVersions('v1.7.3', 'v2.7.3', '!=') );
        $this->assertSame(true, $this->module->compareVersions('v1.7.3', 'v2.7.3', '<>') );
        $this->assertSame(true, $this->module->compareVersions('v1.7.3', 'v1.8.3', 'ne') );
        $this->assertSame(false, $this->module->compareVersions('v1.7.3', '1.7.3', 'ne') );
   }

   function testFirstLessThanSecond() {
        $this->assertSame(true, $this->module->compareVersions('v1.7.0', 'v1.7.1', '<') );
        $this->assertSame(true, $this->module->compareVersions('v1.7.0', 'v1.7.1', 'lt') );
   }

   function testFirstMoreThanSecond() {
        $this->assertSame(true, $this->module->compareVersions('v1.7.2', 'v1.7.1', '>') );
        $this->assertSame(true, $this->module->compareVersions('v1.7.2', 'v1.7.1', 'gt') );
   }

   function testFirstLessOrEqualThanSecond() {
      $this->assertSame(true, $this->module->compareVersions('v1.7.0', 'v1.7.1', '<=') );
      $this->assertSame(true, $this->module->compareVersions('v1.7.0', 'v1.7.1', 'le') );
      $this->assertSame(true, $this->module->compareVersions('v1.7.0', 'v1.7.1', '<=') );
      $this->assertSame(true, $this->module->compareVersions('v1.7.0', 'v1.7.1', 'le') );
      $this->assertSame(false, $this->module->compareVersions('v1.7.3', 'v1.7.1', 'le') );
   }

   function testFirstMoreOrEqualThanSecond() {
      $this->assertSame(true, $this->module->compareVersions('v1.7.2', 'v1.7.1', '>=') );
      $this->assertSame(true, $this->module->compareVersions('v1.7.2', 'v1.7.1', 'ge') );
      $this->assertSame(true, $this->module->compareVersions('v1.7.2', 'v1.7.2', '>=') );
      $this->assertSame(true, $this->module->compareVersions('v1.7.2', 'v1.7.2', 'ge') );
      $this->assertSame(false, $this->module->compareVersions('v1.7.1', 'v1.7.2', 'ge') );
   }

   function testDetectWrongOperator() {
      $this->assertSame(null, $this->module->compareVersions('v1.7.2', 'v1.7.1', 'wrong') );
   }
}