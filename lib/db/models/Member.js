import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema({
       _id: mongoose.Schema.Types.ObjectId,
       member_id: String,
       first_name: String, 
       last_name: String,
       icon_url: String
});