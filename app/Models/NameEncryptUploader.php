<?php namespace Vanderbilt\AdvancedImport\App\Models;

use Vanderbilt\AdvancedImport\App\Models\ChunkUploader\UploadInterface;
use Vanderbilt\AdvancedImport\App\Models\ChunkUploader\UploadProgressMetadata;

/**
 * decorator for the chunk uploader
 */
class NameEncryptUploader implements UploadInterface
{
    private $uploader;
    
    public function __construct(UploadInterface $uploader)
    {
        $this->uploader = $uploader;       
    }

    /**
     * upload a file and encrypt its unique name when the process is complete.
     * the encrypted unique name is presented to the frontend and also save in the database.
     * the module will decrypt the name before using it
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
            $encryptedName = encrypt($metadata->unique_name);
            $metadata->unique_name = $encryptedName;
        }
        return $metadata;
    }

}