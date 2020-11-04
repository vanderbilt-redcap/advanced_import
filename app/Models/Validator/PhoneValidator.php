<?php namespace Vanderbilt\AdvancedImport\App\Models\Validator;

use Vanderbilt\AdvancedImport\App\Models\Validator\Traits\CanValidateRegExp;

class PhoneValidator implements ValidatorInterface
{
    use CanValidateRegExp;

    const REGEXP_LIST = [
        'us' => self::REGEXP_US,
    ];

    const REGEXP_US = "/^(?:\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4}))?$/";

    public function __construct($format='us')
    {
        if(!array_key_exists($format, self::REGEXP_LIST)) throw new \Exception("Invalid format provided: '{$format}'", 1);
        $this->regexp = self::REGEXP_LIST[$format];
    }
}