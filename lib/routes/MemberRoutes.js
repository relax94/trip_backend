import {MemberManager} from '../db/MemberManager'

const MM = new MemberManager();

export const AddMemberRoute = {
    method: 'POST',
    path: '/member/add',
    handler: (req, reply) => {
        let addPayload = req.payload;
        if (addPayload) {
            return MM.addMember(addPayload, reply);
        }
        return reply({});
    }
};


export const GetMemberRoute = {
    method: 'POST',
    path: '/member/get',
    handler: (req, reply) => {
        let getPayload = req.payload;
        if (getPayload) {
            return MM.getMember(getPayload, reply);
        }
        return reply({});
    }
};