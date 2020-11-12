<?php namespace Vanderbilt\AdvancedImport\App\Models\Validator;

use Vanderbilt\AdvancedImport\App\Models\DateTimeFormat;

class BooleanValidator implements ValidatorInterface
{


    public function validate($value)
    {
        $valid = preg_match('/^(1|0)$/', $value);
        if(!$valid) throw new \Exception("The value '{$value}' is not a valid boolean value. Only '0' or '1' are accepted.", 1);
        return true;
    }
}