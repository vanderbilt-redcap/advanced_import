<?php namespace Vanderbilt\AdvancedImport\App\Models;


interface Mediator
{
    public function notify($sender, $event, $details=[]);
}