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
        return new TripModel(tripData);
    }


    saveTrip(tripData, fn) {
        if (tripData && fn) {
            return this.Store.saveInstance(this.buildTripInstanceBeforeSave(tripData), fn);
        }
    }

    getTrip(getCriteria, fn) {
        if (getCriteria && fn) {
            return this.Store.findInstance(TripModel, getCriteria, fn);
        }
    }
}