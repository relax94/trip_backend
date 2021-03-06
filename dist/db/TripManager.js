'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TripManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _TripInstance = require('./models/TripInstance');

var _Store = require('./Store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TripManagerInstance = null;

var TripManager = exports.TripManager = function () {
    function TripManager() {
        _classCallCheck(this, TripManager);

        if (!TripManagerInstance) {
            TripManagerInstance = this;
            this.Store = new _Store.Store();
        }
        return TripManagerInstance;
    }

    _createClass(TripManager, [{
        key: 'buildTripInstanceBeforeSave',
        value: function buildTripInstanceBeforeSave(tripData) {
            tripData["_id"] = _mongoose2.default.Types.ObjectId();
            return new _TripInstance.TripModel(tripData);
        }
    }, {
        key: 'saveTrip',
        value: function saveTrip(tripData, fn) {
            if (tripData && fn) {
                var tripToSave = this.buildTripInstanceBeforeSave(tripData);
                return this.Store.saveInstance(tripToSave, fn);
            }
        }
    }, {
        key: 'getTrip',
        value: function getTrip(getCriteria, fn) {
            if (getCriteria && fn) {
                return this.Store.findInstance(_TripInstance.TripModel, getCriteria, fn);
            }
        }
    }, {
        key: 'changeCurrentTrip',
        value: function changeCurrentTrip(tripData, fn) {
            if (tripData && fn) {
                _Store.Store.findInstance(_TripInstance.TripModel, { _id: tripData._id }, function (response) {
                    if (response.state) {
                        _Store.Store.saveInstance(tripData, fn);
                    }
                });
            }
        }
    }]);

    return TripManager;
}();