<?php namespace Vanderbilt\AdvancedImport\App\Models\Parser;

interface ParserInterface
{
    public function parse($value);
}