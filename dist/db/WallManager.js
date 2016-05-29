'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WallManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Post = require('./models/Post');

var _Comment = require('./models/Comment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WallManager = exports.WallManager = function () {
    function WallManager() {
        _classCallCheck(this, WallManager);
    }

    _createClass(WallManager, [{
        key: 'addPost',
        value: function addPost(postData, fn) {
            //
        }
    }]);

    return WallManager;
}();