<?php namespace Vanderbilt\AdvancedImport\App\Models\Validator;

class RequiredValidator implements ValidatorInterface
{
    
    public function validate($value)
    {
        if(empty($value)) throw new \Exception("This value is required", 1);
        else return true;
    }
}