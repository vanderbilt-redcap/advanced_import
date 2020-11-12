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
    public function applyParsers($project_id, $parsing_settings, $value, $key, $collection=[]) {
        $parsers_factory = new ParserFactory($project_id, $parsing_settings);

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
    public function applyValidations($project_id, $value, $key, $collection=[]) {
        $validators_factory = new ValidatorsFactory($project_id);

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
     * filter data from CSV which is not mapped
     * @param array $mapping
     * @param mixed $value
     * @param mixed $index
     * @return bool
     */
    public function filterMappedColumns($mapping, $value, $index, $collection=[])
    {
        $in_array = in_array($index, $mapping);
        return $in_array;
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
        return array_search($value, $mapping);
    }
}