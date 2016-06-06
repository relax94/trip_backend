import mongoose from 'mongoose'
import {TripModel} from './models/TripInstance'
import {Store} from './Store'

let TripManagerInstance = null;

export class TripManager {

    constructor() {
        if (!TripManagerInstance) {
            TripManagerInstance = this;
            this.Store = new Store();
        }
        return TripManagerInstance;
    }

    buildTripInstanceBeforeSave(tripData) {
        tripData["_id"] = mongoose.Types.ObjectId();
        tripData["created_date"] = new Date();
        return new TripModel(tripData);
    }


    saveTrip(tripData, fn) {
        if (tripData && fn) {
            let tripToSave = this.buildTripInstanceBeforeSave(tripData);
            return this.Store.saveInstance(tripToSave, fn);
        }
    }

    getTrip(getCriteria, fn) {
        if (getCriteria && fn) {
            return this.Store.findInstanceWithSort(TripModel, getCriteria, {created_date: -1}, fn);
        }
    }
    
    changeCurrentTrip(tripData, fn) {
        if (tripData && fn) {
            Store.findInstance(TripModel, { _id: tripData._id }, (response) => {
                if (response.state) {
                    Store.saveInstance(tripData, fn);
                }
            });
        }
    }
    
    saveSnapshot(criteria, uri, fn){
        if(criteria && uri){
            Store.findInstance
        }
    }
    
}