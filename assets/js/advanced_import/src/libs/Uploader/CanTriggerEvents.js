/**
 * add sub capabilities to a class:
 * in the class file: import CanNotify from './CanNotify'
 * in the class constructor: Object.assign(self, CanNotify(this))
 */
export default self => ({
    callbacks: new Map,

    on(event, callback) {
        if(!self.callbacks.has(event)) self.callbacks.set(event, [])
        const event_callbacks = self.callbacks.get(event)
        if(!event_callbacks.includes(callback)) event_callbacks.push(callback)
    },
    
    off(event, callback) {
        if(!self.callbacks.has(event) ) return
        const event_callbacks = self.callbacks.get(event)
        if(event_callbacks.includes(callback) ) delete event_callbacks[callback]
    },

    // Notify all observers about an event.
    trigger(event, details=null) {
        const callbacks = self.callbacks.get(event)
        if(!callbacks) return
        callbacks.forEach(callback => {
            callback({
                type:event,
                details,
            })
        })
    },
})