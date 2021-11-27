<?php namespace Vanderbilt\AdvancedImport\App\Models\ChunkUploader;

use JsonSerializable;

final class UploadProgressMetadata implements JsonSerializable
{

    public $name; // original name of the uploaded file
    public $unique_name; // unique name of the uploaded file
    public $file_size; // file size of the file being uploaded
    public $written_bytes; // bytes written in the current chunk
    public $uploaded_bytes; // total bytes uploaded 
    public $path; // full path of the uploaded file

    public function __construct($name, $unique_name, $file_size, $written_bytes, $uploaded_bytes, $path)
    {
        $this->name = $name;
        $this->unique_name = $unique_name;
        $this->file_size = intval($file_size);
        $this->written_bytes = intval($written_bytes);
        $this->uploaded_bytes = intval($uploaded_bytes);
        $this->path = $path;
    }

    public function getProgress() {
        $progress = ($this->file_size===0) ? 1 : $this->uploaded_bytes/$this->file_size; // intercept divide by 0
        return $progress;
    }

    public function getProgressPercentage() {
        $progress = $this->getProgress();
        $percentage = number_format($progress*100, $decimals = 2);
        return $percentage;
    }

    public function jsonSerialize()
    {
        return [
            'name' => $this->name,
            'unique_name' => $this->unique_name,
            'written_bytes' => $this->written_bytes,
            'uploaded_bytes' => $this->uploaded_bytes,
            'file_size' => $this->file_size,
            // 'path' => $this->path, // complete path is hidden 
            'progress' => $this->getProgress(),
            'percentage' => $this->getProgressPercentage(),
        ];
    }

}