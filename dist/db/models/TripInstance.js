'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TripModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TripInstanceSchema = new _mongoose2.default.Schema({
    _id: _mongoose2.default.Schema.Types.ObjectId,
    event_id: String,
    owner_id: String,
    name: String,
    description: String,
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
    trip_points: [{
        latitude: Number,
        longitude: Number
    }]
}, { collection: 'TripInstance' });

var TripModel = exports.TripModel = _mongoose2.default.model('TripInstance', TripInstanceSchema);