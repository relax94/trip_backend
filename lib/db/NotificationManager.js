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


    setListener(server) {
        this.io = io.listen(server);
        this.bindMainHandler();
    }


    bindMainHandler() {
        this.io.sockets.on('connection', (socket) => {
            socket.on('registerConnection', (obj) => this.registerHandler(socket, obj));
            socket.on('disconnect', () => this.dissconnectHandler(socket));
            console.log('input connection ', socket.cid);
        });
    }

    pushAnswer(answerMethod, socket, obj) {
        obj['method'] = answerMethod;
        socket.emit('serverResponse', obj);
    }

    dissconnectHandler(socket){
        let cid = socket.cid;
        if(cid){
            this.disposeConnectionEndpoint(cid, (resp)=>{

            });
        }
    }

    registerHandler(socket, obj) {
        this.addConnectionEndpoint(obj, socket, (response) => {
            this.pushAnswer('registerResponse', socket, { state: true, message: 'success' });
        });
    }


    addConnectionEndpoint(connectionId, socket, fn) {
        if (!this.connections[connectionId]) {
            this.connections[connectionId] = socket;
            socket.cid = connectionId;
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
       
        let connection = this.connections[connectionId];
        if (connection) {
             console.log(`notify ${connectionId}  --- ${method}  ---- ${obj}`);
            this.pushAnswer(method, connection, obj);
        }
    }

    postNotify(post) {
        let obj = {
            body: post
        };
        return this.notify(post['creator_id'], 'addPost', obj);
    }

}