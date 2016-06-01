"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Store = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_mongoose2.default.connect("mongodb://localhost:27017");

var StoreInstance = null;

var Store = exports.Store = function () {
    function Store() {
        _classCallCheck(this, Store);

        if (!StoreInstance) StoreInstance = this;

        this.time = new Date();

        return StoreInstance;
    }

    _createClass(Store, [{
        key: "getTime",
        value: function getTime() {
            return this.time;
        }
    }, {
        key: "responseWrapper",
        value: function responseWrapper(err, response, fn) {
            if (!err) {
                return fn({ state: true, r: response });
            } else {
                return fn({ state: false, e: err });
            }
        }
    }, {
        key: "saveInstance",
        value: function saveInstance(instanceToSave, fn) {
            var _this = this;

            if (instanceToSave && fn) {
                instanceToSave.save(function (err, response) {
                    return _this.responseWrapper(err, response, fn);
                });
            }
        }
    }, {
        key: "findInstance",
        value: function findInstance(_model, findCriteria, fn) {
            var _this2 = this;

            if (findCriteria && fn) {
                return _model.findOne(findCriteria).exec(function (err, response) {
                    return _this2.responseWrapper(err, response, fn);
                });
            }
        }
    }, {
        key: "findInstances",
        value: function findInstances(_model, findCriteria, fn) {
            var _this3 = this;

            if (findCriteria && fn) {
                return _model.find(findCriteria).exec(function (err, response) {
                    return _this3.responseWrapper(err, response, fn);
                });
            }
        }
    }]);

    return Store;
}();