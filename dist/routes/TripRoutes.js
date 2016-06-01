'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MainPage = exports.GetTripRoute = exports.SaveTripRoute = exports.StatusRoute = undefined;

var _TripManager = require('../db/TripManager');

var TM = new _TripManager.TripManager();

var StatusRoute = exports.StatusRoute = {
    method: 'GET',
    path: '/status',
    handler: function handler(req, reply) {
        return reply("Working all platform");
    }
};

var SaveTripRoute = exports.SaveTripRoute = {
    method: 'POST',
    path: '/trip/save',
    handler: function handler(req, reply) {
        var tripModel = req.payload;
        console.log(tripModel);
        console.log('RECIEVE SAVE REQUEST');
        if (tripModel) {
            console.log('INVOKE SAVING');
            return TM.saveTrip(tripModel, function (saveResponse) {
                console.log('SAVE RESPONSE');
                return reply(saveResponse);
            });
        }
        console.log('NOT REQUEST');
        return reply({ state: false });
    }
};

var GetTripRoute = exports.GetTripRoute = {
    method: 'GET',
    path: '/trip/get',
    handler: function handler(req, reply) {
        var event_id = req.query.event_id;
        var owner_id = req.query.owner_id;
        if (event_id) {
            var criteria = { owner_id: owner_id, event_id: event_id };
            return TM.getTrip(criteria, function (getResponse) {
                return reply(getResponse);
            });
        }
        return reply({ state: false });
    }
};

var MainPage = exports.MainPage = {
    method: 'GET',
    path: '/',
    handler: function handler(req, reply) {
        return reply.file('../views/index.html');
    }
};