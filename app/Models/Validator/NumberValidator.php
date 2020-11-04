<?php namespace Vanderbilt\AdvancedImport\App\Models\Validator;

use Vanderbilt\AdvancedImport\App\Models\Validator\Traits\CanValidateRegExp;

class NumberValidator implements ValidatorInterface
{
    use CanValidateRegExp;
    
    const REGEXP = '/^(?:(0|[1-9]+)\.?\d*)?$/';

    public function __construct()
    {
        $this->regexp = self::REGEXP;
    }
    
}