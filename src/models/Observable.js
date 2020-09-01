export class Observable {
    constructor() {
    this.observers = [];
    }

    addObserver(type, func) {
        this.observers.push({type, func})
    }

    notify(type, msg) {
        this.observers.forEach(obs => {
            obs.type === type ? obs.func(msg) : null;
        })
    }
}