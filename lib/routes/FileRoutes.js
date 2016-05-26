import fs from "fs"


export let GetFileRoute = {
    method: 'GET',
    path: '/file/{filename}',
    handler: (req, reply) => {
        let fileParam = req.params.filename;
        if (fileParam) {
            let path = __dirname + "/uploads/" + fileParam;
            return reply.file(path);
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
                console.log(err);
                console.log(fields);
                console.log(files);

                fs.readFile(files['picture'][0].path, function (err, data) {
                    if (!err) {
                        var fileName = Date.now() + "." + files['picture'][0].originalFilename.split('.')[1];
                        var filePath = "/uploads/" + fileName;
                        var newPath = __dirname + filePath;
                        console.log(newPath);
                        fs.writeFile(newPath, data, function (err) {
                            console.log(err);
                            if (!err)
                                return reply({ state: true });
                        });
                    }
                });

                //return reply(util.inspect({ fields: fields, files: files }));
            });
        }
    }
};