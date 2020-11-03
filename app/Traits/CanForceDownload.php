<?php namespace Vanderbilt\AdvancedImport\App\Traits;

trait CanForceDownload {
	/**
	 * force the download of a file
	 *
	 * @param string $file_name
	 * @param string $data
	 * @return void
	 */
	function forceDownload($file_name, $data)
	{
		$quoted = sprintf('"%s"', addcslashes(basename($file_name), '"\\'));
		$size = strlen($data);

		header('Content-Description: File Transfer');
		header('Content-Type: application/octet-stream');
		header('Content-Disposition: attachment; filename=' . $quoted); 
		header('Content-Transfer-Encoding: binary');
		header('Connection: Keep-Alive');
		header('Expires: 0');
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Pragma: public');
		header('Content-Length: ' . $size);
		echo $data;
		exit(0);
	}
}