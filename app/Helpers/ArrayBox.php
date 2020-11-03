<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

/**
 * functor class
 * Example usage:
 * print ArrayBox::form($arr)
 *  ->map("square")
 *  ->filter("isOdd")
 *  ->reduce("add", 0)();
 */
 class ArrayBox
 {
    /**
     *
     * @var array
     */
    private $value;

    /**
     *
     * @param array $value
     */
    private function __construct($value)
    {
        $this->value = $value;
    }

    /**
     * create a box that contains an array
     *
     * @param array $value
     * @return ArrayBox
     */
    public static function from($value)
    {
        return new static($value);
    }

    /**
     * create a box that boxes an element in an array
     *
     * @param mixed $value
     * @return ArrayBox
     */
    public static function of($value)
    {
        return static::from([$value]);
    }

    /**
     * apply a function to the current value
     * and return a new box
     * example:
     * 
     * $add2 = function($a) {
     *  return $a+2;
     * };
     * $times2 = function($a) {
     *  return $a*2;
     * };
     * 
     * print Box::of(2)->map($add2)->map($times2)();
     *
     * @param callable $function
     * @return Box
     */
    public function map_deprecated($function)
    {
        $array = [];
        foreach ($this->value as $key => $value) {
            $result = $function($value, $key);
            if(!is_array($result)) return static::from(null);
            list($value, $key) = $result;
            $array[$key] = $value;
        }
        return static::from($array);
        // return static::from(array_map($function, $this->value, array_keys($this->value)));
    }

    public function map($function)
    {
        $array = [];
        foreach ($this->value as $key => $value) {
            $array[$key] = $function($value, $key, $this->value);
        }
        return static::from($array);
    }

    /**
     * apply a function to keys of one array
     *
     * @param callable $function
     * @return ArrayBox
     */
    public function mapKeys($function)
    {
        $keys_box = static::from(array_keys($this->value));
        $keys = $keys_box->map($function)();
        $combined = array_combine( $keys, $this->value );
        return static::from($combined);
    }

    public function filter($function)
    {
        $array = [];
        foreach ($this->value as $key => $value) {
            if($function($value, $key, $this->value)) {
                $array[$key] = $value;
            }
        }
        return static::from($array);
        // return static::from(array_filter($this->value, $function, ARRAY_FILTER_USE_BOTH));
    }

    public function reduce($function, $seed)
    {
        return static::from(array_reduce($this->value, $function, $seed));
    }

    public function reduceAssociative($function, $seed)
    {
        $array = $this->value;
        $keys = array_keys($array);
        return static::from(array_reduce($keys, function($seed, $key) use($function, $array){
            $value = $array[$key];
            return $function($seed, $value, $key);
        }, $seed));
    }

    public function __invoke()
    {
        return $this->value;
    }
 }