import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    post_id: mongoose.Schema.Types.ObjectId,
    owner_id: {type: mongoose.Schema.Types.ObjectId, ref:'MongoMember'} ,
    posted_date: Date,
    type: Number,
    text: String,
    attachment_url:String
}, { collection: 'Comment' });


export const Comment = mongoose.model('CommentModel', CommentSchema);