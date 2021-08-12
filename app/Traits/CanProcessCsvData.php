<?php namespace Vanderbilt\AdvancedImport\App\Traits;

use Vanderbilt\AdvancedImport\App\Models\ParserFactory;
use Vanderbilt\AdvancedImport\App\Models\ValidatorsFactory;

trait CanProcessCsvData
{
    /**
     * curried function that returns the parse function
     * preloaded with the parsers factory
     * 
     * parse and transform the data if a parser is defined for a field
     * 
     *
     * @param ParsersFactory $parsersFactory
     * @return mixed
     */
    public function applyParsers($project, $parsing_settings, $value, $key, $collection=[]) {
        $parsers_factory = new ParserFactory($project, $parsing_settings);

        $errors = [];
        $parsers = $parsers_factory->create($key);
        foreach($parsers as $parser) {
            try {
                $value = $parser->parse($value);
            } catch (\Exception $e) {
                $errors[] = $e->getMessage();
            }
        }
        if(empty($errors)) return $value;
        else {
            $message = "parsing errors for key '{$key}', value '{$value}':\n";
            $message .= implode("\n", $errors);
            throw new \Exception($message, 400);
        }
    }

    /**
     * curried function that returns the validate function
     * preloaded with the validators factory
     *
     * @param ValidatorsFactory $validators_factory
     * @return mixed
     */
    public function applyValidations($project, $value, $key, $collection=[]) {
        $validators_factory = new ValidatorsFactory($project);

        $errors = [];
        $validators = $validators_factory->create($key);
        foreach($validators as $validator) {
            try {
                $validator->validate($value);
            } catch (\Exception $e) {
                $errors[] = $e->getMessage();
            }
        }
        if(empty($errors)) return $value;
        else {
            $message = "validation errors for key '{$key}', value '{$value}':\n";
            $message .= implode("\n", $errors);
            throw new \Exception($message, 400);
        }
    }

    /**
     * filter data from CSV which is not mapped.
     * since each mapping is redcapField => [CSV indexes]
     * all indexes are merged recursively into a single array
     * 
     * @param array $mapping
     * @param mixed $value
     * @param mixed $index
     * @return bool
     */
    public function filterMappedColumns($mapping, $value, $index, $collection=[])
    {
        foreach ($mapping as $redcapField => $csvIndexes) {
            $exists = in_array($index, $csvIndexes);
            if($exists) return true;
        }
        return false;
    }

    /**
     * assign the mapped REDCap field 
     * 
     * @param array $mapping
     * @param mixed $value
     * @param mixed $index
     * 
     * @return array
     */
    public function assignColumnNames($mapping, $value, $index, $collection=[])
    {
        return @$mapping[$value];
    }
}