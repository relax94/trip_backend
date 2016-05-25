import {TripManager} from '../db/TripManager'

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
        let criteria = req.payload;
        
    }
};


export let MainPage = {
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
        return reply.file('../views/index.html');
    }
};