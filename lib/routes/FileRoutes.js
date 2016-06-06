import fs from "fs"
import multiparty from 'multiparty'
import lwip from 'lwip'

export let GetFileRoute = {
    method: 'GET',
    path: '/file/{filename}',
    handler: (req, reply) => {
        let fileParam = req.params.filename;
        let size = req.query.size;

        if (fileParam) {
            let path = __dirname + "/uploads/";
            if (size)
                path += size + "/";
            path += fileParam;
            console.log(path);
            return reply.file(path, { confine: false });
        }
        return reply({ state: 404 });
    }
}


export let UploadImageSnapshotRoute = {
    method: 'POST',
    path: '/trip/uploadsnapshot',
    config: {
        payload: {
            maxBytes: 209715200,
            output: 'stream',
            parse: false
        },
        handler: function (request, reply) {
            var form = new multiparty.Form();
            form.parse(request.payload, function (err, fields, files) {
                fs.readFile(files['picture'][0].path, function (err, data) {
                    if (!err) {
                        var fileName = Date.now() + "." + files['picture'][0].originalFilename.split('.')[1];
                        var filePath = "/uploads/" + fileName;
                        var newPath = __dirname + filePath;
                        fs.writeFile(newPath, data, function (err) {
                            handleWriteFile(err,fileName, reply);
                        });
                    }
                });

                //return reply(util.inspect({ fields: fields, files: files }));
            });
        }
    }
};



const handleWriteFile = (err,fileName, reply) => {
    if (!err) {
        return resizeImage(fileName, 150, 150, (isResizingMedium) => {
            return reply({ state: true, url: '/file/' + fileName }).code(200);
        });
    }
    else
        return reply().code(500);
}


let resizeImage = (filename, width, height, cb) => {
    console.log('StartResizing');
    var path = __dirname + '/uploads/';
    lwip.open(path + filename, function (err, image) {
        if (err) {
            console.log('IMAGE RESIZE ERR ', err);
            return;
        }
        image.batch()
            .resize(width, height)       // crop a 200X200 square from center
            .writeFile(path + width + '/' + filename, function (err) {
                if (err)
                    return cb(false);
                return cb(true);

            });
    });
};

