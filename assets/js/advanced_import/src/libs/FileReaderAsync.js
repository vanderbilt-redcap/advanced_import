export default class FileReaderAsync extends FileReader {
  
  runAsync(callback) {
    return new Promise((resolve, reject) => {
      
      this.onload = () => {
        resolve(this.result)
      }
      
      this.onerror = reject
      
      callback()
    })
  }
  
  readAsTextAsync(file) {
    const callback = () => this.readAsText(file)
    return this.runAsync(callback)
  }
  readAsArrayBufferAsync(file)
  {
    const callback = () => this.readAsArrayBuffer(file)
    return this.runAsync(callback)
  }
  readAsBinaryStringAsync(file)
  {
    const callback = () => this.readAsBinaryString(file)
    return this.runAsync(callback)
  }
  readAsDataURLAsync(file)
  {
    const callback = () => this.readAsDataURL(file)
    return this.runAsync(callback)
  }
}