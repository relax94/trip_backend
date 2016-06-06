import mongoose from 'mongoose'

const TripInstanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    event_id: String,
    owner_id: String,
    name: String,
    description: String,
    map_snapshot_url: String,
    created_date: Date,
    line_width: Number,
    line_color: Number,
    // gDirection: [{
    //     distance: {
    //         text: String,
    //         value: Number
    //     },
    //     duration: {
    //         text: String,
    //         value: Number
    //     },
    //     endLocation: {
    //         lat: Number,
    //         lng: Number
    //     },
    //     startLocation: {
    //         lat: Number,
    //         lng: Number
    //     },
    //     html_instructions: String,
    //     travel_mode: String,
    //     maneuver: String,
    //     polyline: {
    //         points: String
    //     }
    // }]
    trip_points: [
        {
            latitude: Number,
            longitude: Number
        }
    ]
}, { collection: 'TripInstance' });

export const TripModel = mongoose.model('TripInstance', TripInstanceSchema);