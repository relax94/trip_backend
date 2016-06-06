import {Store} from './Store'
import io from 'socket.io'


let NotificationInstance = null;

export class NotificationManager {
    constructor() {
        if (!NotificationInstance) {
            this.Store = new Store();
            NotificationInstance = this;
            this.connections = {};
        }

      

        return NotificationInstance;
    }


   setListener(server){
        this.io = io.listen(server);
          this.bindMainHandler();
   }


    bindMainHandler() {
        this.io.sockets.on('connection', (socket) => {
            socket.on('registerConnection', (obj) => this.registerHandler(socket, obj));
            console.log('input connection');
        });
    }

    pushAnswer(answerMethod, socket, obj) {
        obj['method'] = answerMethod;
        socket.emit('serverResponse', obj);
    }

    registerHandler(socket, obj) {
        console.log('OBJ : ', obj);
        this.addConnectionEndpoint(obj, socket, (response) => {
            console.log('register response ', response);
            this.pushAnswer('registerResponse', socket, { state: true, message: 'success' });
        });
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

    notify(connectionId, method, obj) {
        console.log(`notify ${connectionId}  --- ${method}  ---- ${obj}`);
        let connection = this.connections[connectionId]; 
        if (connection) {
            this.pushAnswer(method, connection, obj);
        }
    }

}