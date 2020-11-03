<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

/**
 * functor class
 */
 class FunctionalHelper
 {
    public function pipe()
    {
        $functions = func_get_args();
        return function($x) use($functions) {
            return array_reduce($functions, function($accumulator, $function) {
                return $function($accumulator);
            }, $x);
        };
    }
 }