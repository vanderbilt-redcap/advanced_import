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
        console.log(blob)
        const text = await this.reader.readAsTextAsync(blob)
        this.position = end
        return text
    }

    async getLines(file, total_lines=10) {
        const initial_position = this.position // save and restore when done
        try {
            const new_line_regexp = new RegExp("(.+?\\r?\\n?)$","gm")
            let text = ''
            this.position = 0
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
        }finally {
            console.log('restoring position')
            this.position = initial_position
        }
        

    }


}