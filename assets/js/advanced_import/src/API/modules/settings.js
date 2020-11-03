export default {
    actions: {        
        get() {
            var params = {
                route: `settings`,
            }
            return this.api_client.get('',{params})
        },
    }
}