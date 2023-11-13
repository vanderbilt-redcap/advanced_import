<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

use Exception;
use ExternalModules\ExternalModules;

class FileCache
{
  /**
   * use a namespace for better organization
   * of cached data
   *
   * @var string
   */
  private $namespace;

  /**
   * path to the directory
   * where cache files will be stored
   *
   * @var string
   */
  private $cacheDir;

  public function __construct($namespace='', $cacheDir=APP_PATH_TEMP)
  {
    $this->namespace = $namespace;
    // $cacheDir = sys_get_temp_dir();
    $this->setCacheDir($cacheDir);
  }

  /**
   * set the cache directory
   *
   * @param string $path
   * @return void
   * @throws Exception if the directory does not exist
   */
  private function setCacheDir($path) {
    $realPath = realpath($path);
    if(!$realPath) throw new Exception("There was an error setting the cache directory. Please check with your server administrator if {$path} exists", 1);
    $this->cacheDir = $realPath;
  }

  /**
   * get the name and path of the file
   * where the key is stored
   *
   * @param string $key
   * @return string
   */
  private function getFileName($key)
  {
    $filename = sprintf("%s.cache", md5($this->namespace.$key));
    $path = $this->cacheDir.DIRECTORY_SEPARATOR.$filename;
    return $path;
  }

  public function delete($key)
  {
    $filename = $this->getFileName($key);
    unlink($filename);
  }

  /**
   * set a variable
   *
   * @param string $key
   * @param mixed $data
   * @param int $ttl seconds to live (default to 15 minutes)
   * @return void
   */
  function set($key, $data, $ttl=900)
  {
    $filePath = $this->getFileName($key);
    $fileHandle = fopen($filePath,'w');
    if (!$fileHandle) throw new \Exception('Could not write to cache');

    // serialize data and set its lifetime
    $lifespan = time()+$ttl;
    $data = serialize([$lifespan, $data]);
    if (fwrite($fileHandle, $data)===false) throw new \Exception('Could not write to cache');
    touch($filePath, $lifespan); // set the modification time of the file to its lifespan
    fclose($fileHandle);
  }

  /**
   * get a data from the cache.
   * do not return if the value has expired
   *
   * @param string $key
   * @return mixed
   */
  public function get($key)
  {
    $filename = $this->getFileName($key);
    if (!file_exists($filename) || !is_readable($filename)) return false;

    $serializedData = file_get_contents($filename);

    $data = @unserialize($serializedData);
    $ttl = $data[0] ?? 0;
    if (!$data || (time() > $ttl)) {
       $this->delete($key);
       return;
    }
    
    return $data[1] ?? null;
  }

  /**
   * get the system modification time;
   * this could be used instead of storing the time
   * inside the cache
   *
   * @param string $filePath
   * @return int
   */
  private function getSystemFileModificationTime($filePath)
  {
    clearstatcache(true, $filePath);
		$modificatioTime = filemtime($filePath);
    return $modificatioTime;
  }

 }