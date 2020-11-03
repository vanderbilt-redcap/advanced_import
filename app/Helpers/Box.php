<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

/**
 * functor class
 */
 class Box
 {
    private $value;

    private function __construct($value)
    {
        $this->value = $value;
    }

    /**
     * create a box that contains an element
     *
     * @param mixed $value
     * @return Box
     */
    public static function of($value)
    {
        return new static($value);
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
    public function map($function)
    {
        return static::of($function($this->value));
    }

    public function __invoke()
    {
        return $this->value;
    }
 }