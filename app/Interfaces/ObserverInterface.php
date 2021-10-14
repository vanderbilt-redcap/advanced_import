<?php namespace Vanderbilt\AdvancedImport\App\Interfaces;



interface ObserverInterface
{
    /**
     * react when the observed import sends an update
     *
     * @param SplSubject $subject
     * @param string $event
     * @param array $data
     * @return void
     */
    public function update($subject, $event = null, $data = null);
}