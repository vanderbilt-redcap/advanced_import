<?php namespace Vanderbilt\AdvancedImport\App\Models\Queue;

interface JobInterface
{
    public function process();
}