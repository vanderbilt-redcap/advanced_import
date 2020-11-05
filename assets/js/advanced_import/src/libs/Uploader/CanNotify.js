/**
 * add sub capabilities to a class:
 * in the class file: import CanNotify from './CanNotify'
 * in the class constructor: Object.assign(this, CanNotify(this))
 */
const CanNotify = self => ({
    observers: {
        '*': [],
    },

    initEventGroup(event='*')
    {
        if(!(event in self.observers)) {
            self.observers[event] = []
        }
    },
    getEventObservers(event='*')
    {
        self.initEventGroup(event)
        const group = self.observers[event]
        const all = self.observers["*"]

        return [...group, ...all]
    },
    // Attach an observer to the subject.
    attach(observer, event='*') {
        console.log(observer)
        self.initEventGroup(event)
        console.log(self.observers)
        const exists = self.observers[event].includes(observer)
        if (exists) {
            return console.log('Subject: Observer has been attached already.')
        }
        if(!('update' in observer)) return console.log(`An 'update' method has not been found in the observer.`)
        self.observers[event].push(observer)
    },

    // Detach an observer from the subject.
    detach(observer, event='*') {
        const events = self.getEventObservers(event)
        for(let[event,value] of Object.entries(events)) {
            if(observer==value) {
                delete self.observers[event][value]
            }
        }
    },

    // Notify all observers about an event.
    notify(event='*', data=null) {
        console.log(`Subject[${event}]: Notifying observers...`, data)
        const observers = self.getEventObservers(event)
        observers.forEach(observer => {
            observer.update(self, event, data)
        })
    },
})

export default CanNotify