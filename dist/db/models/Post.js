'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostSchema = new _mongoose2.default.Schema({
    _id: _mongoose2.default.Schema.Types.ObjectId,
    event_id: String,
    owner_id: String,
    posted_date: Date,
    text: String,
    comments: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Comment' }]
}, { collection: 'Post' });