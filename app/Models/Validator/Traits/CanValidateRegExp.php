<?php namespace Vanderbilt\AdvancedImport\App\Models\Validator\Traits;

trait CanValidateRegExp
{
    public function validate($value)
    {
        $valid = preg_match($this->format, $value);
        if($valid===false) throw new \Exception("Error Processing the regular expression: {$this->format}", 1);
        if(!$valid) throw new \Exception("The format is not valid for the value '{$value}'", 1);
        return boolval($valid);
    }
}