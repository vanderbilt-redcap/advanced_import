<?php namespace Vanderbilt\AdvancedImport\App\Models\Validator\Traits;

trait CanValidateRegExp
{

    protected $regexp;
    protected $format;

    public function validate($value)
    {
        $valid = preg_match($this->regexp, $value);
        if($valid===false) throw new \Exception("Error Processing the regular expression: {$this->format}", 1);
        if($valid===0) throw new \Exception("The format is not valid for the value '{$value}'", 1);
        return boolval($valid);
    }
}