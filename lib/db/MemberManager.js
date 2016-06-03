import {Store} from './Store'
import {MongoMember} from './models/Member'
import mongoose from 'mongoose'

export class MemberManager {
    constructor() {
        this.Store = new Store();
    }

    makeMember(memberData) {
        memberData["_id"] = mongoose.Types.ObjectId();
        return new MongoMember(memberData);
    }
    
    copyMemberData(memberDoc, memberData){
        memberDoc['first_name'] = memberData['first_name'];
        memberDoc['last_name'] = memberData['last_name'];
        memberDoc['icon_url'] = memberData['icon_url'];
        return memberDoc;
    }

    addMember(memberData, fn) {
        this.getMember({member_id: memberData['member_id']}, (member) => {
            if (member.r) {
                let memberDoc = this.copyMemberData(member.r, memberData);
                return this.Store.saveInstance(memberDoc, fn);
            }
            else
                return this.Store.saveInstance(this.makeMember(memberData), fn);
        })
    }

    removeMember(criteria, fn) {
        return this.Store.removeInstance(MongoMember, criteria, fn);
    }

    updateMember(memberData, fn) {
        return this.Store.saveInstance(memberData, fn);
    }

    getMember(criteria, fn) {
        return this.Store.findInstance(MongoMember, criteria, fn);
    }

}