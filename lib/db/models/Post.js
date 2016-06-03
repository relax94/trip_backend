import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    wall_id: String,
    owner_id: {type: mongoose.Schema.Types.ObjectId, ref:'MongoMember'} ,
    posted_date: Date,
    post_type: Number,
    text: String,
    //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { collection: 'Post' });


export const Post = mongoose.model('PostModel', PostSchema);