<?php namespace Vanderbilt\AdvancedImport\App\Traits;



trait CanLog {
    
    public function log($message, $data=[])
    {
        $data['message'] = $message;
        $this->notify('log', $data);
    }
}