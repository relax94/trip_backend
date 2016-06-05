import mongoose from 'mongoose'
import {Store} from './Store'
import {Post} from './models/Post'
import {Comment} from './models/Comment'



export class WallManager {

    constructor() {
        this.Store = new Store();
    }


    makePostByModelInput(_model, inputData) {
        if (inputData) {
            inputData["_id"] = mongoose.Types.ObjectId();
            inputData["posted_date"] = new Date();
            return new _model(inputData);
        }
    }

    makePostByInput(_model, inputData) {
        if (inputData) {
            inputData["_id"] = mongoose.Types.ObjectId();
            inputData["posted_date"] = new Date();
            return new Post(inputData);
        }
    }

    makeCommentByInput(_model, inputData) {
        if (inputData) {
            inputData["_id"] = mongoose.Types.ObjectId();
            return new Comment(inputData);
        }
    }

    addPost(postData, fn) {
        let post = this.makePostByModelInput(Post, postData);
        if (post) {
            return this.Store.saveInstance(post, fn);
        }
    }

    findPost(postSearchCriteria, fn) {
        return this.Store.findInstances(Post, postSearchCriteria, fn);
    }

    removePost(postRemoveCriteria, fn) {
        let d = postRemoveCriteria;
        this.findPost(postRemoveCriteria, (findResponse) => {
            if (findResponse.r) {
                return this.Store.removeInstance(Post, postRemoveCriteria, fn);
            }
        });
    }

    //TD: CHECK VALIDATION BY POST ID
    addComment(commentData, fn) {
        let comment = this.makePostByModelInput(Comment, commentData);
        if (comment) {
            return this.Store.saveInstance(comment, fn);
        }
    }

    getInstances(_model, criteria, fn) {
        if (criteria && fn) {
            return this.Store.findInstances(_model, criteria, { posted_date: -1 }, fn);
        }
    }

    getPosts(getPostsCriteria, fn) {
        return this.Store.findInstancesWithPopulate(Post, getPostsCriteria, { posted_date: -1 }, "owner_id", fn);
    }

    getComments(getCommentsCriteria, fn) {
        return this.Store.findInstancesWithPopulate(Comment, getCommentsCriteria,{ posted_date: -1 }, "owner_id", fn);
    }

    removeComment(removeCommentCriteria, fn) {
        let d = removeCommentCriteria;
        this.findPost(removeCommentCriteria, (findResponse) => {
            if (findResponse.r) {
                return this.Store.removeInstance(Comment, removeCommentCriteria, fn);
            }
        });
    }


}