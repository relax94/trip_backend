import {Store} from './Store'
import io from 'socket.io'
import mongoose from 'mongoose'
import {Notification} from './models/Notification'


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
            socket.on('subscribeRoom', (roomId) => this.subscribeRoom(roomId, socket));
        });
    }

    subscribeRoom(roomId, socket) {
        if (roomId && socket) {
            socket.join(roomId);
            console.log('INC SUBSCR ROOM : ', roomId);
        }
    }

    pushAnswer(answerMethod, socket, obj) {
        obj['method'] = answerMethod;
        socket.emit('serverResponse', obj);
    }

    dissconnectHandler(socket) {
        let cid = socket.cid;
        if (cid) {
            this.disposeConnectionEndpoint(cid, (resp) => {

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

    saveNotify(creator_id, sender_id, type, text, fn) {
        new Notification({
            _id: mongoose.Types.ObjectId(),
            owner_id: creator_id,
            type: type,
            body_text: text,
            sender: sender_id,
            posted_by: new Date()
        }).save(fn);
    }

    //TODO : REFACTOR THIS METHOD
    postNotify(post) {
        let creator = post['creator_id'];
        let senderId = post['owner_id']['_id'];
        let connectionId = post['owner_id']['member_id'];

        let obj = {
            method: 'addPost',
            body: post,
            isMine: creator === connectionId ? true : false
        };

        let notifyText = ` published post on your event with text : \n ${post.text}`;
        return this.saveNotify(creator, senderId, obj.method, notifyText, (err, resposnse) => {
            if (!err) {
                let wallId = post['wall_id'];
                if (/*connectionId &&*/ wallId /*&& creator != connectionId*/) {
                    // let connection = this.connections[connectionId];
                    //  if(connection){
                    //  connection.join(wallId);
                    this.io.to(wallId).emit('serverResponse', obj);
                    // connection.broadcast.to(wallId).emit('serverResponse', obj);

                    //  }
                }
            }
        });
        //return this.notify(post['creator_id'], 'addPost', obj);
    }


    getAllNotification(criteria, fn) {
        return this.Store.findInstancesWithPopulate(Notification, criteria, { posted_date: -1 }, "sender", fn);
    }

}