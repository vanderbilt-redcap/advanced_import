<?php namespace Vanderbilt\AdvancedImport\App\Models\Validator;

use Vanderbilt\AdvancedImport\App\Models\Validator\Traits\CanValidateRegExp;

class MultipleChoiceValidator implements ValidatorInterface
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
    
}