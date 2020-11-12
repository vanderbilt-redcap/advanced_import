<?php namespace Vanderbilt\AdvancedImport\App\Models\Validator;

use Vanderbilt\AdvancedImport\App\Models\Validator\Traits\CanValidateRegExp;

class CheckBoxValidator implements ValidatorInterface
{
    use CanValidateRegExp;

    /**
     * letters, numbers, and underscores
     */
    const REGEXP = '/[\d\w\-]*/i';

    public function __construct()
    {
        $this->regexp = self::REGEXP;
    }

    public function validate($value)
    {
        if(!is_array([$value])) $value = [$value];
        foreach ($value as $item) {
            $valid = preg_match($this->regexp, $item);
            if($valid===false) throw new \Exception("Error Processing the regular expression: {$this->format}", 1);
            if($valid===0) throw new \Exception("The format is not valid for the value '{$value}'", 1);
        }
        return true;
    }
    
}