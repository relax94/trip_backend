"use strict";

var _hapi = require("hapi");

var _hapi2 = _interopRequireDefault(_hapi);

var _inert = require("inert");

var _inert2 = _interopRequireDefault(_inert);

var _Store = require("./db/Store.js");

var _Store2 = _interopRequireDefault(_Store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();

console.log(_Store2.default);

var store = new _Store2.default();
console.log(store.getTime());

server.connection({
    port: 4343
});
server.register(_inert2.default, function () {});

server.route({
    method: 'GET',
    path: '/status',
    handler: function handler(req, reply) {
        return reply("Working all platform");
    }
});

// Start the server
server.start(function (err) {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);

    var store1 = new _Store2.default();
    console.log(store1.getTime());
});