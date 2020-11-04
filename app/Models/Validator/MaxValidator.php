<?php namespace Vanderbilt\AdvancedImport\App\Models\Validator;


class MaxValidator implements ValidatorInterface
{
    
    public function __construct($max)
    {
        $this->max = $max;
    }
    
    public function validate($value)
    {
        if(empty($value)) return true;
        if(!is_numeric($value)) throw new \Exception("Invalid number provided: '{$value}'", 1);
        if(!is_numeric($this->max)) throw new \Exception("Invalid maximum number provided: '{$this->max}'", 1);
        if($value <= $this->max) return true;
        else throw new \Exception("The provided value '{$value}' must be smaller than '{$this->max}'", 1);
    }
}