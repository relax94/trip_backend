import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
     owner_id: String,
     type: Number,
     text: String,
     posted_by: Date
}, {collection: 'Notification'});


export const Notification = mongoose.model('Notification', NotificationSchema);