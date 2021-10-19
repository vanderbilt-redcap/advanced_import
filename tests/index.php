<?php
namespace Vanderbilt\AdvancedImport\Tests;

use RegexIterator;
use RecursiveRegexIterator;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;

chdir(dirname(__DIR__));
// echo getcwd() . "\n";

function getAllTestFiles() {
    $directory = new RecursiveDirectoryIterator(dirname(__FILE__));
    $iterator = new RecursiveIteratorIterator($directory);
    $regex = new RegexIterator($iterator, '/^.+Test\.php$/i', RecursiveRegexIterator::GET_MATCH);
    $files = [];

    foreach ($regex as $matches) {
        $filePath = current($matches);
        $className = pathinfo($filePath, PATHINFO_FILENAME);
        $files[$className] = $filePath;
    }
    /* foreach ($iterator as $info) {
        $files[] = $info->getPathname();
      }*/
    return $files;
}
$files = getAllTestFiles();

// $command = "./vendor/bin/phpunit --color --testdox tests/"; // this is using the symlink
$xdebug2 = "php -dxdebug.remote_enable=1 -dxdebug.remote_mode=req -dxdebug.remote_port=9000 -dxdebug.remote_host=127.0.0.1 -dxdebug.remote_connect_back=0";
$xdebug3 = "-dxdebug.mode=debug -dxdebug.start_with_request=yes"; // add this to launch xdebug3
$command = "./vendor/phpunit/phpunit/phpunit --color --testdox tests/";

if($class = @$_POST['class']) {
    // $command .= sprintf(' --filter %s\%s', __NAMESPACE__, $class); // only run this class
    /**
     *  only run this class.
     * \ (double escaped) is the separator from the namespace, thus indicates the beginning of the class name 
     * :: is the separator for the method name, thus indicates the end of the class name 
     */
    $command .= sprintf(' --filter \'/\\\%s::/\'', $class);
    exec ("php $xdebug3 $command", $output);
}

?>
<form action="" method="POST">
    <!-- <label for="class">Select a test</label> -->
    <select name="class" id="class">
        <option value="">Select a test...</option>
        <?php foreach ($files as $key=>$path) : ?>
            <option value="<?= $key ?>" <?= $key===$class ? 'selected' : ''?> ><?= $key ?></option>
        <?php endforeach; ?>
    </select>
    <input type="submit" value="test">
</form>

<pre>
<?php foreach($output as $line) print $line.PHP_EOL; ?>
</pre>