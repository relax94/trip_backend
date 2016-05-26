import {TripManager} from '../db/TripManager'
import multiparty from 'multiparty'
import fs from "fs"

let TM = new TripManager();

export let StatusRoute = {
    method: 'GET',
    path: '/status',
    handler: (req, reply) => {
        return reply("Working all platform");
    }
}



export let SaveTripRoute = {
    method: 'POST',
    path: '/trip/save',
    handler: (req, reply) => {
        let tripModel = req.payload;
        if (tripModel) {
            return TM.saveTrip(tripModel, (saveResponse) => {
                return reply(saveResponse);
            });
        }
        return reply({ state: false });
    }
};

export let GetTripRoute = {
    method: 'GET',
    path: '/trip/get',
    handler: (req, reply) => {
        let event_id = req.query.event_id;
        let owner_id = req.query.owner_id;
        if (event_id) {
            let criteria = { owner_id, event_id };
            return TM.getTrip(criteria, (getResponse) => {
                return reply(getResponse);
            });
        }
        return reply({ state: false });
    }
};


export let MainPage = {
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
        return reply.file('../views/index.html');
    }
};



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