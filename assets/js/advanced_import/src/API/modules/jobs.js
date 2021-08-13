// import {objectToUrlSearchParams} from '../Utils'

export default {
    actions: {
        get(context, {start, limit}) {
            var params = {
                route: `jobs`,
                _start: start,
                _limit: limit,
            }
            return context.api_client.get('',{params})
        },
        delete(context, {id}) {
            var params = {
                route: `jobs/${id}`,
            }
            return context.api_client.delete('', {
                params,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        },
        stop(context, {id}) {
            var params = {
                route: `jobs/${id}/stop`,
            }
            const form_data = new FormData()
            return context.api_client.post('',form_data, {
                params,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        },
        start(context, {id}) {
            var params = {
                route: `jobs/${id}/start`,
            }
            const form_data = new FormData()
            return context.api_client.post('',form_data, {
                params,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        },
        update(context, {id, data}) {
            var params = {
                route: `jobs/${id}`,
            }
            const form_data = new FormData()
            const string_data = JSON.stringify(data)
            form_data.append('data',  string_data)
            return context.api_client.post('', data, {
                params,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        },
    }
}