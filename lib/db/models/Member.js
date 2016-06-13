import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    public_id: mongoose.Schema.Types.ObjectId,
    member_id : String,
    email: String,
    named_id: String,
    first_name: String,
    last_name: String,
    /* profile_id : {type : mongoose.Schema.Types.ObjectId, ref : 'MemberProfile'},*/
    ph_code: String,
    reg_date: Date,
    from_id: String,
    ph_number: String,
    icon_url: String,
    address: String,
    bio: String,
    website: String
}, {collection : 'Member'});

export const MongoMember = mongoose.model('MongoMember', MemberSchema);