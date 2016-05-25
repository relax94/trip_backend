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
    _trip_id: _mongoose2.default.Schema.Types.ObjectId,
    owner_id: String,
    name: String,
    description: String,
    locations: Array,
    point: Array
}, { collection: 'TripInstance' });

var TripModel = exports.TripModel = _mongoose2.default.model('TripInstance', TripInstanceSchema);