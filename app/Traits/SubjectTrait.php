<?php namespace Vanderbilt\AdvancedImport\App\Traits;

use SplObjectStorage;

trait SubjectTrait {

	/**
	 * Undocumented variable
	 *
	 * @var SplObjectStorage
	 */
	private $observers = ['*' => []];


	private function initObservers()
	{
		/* if(!($this->observers instanceof SplObjectStorage)) {
			$this->observers = new \SplObjectStorage();
        } */
        if(!is_array($this->observers)) $this->observers = ['*' => []];
	}

	private function initEventGroup(string $event = "*"): void
    {
        if (!isset($this->observers[$event])) {
            $this->observers[$event] = [];
        }
    }

	private function getEventObservers(string $event = "*"): array
    {
        $this->initEventGroup($event);
        $group = $this->observers[$event];
        $all = $this->observers["*"];

        return array_merge($group, $all);
    }

	public function attach(\SplObserver $observer, string $event = "*"): void
    {
        $this->initEventGroup($event);
        $this->observers[$event][] = $observer;
    }

	public function detach(\SplObserver $observer, string $event = "*"): void
    {
        foreach ($this->getEventObservers($event) as $key => $s) {
            if ($s === $observer) {
                unset($this->observers[$event][$key]);
            }
        }
    }
	
	public function notify(string $event = "*", $data = null): void
    {
        foreach ($this->getEventObservers($event) as $observer) {
            $observer->update($this, $event, $data);
        }
    }
}