'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UploadImageSnapshotRoute = exports.GetFileRoute = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _multiparty = require('multiparty');

var _multiparty2 = _interopRequireDefault(_multiparty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GetFileRoute = exports.GetFileRoute = {
    method: 'GET',
    path: '/file/{filename}',
    handler: function handler(req, reply) {
        var fileParam = req.params.filename;
        if (fileParam) {
            var path = __dirname + "/uploads/" + fileParam;
            return reply.file(path);
        }
        return reply({ state: 404 });
    }
};

var UploadImageSnapshotRoute = exports.UploadImageSnapshotRoute = {
    method: 'POST',
    path: '/trip/uploadsnapshot',
    config: {
        payload: {
            maxBytes: 209715200,
            output: 'stream',
            parse: false
        },
        handler: function handler(request, reply) {

            var form = new _multiparty2.default.Form();
            form.parse(request.payload, function (err, fields, files) {
                console.log(err);
                console.log(fields);
                console.log(files);

                _fs2.default.readFile(files['picture'][0].path, function (err, data) {
                    if (!err) {
                        var fileName = Date.now() + "." + files['picture'][0].originalFilename.split('.')[1];
                        var filePath = "/uploads/" + fileName;
                        var newPath = __dirname + filePath;
                        console.log(newPath);
                        _fs2.default.writeFile(newPath, data, function (err) {
                            console.log(err);
                            if (!err) return reply({ state: true, url: '/file/' + fileName });
                        });
                    }
                });

                //return reply(util.inspect({ fields: fields, files: files }));
            });
        }
    }
};