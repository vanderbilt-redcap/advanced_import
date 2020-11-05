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

    /**
     *
     * @param string $event
     * @return void
     */
	private function initEventGroup($event = "*")
    {
        if (!isset($this->observers[$event])) {
            $this->observers[$event] = [];
        }
    }

    /**
     *
     * @param string $event
     * @return array
     */
    private function getEventObservers($event = "*")
    {
        $this->initEventGroup($event);
        $group = $this->observers[$event];
        $all = $this->observers["*"];

        return array_merge($group, $all);
    }

    /**
     *
     * @param \SplObserver $observer
     * @param string $event
     * @return void
     */
	public function attach($observer, $event = "*")
    {
        $this->initEventGroup($event);
        $this->observers[$event][] = $observer;
    }

    /**
     *
     * @param \SplObserver $observer
     * @param string $event
     * @return void
     */
	public function detach($observer, $event = "*")
    {
        foreach ($this->getEventObservers($event) as $key => $s) {
            if ($s === $observer) {
                unset($this->observers[$event][$key]);
            }
        }
    }
    
    /**
     *
     * @param string $event
     * @param mixed $data
     * @return void
     */
	public function notify($event = "*", $data = null)
    {
        foreach ($this->getEventObservers($event) as $observer) {
            $observer->update($this, $event, $data);
        }
    }
}