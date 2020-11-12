// import {objectToUrlSearchParams} from '../Utils'

export default {
    actions: {
        /**
         * parse a file and get info about it:
         * checks if valid and get column names
         * the chunk is sent with the key 'data'
         * to prevent REDCap from saving it in the logs
         * @see REDCap/Classes/Logging.php
         * 
         * @param {File} file 
         * @param {object} settings 
         */
        upload(context, file, chunk) {
            const form_data = new FormData()
            const file_keys = ['name', 'lastModified', 'lastModifiedDate', 'size', 'type', 'unique_name']
            file_keys.forEach(key => {
                if(key in file) form_data.append(key, file[key]) 
            })
            // use data to skip REDCap from saving this in the logs
            form_data.append('data', chunk)
            var params = {
                route: `upload`,
            }
            return context.api_client.post('',form_data, {
                params,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        },
        
    }
}