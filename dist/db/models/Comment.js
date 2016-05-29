'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommentModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentSchema = new _mongoose2.default.Schema({
    _id: _mongoose2.default.Schema.Types.ObjectId,
    post_id: String,
    owner_id: String,
    posted_date: Date,
    text: String
}, { collection: 'Comment' });

var CommentModel = exports.CommentModel = _mongoose2.default.model('CommentModel', CommentSchema);