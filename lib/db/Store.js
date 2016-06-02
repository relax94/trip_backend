import mongoose from 'mongoose'
mongoose.connect("mongodb://localhost:27017");

let StoreInstance = null;

export class Store {

    constructor() {
        if (!StoreInstance)
            StoreInstance = this;

        this.time = new Date();

        return StoreInstance;
    }

    getTime() {
        return this.time;
    }

    responseWrapper(err, response, fn) {
        if (!err) {
            return fn({ state: true, r: response });
        } else {
            return fn({ state: false, e: err });
        }
    }


    saveInstance(instanceToSave, fn) {
        if (instanceToSave && fn) {
            instanceToSave.save((err, response) => {
                return this.responseWrapper(err, response, fn);
            });
        }
    }

    removeInstance(_model, removeCriteria, fn) {
        if (removeCriteria, fn) {
            return _model.remove(removeCriteria)
                .exec((err, response) => {
                    return this.responseWrapper(err, response, fn);
                });
        }
    }

    //UPDATE INSTANCE (NOT IMPLEMENTED)
    updateInstance() {

    }

    findInstance(_model, findCriteria, fn) {
        if (findCriteria && fn) {
            return _model.findOne(findCriteria)
                .exec((err, response) => {
                    return this.responseWrapper(err, response, fn);
                });
        }
    }

    findInstances(_model, findCriteria, options, fn) {
        if (findCriteria && fn) {
            return _model.find(findCriteria)
                .sort(options)
                .exec((err, response) => {
                    return this.responseWrapper(err, response, fn);
                });
        }
    }


}