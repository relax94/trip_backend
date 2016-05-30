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
        console.log(tripModel);
        console.log('RECIEVE SAVE REQUEST');
        if (tripModel) {
            console.log('INVOKE SAVING');
            return TM.saveTrip(tripModel, (saveResponse) => {
                console.log('SAVE RESPONSE');
                return reply(saveResponse);
            });
        }
        console.log('NOT REQUEST');
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

