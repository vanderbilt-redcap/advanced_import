<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Vanderbilt\AdvancedImport\App\Helpers\ArrayBox;
use Vanderbilt\AdvancedImport\App\Models\Parser\AbstractParser;
use Vanderbilt\AdvancedImport\App\Models\Parser\CheckBoxParser;
use Vanderbilt\AdvancedImport\App\Models\Parser\DateTimeParser;
use Vanderbilt\AdvancedImport\App\Models\Parser\PhoneParser;
use Vanderbilt\AdvancedImport\App\Traits\CanGetProjectData;
use Vanderbilt\AdvancedImport\App\Models\Validator\DateTimeValidator;

class ParserFactory
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

    private $project;

    private $parsing_settings;

    public function __construct($project, $parsing_settings)
    {
        $this->project = $project;
        $this->parsing_settings = $parsing_settings;
    }

    /**
     * Undocumented function
     *
     * @param string $field_name
     * @return AbstractParser
     */
    public function create($field_name)
    {
        $parsers = [];
        $field_metadata = $this->getFieldMetadata($this->project, $field_name);

        // check validation type
        $validation_type = $field_metadata['element_validation_type'];
        $element_type = $field_metadata['element_type'];

        // check type
        $checkElementType = function($element_type) use(&$parsers){
            switch ($element_type) {
                case 'checkbox':
                    $parsers[] = new CheckBoxParser();
                    break;
                default:
                    # code...
                    break;
            }
        };

        // check validation
        $checkValidationType = function($validation_type) use (&$parsers) {
            if(array_key_exists($validation_type, DateTimeValidator::FORMATS)) {
                $from_format = @$this->parsing_settings['dates_format'] ?: '';
                $parsers[] = new DateTimeParser($from_format, $validation_type);
    
            }else {
    
                switch ($validation_type) {
                    case 'phone':
                        $parsers[] = new PhoneParser();
                        break;
                    default:
                    break;
                }
            }
        };
        $checkElementType($element_type);
        $checkValidationType($validation_type);

        return $parsers;
    }

    /**
     * Undocumented function
     *
     * @param int $project_id
     * @return true|array array of errors if not valid
     */
    function getParsingErrors($data)
    {   
        $getParsingErrors = function($redcap_key, &$value) {
            $errors = [];
            $parsers = $this->create($redcap_key);
            foreach ($parsers as $parser) {
                try {
                    $parser->parse($value);
                } catch (\Exception $e) {
                    $errors[] = $e->getMessage();
                }
            }
            if(empty($errors)) return false;
            return $errors;
        };

        $errors = [];
        foreach ($data as $key => $value) {
            if($key_errors = $getParsingErrors($key, $value)) $errors[$key] = $key_errors;
        }

        if(empty($errors)) return false;
        return $errors;
    }
}