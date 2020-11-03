<?php namespace Vanderbilt\AdvancedImport\App\Models\Importers;

interface ImporterInterface
{
    function process($data, $line);
}