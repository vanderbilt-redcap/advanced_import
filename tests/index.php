<?php
chdir(dirname(__DIR__));
// echo getcwd() . "\n";

// $command = "./vendor/bin/phpunit --color --testdox tests/"; // this is using the symlink
$xdebug2 = "php -dxdebug.remote_enable=1 -dxdebug.remote_mode=req -dxdebug.remote_port=9000 -dxdebug.remote_host=127.0.0.1 -dxdebug.remote_connect_back=0";
$xdebug3 = "-dxdebug.mode=debug -dxdebug.start_with_request=yes"; // add this to launch xdebug3
$command = "./vendor/phpunit/phpunit/phpunit --color --testdox tests/";

$command .= " --filter ParsingTest"; // only run this class

exec ("php $xdebug3 $command", $output);
?>
<pre>
<?php
foreach($output as $line) print $line.PHP_EOL;
?>
</pre>