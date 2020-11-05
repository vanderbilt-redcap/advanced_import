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
        upload(form_data) {
            var params = {
                route: `upload`,
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