<?php namespace Vanderbilt\AdvancedImport\App\Models;

class ChunkUploader
{
    private $upload_dir;

    public function __construct($upload_dir=null)
    {
        $this->upload_dir = $upload_dir ?: sys_get_temp_dir();
    }

    public function upload($params)
    {
        // check sent file size against local file
        $checkFileSize = function($file_path) use($params) {
            $sent_file_size = @$params['size'] ?: 0;
            $file_size = filesize($file_path); //37067676
            return $file_size-$sent_file_size;
            // return $sent_file_size <=> $file_size; //spaceship operators return -1,0 or 1 (only PHP 7)
        };
        $removeExtraSlashes = function($str) {
            return preg_replace('#/+#','/',$str);
        };

        $file_name = $params['name'];
        $file_data = $params['chunk'];
        $file_path = $removeExtraSlashes($this->upload_dir .DIRECTORY_SEPARATOR. $file_name);
        // check sent file size against local file
        if($checkFileSize($file_path)>=0) {
            throw new \Exception("Error the file on the server is bigger than the one sent", 1);
        }
        
        $file_data = $this->decode_chunk( $file_data );
        
        if ( false === $file_data ) {
            throw new \Exception("No file data", 1);
        }

        return file_put_contents( $file_path, $file_data, FILE_APPEND );
    }

    /**
     * decode a chunk of base64 data
     *
     * @param string $data
     * @return string
     */
    public function decode_chunk($data) {
        $data = explode(';base64,', $data);
        
        if ( ! is_array( $data ) || ! isset( $data[1] ) ) return false;
        
        $data = base64_decode( $data[1] );
        if ( !$data ) return false;
        
        return $data;
    }

    public static function printJSON($response, $status_code=200)
	{
		http_response_code($status_code); // set the status header
		header('Content-Type: application/json');
		print json_encode( $response );
		exit;
	}
}