import mongoose from 'mongoose'

const PostStatsSchema = new mongoose.Schema({
       _id: mongoose.Schema.Types.ObjectId,
       likes_members: [{type:mongoose.Schema.Types.ObjectId, ref: 'MongoMember'}]
}, {collection: 'PostStats'})


export const PostStats = mongoose.model('PostStats', PostStatsSchema);