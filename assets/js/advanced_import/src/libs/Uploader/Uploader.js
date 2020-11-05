import axios from 'axios'
import CanTriggerEvents from './CanTriggerEvents'

export default class Uploader {
    chunk_size = 1000 * 1024
    upload_url

    defaultUploadCallback(form_data) {
        return axios.post(this.upload_url,form_data, {
            headers: {
                'Content-Type': 'multipart/form-data', // works without as well
            },
        })
    }

    constructor({chunk_size, upload_callback}) {
        if(chunk_size) this.chunk_size = chunk_size
        if(upload_callback) this.upload_callback = upload_callback
        else {
            this.upload_callback = this.defaultUploadCallback
        }
        // add event triggering capabilities
        Object.assign(this, CanTriggerEvents(this))
    }

    setUploadCallback(callback) {
        this.upload_callback = callback
    }

    upload(file, start=0) {
        let end = start + this.chunk_size + 1
        if(end>file.size) end = file.size // limit max to file size
        const blob = file.slice( start, end )

        const onChunkRead = (file, end) => async (event) => {
            try {
                if ( event.target.readyState !== FileReader.DONE ) return // exit
                const chunk = event.target.result

                const response = await this.sendChunk(file, chunk)
                const {data} = response
                if(!data) throw new Error('no response') //exit if no response data
                const progress = this.calculateProgress(file, end)
                this.trigger('progress', {file, progress, response}) // notify advancement

                if(end < file.size) {
                    return this.upload(file, end) // recursive call
                }
                else {
                    // exit if we are done
                    return this.trigger('completed', {file, progress, response}) // notify completed
                }
            } catch (error) {
                console.log(error)
                return this.trigger('error', {file, error}) // notify error
            }
        }

        const file_reader = new FileReader()
        file_reader.onloadend = onChunkRead(file, end)

        file_reader.readAsDataURL( blob ) // this triggers the ajax upload when done
    }

    calculateProgress(file, position) {
        return Math.floor( ( position / file.size ) * 100 )
    }

    /**
     * notify the progress
     * @param {File} file 
     * @param {int} position position where the file has been read so far
     * @param {object} response 
     */
    /* notify(file, position, response) {
        var percent_done = Math.floor( ( position / file.size ) * 100 )
        console.log(percent_done, response)
    } */

    /**
     * send a chunk of file
     * @param {File} file 
     * @param {string} chunk 
     */
    sendChunk(file, chunk) {
        console.log(file)
        const form_data = new FormData()

        const file_keys = ['name', 'lastModified', 'lastModifiedDate', 'size', 'type']
        file_keys.forEach(key => {
            form_data.append(key, file[key]) 
        })
        form_data.append('chunk', chunk)

        if(typeof this.upload_callback==='function') {
            return this.upload_callback(form_data)
        }
    }
}