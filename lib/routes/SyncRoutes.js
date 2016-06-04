import {MSSqlConnector} from '../db/MSSqlConnector'

const sql = new MSSqlConnector("admin123@smapme", "Smapme123!", "smapme");



export const SyncDBUserRoute = {
    method: 'GET',
    path: '/backend/sync/user',
    handler: (req, reply) => {
        let data = req.query;
        if (data.user_id) {
            console.log("SYNC : ", data);
            sql.synchronize(data.user_id);
            return reply().code(200);
        }
        return reply().code(200);
    }
};