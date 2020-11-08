import FileReaderAsync from './FileReaderAsync'

export default class FileParser {

    chunk_size = 1000*1024
    position = 0

    constructor() {
        this.reader = new FileReaderAsync()

    }

    async read(file, start=null) {
        start = start || this.position
        const end = start + this.chunk_size + 1
        const blob = file.slice( start, end )
        const text = await this.reader.readAsTextAsync(blob)
        this.position = end
        return text
    }

    async getLines(file, total_lines=10, position=0) {
        try {
            const new_line_regexp = new RegExp("^(.+)$","gm")
            let text = ''
            this.position = position
            let lines = []
            const readMore = async () => {
                const text = await this.read(file)
                if(text=='') return false
                return text
            }
            while(lines.length<total_lines+1) {
                let more_text = await readMore()
                if(!more_text) break
                text += more_text
                lines = text.match(new_line_regexp)
                // check with one more line in case we are reading truncated lines
            }
            return lines.slice(0, total_lines)
        } catch (error) {
            console.log('error getting lines', error)
        }
    }

    /**
     * count the lines in a file.
     * also send a cencel function to stop the process if too long.
     * if stopped send the counted lines anyway.
     * @param {*} file 
     */
    countLines(file) {
        // set a callback to stop the promise
        let stop = false
        let cancel = () => stop = true

        const count = async () => {
            let lines
            let counter = 0
            const load = async () => {
                const text = await this.read(file)
                if(text=='') return false
                return text
            }
            /*eslint no-control-regex: "off"*/
            const new_line_regexp = new RegExp("^(.+)$","gm")
            let text
            let truncated // store here any truncated text not parsed with new_line_regexp
            do {
                text = await load()
                if(truncated) text = truncated[0]+text // add previously truncated text if any
                lines = text.match(new_line_regexp)
                let truncated_text_regexp = new RegExp("(.+)(?![\n\r])$","gm") // create a new one on each loop to reset it's position (exec saves the position every time is used)
                truncated = truncated_text_regexp.exec(text) // set new truncated text
                if(truncated) lines.pop() // remove the truncated line
                if(lines) counter +=lines.length
            } while (!stop && lines!=false && this.position<file.size)
            if(stop) {
                console.log(`I'm stopping at ${counter} lines`)
            }
            return counter
        }
        let promise = count()
        promise.cancel = cancel
        return promise
        
    }


}