<?php namespace Vanderbilt\AdvancedImport\App\Models\Validator;

use Vanderbilt\AdvancedImport\App\Models\Validator\Traits\CanValidateRegExp;

class NumberValidator implements ValidatorInterface
{
    use CanValidateRegExp;
    
    const REGEXP = '/^([+-])[0-9]+(\.[0-9]+)?$/';

    public function __construct()
    {
        $this->regexp = self::REGEXP;
    }
    
}