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
        upload(context, file, chunk) {
            const form_data = new FormData()
            const file_keys = ['name', 'lastModified', 'lastModifiedDate', 'size', 'type', 'unique_name']
            file_keys.forEach(key => {
                if(key in file) form_data.append(key, file[key]) 
            })
            form_data.append('chunk', chunk)
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