<?php namespace Vanderbilt\AdvancedImport\App\Models\ChunkUploader;


interface UploadInterface
{
    /**
     *
     * @param string $name
     * @param int $size
     * @param string $data
     * @param string $unique_name
     * @return UploadProgressMetadata
     */
    public function upload($name, $size, $data, $unique_name=null);
}