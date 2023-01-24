export default {
    actions: {        
        get(context) {
            var params = {
                _route: `settings`,
            }
            return context.api_client.get('',{params})
        },
    }
}