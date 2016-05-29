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
            this.Store.findInstance(TripModel, { event_id: tripData.event_id }, (findResponse) => {
                let tripToSave = this.buildTripInstanceBeforeSave(tripData);
                if (findResponse.state && findResponse.r != null) {
                    tripToSave["_id"] = findResponse.r._id;
                }
                return this.Store.saveInstance(tripToSave, fn);
            });
        }
    }

    getTrip(getCriteria, fn) {
        if (getCriteria && fn) {
            return this.Store.findInstance(TripModel, getCriteria, fn);
        }
    }
}