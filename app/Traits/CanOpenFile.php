<?php namespace Vanderbilt\AdvancedImport\App\Traits;

use SplFileObject;

trait CanOpenFile {

	private $file;
	/**
	 * Undocumented function
	 *
	 * @param string $file_path
	 * @param string $open_mode @see https://www.php.net/manual/en/function.fopen.php
	 * @return SplFileObject
	 */
	public function openFile($file_path, $open_mode='r')
	{
		$file = new SplFileObject($file_path, $open_mode);
		$this->file = $file;
		return $file;
	}

	function __destruct()
	{
		$this->file = null;
	}
}