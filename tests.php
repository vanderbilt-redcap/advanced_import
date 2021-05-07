<?php
chdir(__DIR__);
// echo getcwd() . "\n";
$command = "./vendor/bin/phpunit --color --testdox tests/";
exec ($command, $output);
?>
<pre>
<?php
foreach($output as $line) print $line.PHP_EOL;
?>
</pre>