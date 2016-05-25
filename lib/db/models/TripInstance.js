import mongoose from 'mongoose'

const TripInstanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _trip_id: mongoose.Schema.Types.ObjectId,
    owner_id: String,
    name: String,
    description: String,
    locations: Array,
    point: Array
}, { collection: 'TripInstance' });

export const TripModel = mongoose.model('TripInstance', TripInstanceSchema);