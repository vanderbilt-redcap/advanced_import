export default {
    actions: {        
        get(context) {
            var params = {
                route: `settings`,
            }
            return context.api_client.get('',{params})
        },
    }
}