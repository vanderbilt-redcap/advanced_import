<?php namespace Vanderbilt\AdvancedImport\App\Models\Validator;

use Vanderbilt\AdvancedImport\App\Models\Validator\Traits\CanValidateRegExp;

class PhoneValidator implements ValidatorInterface
{
    use CanValidateRegExp;

    const REGEXP_LIST = [
        'us' => self::REGEXP_US,
    ];

    const REGEXP_US = '/^(?:\(?(?P<area_code>[0-9]{3})\)?[-. ]?(?P<prefix>[0-9]{3})[-. ]?(?P<line_number>[0-9]{4}))?$/';
    const REGEXP_AUSTRALIA = '/^(?P<area_code>\(0[2-8]\)|0[2-8])\s*(?P<prefix>\d{4})\s*\(?P<line_number>d{4})$/';


    public function __construct($format='us')
    {
        $redcap_validations = getValTypes();
        $regexp = $redcap_validations['phone']['regex_php'] ?? null;
        $this->regexp = $regexp;
    }
}