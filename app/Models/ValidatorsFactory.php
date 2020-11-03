<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Vanderbilt\AdvancedImport\App\Traits\CanGetProjectData;
use Vanderbilt\AdvancedImport\App\Models\Validator\RequiredValidator;
use Vanderbilt\AdvancedImport\App\Models\Validator\MinValidator;
use Vanderbilt\AdvancedImport\App\Models\Validator\MaxValidator;
use Vanderbilt\AdvancedImport\App\Models\Validator\DateTimeValidator;
use Vanderbilt\AdvancedImport\App\Models\Validator\EmailValidator;
use Vanderbilt\AdvancedImport\App\Models\Validator\IntegerValidator;
use Vanderbilt\AdvancedImport\App\Models\Validator\NumberValidator;
use Vanderbilt\AdvancedImport\App\Models\Validator\PhoneValidator;
use Vanderbilt\AdvancedImport\App\Models\Validator\ZipCodeValidator;

class ValidatorsFactory
{
    use CanGetProjectData;
    /* 
    field_units:null
    element_preceding_header:null
    element_type:"text"
    element_label:"Start date"
    element_enum:null
    element_note:null
    element_validation_type:"datetime_ymd"
    element_validation_min:null
    element_validation_max:null
    element_validation_checktype:"soft_typed"
    branching_logic:null
    field_req:"0"
    edoc_id:null
    edoc_display_img:"0"
    custom_alignment:null
    stop_actions:null
    question_num:null
    grid_name:null
    grid_rank:"0"
    misc:null
    video_url:null
    video_display_inline:"0" */

    private $project_id;
    private $project_metadata;

    public function __construct($project_id)
    {
        $this->project_id = $project_id;
    }

    public function create($field_name)
    {
        $validators = [];
        $field_metadata = $this->getFieldMetadata($this->project_id, $field_name);
        // check if required
        $required = boolval($field_metadata['field_req']);

        if($required) $validators[] = new RequiredValidator();

        // check min and max
        $min = is_numeric($field_metadata['element_validation_min']) ? $field_metadata['element_validation_min'] : false;
        if($min) $validators[] = new MinValidator($min);
        $max = is_numeric($field_metadata['element_validation_max']) ? $field_metadata['element_validation_max'] : false;
        if($max) $validators[] = new MaxValidator($max);

        // check validation type
        $validation_type = $field_metadata['element_validation_type'];
        if(array_key_exists($validation_type, DateTimeValidator::FORMATS)) {
            $validators[] = new DateTimeValidator($validation_type);
        }else {

            switch ($validation_type) {
                case 'email':
                    $validators[] = new EmailValidator();
                break;
                case 'integer':
                    $validators[] = new IntegerValidator();
                break;
                case 'number':
                    $validators[] = new NumberValidator();
                break;
                case 'phone':
                    $validators[] = new PhoneValidator();
                break;
                case 'zipcode':
                    $validators[] = new ZipCodeValidator();
                break;
                default:
                break;
            }
        }
        return $validators;
    }

    /**
     * Undocumented function
     *
     * @param int $project_id
     * @return true|array array of errors if not valid
     */
    function getValidationErrors($data)
    {
        
        $getValidationErrors = function($redcap_key, $value) {
            $errors = [];
            $validators = $this->create($redcap_key);
            foreach ($validators as $validator) {
                try {
                    $validator->validate($value);
                } catch (\Exception $e) {
                    $errors[] = $e->getMessage();
                }
            }
            if(empty($errors)) return false;
            return $errors;
        };

        $errors = [];
        foreach ($data as $key => $value) {
            if($key_errors = $getValidationErrors($key, $value)) $errors[$key] = $key_errors;
        }

        if(empty($errors)) return false;
        return $errors;
    }
}