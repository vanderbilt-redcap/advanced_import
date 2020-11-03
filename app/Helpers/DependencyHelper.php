<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

 class DependencyHelper {

    function __construct($dir = __DIR__)
    {
        chdir($dir);
        $this->getComposer();
    }

    private function getComposer()
    {
        if(!file_exists('composer.phar'))
        {
            exec('php -r "copy(\'https://getcomposer.org/installer\', \'composer-setup.php\');"');
            exec('php -r "if (hash_file(\'SHA384\', \'composer-setup.php\') === \'93b54496392c062774670ac18b134c3b3a95e5a5e5c8f1a9f115f203b75bf9a129d5daa8ba6a13e2cc8a1da0806388a8\') { echo \'Installer verified\'; } else { echo \'Installer corrupt\'; unlink(\'composer-setup.php\'); } echo PHP_EOL;"');
            exec('php composer-setup.php');
            exec('php -r "unlink(\'composer-setup.php\');"');
        }
    }

    public function installDependencies()
    {
        $composer_command = 'composer'; //assume that composer is available at system level
        if(file_exists('composer.phar'))
        {
            $composer_command = 'composer.phar';
        }
        exec("php {$composer_command} install");
    }
 }