// import {objectToUrlSearchParams} from '../Utils'

export default {
    actions: {
        get({start, limit}) {
            var params = {
                route: `logs`,
                _start: start,
                _limit: limit,
            }
            return this.api_client.get('',{params})
        },
        delete() {
            var params = {
                route: `logs`,
            }
            return this.api_client.delete('',{params})
        },
    }
}