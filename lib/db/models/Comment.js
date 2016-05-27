import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    post_id: String,
    owner_id: String,
    posted_date: Date,
    text: String,
}, { collection: 'Comment' });


export const CommentModel = mongoose.model('CommentModel', CommentSchema);