<?php namespace Vanderbilt\AdvancedImport\App\Models\ChunkUploader;

use ExternalModules\ExternalModules;
use Vanderbilt\AdvancedImport\App\Traits\Observer\SubjectTrait;

class ChunkUploader implements UploadInterface
{

    use SubjectTrait;

    const NOTIFICATION_ERROR = 'ChunkUploader:error';
    const NOTIFICATION_COMPLETED = 'ChunkUploader:completed';
    const NOTIFICATION_PROGRESS = 'ChunkUploader:progress';

    private $upload_dir;
    private $temp_dir;
    /**
     * extension used for the file while uploading
w     */
    const UPLOAD_PROGRESS_EXTENSION = 'upload';

    public function __construct($upload_dir)
    {
        $this->upload_dir = $this->setupDirectory($upload_dir);
    }

    /**
     * setup a directory:
     * - remove extra slashes
     * - remove final slash
     * - set permissions
     *
     * @param string $path
     * @return string normalized path
     */
    private function setupDirectory($path)
    {
        $normalizePath = function($str) {
            $str = preg_replace('#/+#','/',$str); //remove extra slashes
            $str = preg_replace('#(.*?)/?$#', '$1', $str); // no slash at the end
            return $str;
        };
        
        $dir_path = $normalizePath($path ?: sys_get_temp_dir());
        if(!file_exists($dir_path)) mkdir($dir_path, 0777, $recursive=true);
        return realpath($dir_path);
    }

    public static function generateRandomString($length = 10) {
        return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
    }

    /**
     * upload a chunk of data
     * use 'data' to send the chunk or REDCap will save
     * it in the logs!
     * 
     * @see REDCap/Classes/Logging.php
     *
     * @param string $name
     * @param int $size
     * @param string $data
     * @param string $unique_name
     * @return UploadProgressMetadata
     */
    public function upload($name, $size, $data, $unique_name=null)
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

        $getDecodedUniqueName = function($unique_name, $name) {
            if(!isset($unique_name)) {
                $unique_name = $this->getUniqueName($name, self::UPLOAD_PROGRESS_EXTENSION);
            }
            return htmlspecialchars($unique_name);
        };
        
        $file_size = intval($size ?: 0);

        // use the unique name if availabvle as parameter, otherwise create one
        $unique_name = $getDecodedUniqueName($unique_name, $name);
        $upload_path = "{$this->upload_dir}/{$unique_name}";
        
        // check sent file size against local file
        $checkFileSize($upload_path, $file_size);
        
        $file_data = $this->decode_chunk($data);
        if ( false === $file_data ) throw new \Exception("No file data", 400);

        $written_bytes = file_put_contents( $upload_path, $file_data, FILE_APPEND );
        clearstatcache(true, $upload_path); // needed to get real value using filesize after file_put_contents FILE_APPEND
        $uploaded_bytes = filesize($upload_path);

        $metadata = new UploadProgressMetadata($name, $unique_name, $file_size, $written_bytes, $uploaded_bytes, $upload_path);
        $progress = $metadata->getProgress();
        if($progress<1) {
            $this->notify(self::NOTIFICATION_PROGRESS, $metadata);
        }else if($progress==1) {
            $this->notify(self::NOTIFICATION_PROGRESS, $metadata); // notify progress anyway
            $final_path = $this->finalizeUpload($upload_path, $name);
            $metadata->unique_name = basename($final_path);
            $metadata->path = $final_path;
            $this->notify(self::NOTIFICATION_COMPLETED, $metadata);
        }else {
            $this->notify(self::NOTIFICATION_ERROR, $metadata);
        }
        return $metadata;
    }

    /**
     * on upload completed, set the correct file extension and
     * change to a different unique name from the one used during upload
     *
     * @param array $metadata
     * @return string the final path of the uploaded file
     */
    public function finalizeUpload($upload_path, $file_name) {
        $destinationName = $this->getUniqueName($file_name);
        $destinationPath = dirname($upload_path). DIRECTORY_SEPARATOR. $destinationName;
        $safe_path = ExternalModules::getSafePath($destinationPath, $root='/');
        rename($upload_path, $safe_path);
        return $safe_path;
    }

    /**
     * check for existing files and create a unique name for the file
     *
     * @param string $filename
     * @param string|false replacement for the file extension. use the original if set to false
     * @return string
     */
    private function getUniqueName($filename, $replaceExtension=false) {
        $getHashedName = function($filename, $salt='') use($replaceExtension) {
            $path_parts = pathinfo($filename);
            $extension = $path_parts['extension'];
            $name = md5($path_parts['filename'].$salt);
            if(is_string($replaceExtension)) return "{$name}.{$replaceExtension}";
            return "{$name}.{$extension}";
        };

        $salt = self::generateRandomString();
        $hashed_name = $getHashedName($filename, $salt);
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