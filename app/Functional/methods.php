<?php namespace Vanderbilt\AdvancedImport\App\Functional;

/**
 * partial application of arguments to a function
 *
 * @param callable $function the function to which we want to apply part of the arguments
 * @param mixed $... list of arguments to partially apply
 * @return callable
 */
function partial()
{
	$partial_args = func_get_args();
	$function = array_shift($partial_args);
	return function() use($function, $partial_args) {
		$args = array_merge($partial_args, func_get_args());
		return call_user_func_array($function, $args);
	};
}

/**
 * partial application supplying arguments at the right first
 * @param callable $function the function to which we want to apply part of the arguments
 * @param mixed $... list of arguments to partially apply at the end
 * @return callable
 */
function partialRight()
{
	$partial_args = func_get_args();
	$function = array_shift($partial_args);
	return function() use($function, $partial_args) {
		$args = array_merge(func_get_args(), $partial_args);
		return call_user_func_array($function, $args);
	};
}