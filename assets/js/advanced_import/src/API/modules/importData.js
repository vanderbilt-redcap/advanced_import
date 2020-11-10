// import {objectToUrlSearchParams} from '../Utils'

export default {
    actions: {
        /**
         * parse a file and get info about it:
         * checks if valid and get column names
         * 
         * @param {File} file 
         * @param {object} settings 
         */
        parse(text, settings) {
            const form_data = new FormData()
            form_data.append('text', text)
            form_data.append('settings', JSON.stringify (settings))

            var params = {
                route: `parse`,
            }
            return this.api_client.post('',form_data, {
                params,
            })
        },

        /**
         * parse a file and get info about it:
         * checks if valid and get column names
         * 
         * @param {File} file 
         * @param {object} settings 
         */
        sendCSV(file, settings) {
            const form_data = new FormData()
            form_data.append('file', file)
            form_data.append('settings', JSON.stringify (settings))

            var params = {
                route: `import`,
            }
            return this.api_client.post('',form_data, {
                params,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        },

        /**
         * parse a file and get info about it:
         * checks if valid and get column names
         * 
         * @param {File} file 
         * @param {object} settings 
         */
        processCSV(file_name, settings) {
            const form_data = new FormData()
            form_data.append('file_name', file_name)
            form_data.append('settings', JSON.stringify (settings))

            var params = {
                route: `process`,
            }
            return this.api_client.post('',form_data, {
                params,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        },
        
    }
}