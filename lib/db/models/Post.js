import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    event_id: String,
    owner_id: String,
    posted_date: Date,
    text: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { collection: 'Post' });