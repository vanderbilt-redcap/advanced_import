<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Files;
use Vanderbilt\AdvancedImport\App\Models\ChunkUploader\UploadInterface;
use Vanderbilt\AdvancedImport\App\Models\ChunkUploader\UploadProgressMetadata;

/**
 * decorator for the chunk uploader
 */
class EdocsUploader implements UploadInterface
{
    private $uploader;
    
    public function __construct(UploadInterface $uploader)
    {
        $this->uploader = $uploader;       
    }

    /**
     * upload a file and move it to the edocs folder on complete.
     * also replace the unique name with the edoc ID
     *
     * @param string $name
     * @param int $size
     * @param string $data
     * @param string $unique_name
     * @return UploadProgressMetadata
     */
    public function upload($name, $size, $data, $unique_name=null) {
        $metadata = $this->uploader->upload($name, $size, $data, $unique_name);
        $progress = $metadata->getProgress();
        if($progress===1) {
            $edoc_id = $this->moveFileToEdocs($metadata->path);
            $metadata->unique_name = $edoc_id;
        }
        return $metadata;
    }

    /**
     * move the uploaded file to the edocs folder
     *
     * @param string $file_path
     * @return int edocID
     */
    public function moveFileToEdocs($file_path) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file_path);
        clearstatcache(true, $file_path); // needed to get real value using filesize after file_put_contents FILE_APPEND
        $size = filesize($file_path);

        $fileParams = [
            'name' => basename($file_path),
            'type' => $mimeType,
            'tmp_name' => $file_path,
            'error',
            'size' => $size,
        ];
        $edoc = Files::uploadFile($fileParams);
        return $edoc;
    }

}