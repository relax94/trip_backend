import {NotificationManager} from '../db/NotificationManager'

const NM = new NotificationManager();

export const GetAllNotification = {
    method: 'POST',
    path: '/notify/getall',
    handler: (req, reply) => {
        let criteria = req.payload;
        if (criteria) {
            return NM.getAllNotification(criteria, reply);
        }
        return reply().code(400);
    }
};