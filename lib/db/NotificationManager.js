import {Store} from './Store'


let NotificationInstance = null;

export class NotificationManager {
    constructor() {
        if (!NotificationInstance) {
            this.Store = new Store();
            NotificationInstance = this;
        }

        return NotificationInstance;
    }
    
    addConnectionEndpoint(connectionId, socket, fn) {
        if (!this.connections[connectionId]) {
            this.connections[connectionId] = socket;
            return fn({ state: true, message: `connection with id ${connectionId} success added to pool` });
        }
        else
            return fn({ state: false, message: `connection with id ${connectionId} is in pool` });
    }

    disposeConnectionEndpoint(connectionId, fn) {
        if (this.connections[connectionId]) {
            delete this.connections[connectionId];
            return fn({ state: true, message: `connection with id ${connectionId} success disposed` });
        }
        else
            return fn({ state: false, message: `connection with id ${connectionId} exists` });
    }

    notify(connectionId, obj, fn) {

    }

}