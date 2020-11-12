<?php namespace Vanderbilt\AdvancedImport\App\Models;

class ChunkUploader
{
    private $upload_dir;

    public function __construct($upload_dir=null)
    {
        $this->setUploadDirectory($upload_dir);
    }

    /**
     * set the upload directory path:
     * - remove extra slashes
     * - remove final slash
     *
     * @param string $path
     * @return void
     */
    private function setUploadDirectory($path)
    {
        $normalizePath = function($str) {
            $str = preg_replace('#/+#','/',$str); //remove extra slashes
            $str = preg_replace('#(.*)/?$#', '$1', $str); // no slash at the end
            return $str;
        };
        
        $this->upload_dir = $normalizePath($path ?: sys_get_temp_dir());
        if(!file_exists($this->upload_dir)) mkdir($this->upload_dir, 0777, $recursive=true);
    }

    /**
     * upload a chunk of data
     * use 'data' to send the chunk or REDCap will save
     * it in the logs!
     * @see REDCap/Classes/Logging.php
     *
     * @param array $params
     * @return array
     */
    public function upload($params)
    {
        /**
         * check sent file size against local file
         * and throw exception if trying to upload too much data
         */
        $checkFileSize = function($file_path, $file_size) {
            $uploaded_file_size = filesize($file_path) ?: 0; //37067676
            $remaining_data_to_upload = $file_size-$uploaded_file_size;
            if($remaining_data_to_upload<=0)
                throw new \Exception("Error: trying to upload more data than expected: {$uploaded_file_size}/{$file_size} bytes have been uploaded.", 1);
        };
        
        $file_size = intval(@$params['size'] ?: 0);
        // use the unique name if availabvle as parameter, otherwise create one
        $unique_name = @$params['unique_name'] ?: $this->getUniqueName($params['name']);
        $file_path = "{$this->upload_dir}/{$unique_name}";
        
        // check sent file size against local file
        $checkFileSize($file_path, $file_size);
        
        $data_chunk = @$params['data'];
        $file_data = $this->decode_chunk($data_chunk);
        
        if ( false === $file_data ) {
            throw new \Exception("No file data", 400);
        }

        $written_bytes = file_put_contents( $file_path, $file_data, FILE_APPEND );
        $uploaded_bytes = filesize($file_path);
        return compact('written_bytes', 'uploaded_bytes', 'file_size', 'unique_name');
    }

    /**
     * check for existing files and create a unique name for the file
     *
     * @param string $filename
     * @return string
     */
    private function getUniqueName($filename) {
        $getHashedName = function($filename, $salt='') {
            $path_parts = pathinfo($filename);
            $extension = $path_parts['extension'];
            $name = md5($path_parts['filename'].$salt);
            return "{$name}.{$extension}";
        };

        $hashed_name = $getHashedName($filename);
        $counter = 0;
        $file_path = "{$this->upload_dir}/{$hashed_name}";
        while(file_exists($file_path)) {
            $hashed_name = $getHashedName($file_path, $counter++);
            $file_path = "{$this->upload_dir}/{$hashed_name}";
        }
        return $hashed_name;
    }

    /**
     * decode a chunk of base64 data
     *
     * @param string $data
     * @return string
     */
    public function decode_chunk($data) {
        $data = explode(';base64,', $data); //strip the initial base64 signature
        
        if ( ! is_array( $data ) || ! isset( $data[1] ) ) return false;
        
        $data = base64_decode( $data[1] );
        if ( !$data ) return false;
        
        return $data;
    }

}