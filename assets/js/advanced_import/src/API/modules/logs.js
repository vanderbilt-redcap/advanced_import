// import {objectToUrlSearchParams} from '../Utils'

export default {
    actions: {
        get(context, {start, limit}) {
            var params = {
                _route: `logs`,
                _start: start,
                _limit: limit,
            }
            return context.api_client.get('',{params})
        },
        delete(context, ) {
            var params = {
                _route: `logs`,
            }
            return context.api_client.delete('',{params})
        },
    }
}