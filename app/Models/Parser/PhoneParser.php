<?php namespace Vanderbilt\AdvancedImport\App\Models\Parser;

use Vanderbilt\AdvancedImport\App\Models\DateTimeFormat;
use Vanderbilt\AdvancedImport\App\Models\Validator\PhoneValidator;

class PhoneParser extends AbstractParser
{

    const REGEXP_US = '/^(?:\(?(?P<area_code>[0-9]{3})\)?[-. ]?(?P<prefix>[0-9]{3})[-. ]?(?P<line_number>[0-9]{4}))?$/';
    const REGEXP_AUSTRALIA = '/^(?P<area_code>\(0[2-8]\)|0[2-8])\s*(?P<prefix>\d{4})\s*\(?P<line_number>d{4})$/';

    const REGEXP_LIST = [
        'us' => self::REGEXP_US,
        'australia' => self::REGEXP_AUSTRALIA,
    ];
    /**
     *
     * @param string $from format as found in the CSV file
     * @param string $validation_format format expected by the REDCap field
     */
    public function __construct($format='us')
    {
        $this->format = $format;
        $this->regexp = @self::REGEXP_LIST['us'];
    }

    private function getPhoneNumber($area_code, $prefix, $line_number)
    {
        $phone_as_string = '';
        switch ($this->format) {
            case 'australia':
            case 'us':
                $phone_as_string = "({$area_code}) {$prefix}-{$line_number}";
            default:
                # code...
                break;
        }
        return $phone_as_string;
    }

    /**
     * return the value converted to phone number
     *
     * @return array
     * @throws \Exception
     */
    public function parse($value)
    {
        $valid = preg_match($this->regexp, $value, $matches);
        if($valid===false) throw new \Exception("Error Processing the regular expression: {$this->format}", 1);
        if($valid===0) throw new \Exception("The format is not valid for the value '{$value}'", 1);
        $area_code = @$matches['area_code'];
        $prefix = @$matches['prefix'];
        $line_number = @$matches['line_number'];
        $phone_number = $this->getPhoneNumber($area_code, $prefix, $line_number);
        return $phone_number;
    }
}