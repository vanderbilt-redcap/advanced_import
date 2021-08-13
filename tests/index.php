<?php
chdir(dirname(__DIR__));
// echo getcwd() . "\n";

// $command = "./vendor/bin/phpunit --color --testdox tests/"; // this is using the symlink
$command = "./vendor/phpunit/phpunit/phpunit --color --testdox tests/";

exec ($command, $output);
?>
<pre>
<?php
foreach($output as $line) print $line.PHP_EOL;
?>
</pre>