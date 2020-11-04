<?php namespace Vanderbilt\AdvancedImport\App\Models\Validator;

class MinValidator implements ValidatorInterface
{
    
    public function __construct($min)
    {
        $this->min = $min;
    }
    
    public function validate($value)
    {
        if(empty($value)) return true;
        if(!is_numeric($value)) throw new \Exception("Invalid number provided: '{$value}'", 1);
        if(!is_numeric($this->min)) throw new \Exception("Invalid minimum number provided: '{$this->min}'", 1);
        if($value >= $this->min) return true;
        else throw new \Exception("The provided value '{$value}' must be bigger than '{$this->min}'", 1);
    }
}