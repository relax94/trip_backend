import {WallManager} from '../db/WallManager'

let WM = new WallManager();

export let AddPostRoute = {
    method: 'POST',
    path: '/wall/post/add',
    handler: (req, reply) => {
        let postPayload = req.payload;
        if (postPayload) {
            return WM.addPost(postPayload, (postResponse) => {
                delete postResponse["r"];
                return reply(postResponse);
            });
        }
        return reply({ state: false, message: 'Incorrect payload' });
    }
};

export let RemovePostRoute = {
    method: 'POST',
    path: '/wall/post/remove',
    handler: (req, reply) => {
        let postPayload = req.payload;
        if (postPayload) {
            return WM.removePost(postPayload, (removePostResponse) => {
                return reply(removePostResponse);
            });
        }
        return reply({ state: false, message: 'Incorrect payload' });
    }
};

export let GetPostsRoute = {
    method: 'POST',
    path: '/wall/post/getposts',
    handler: (req, reply) => {
        let postPayload = req.payload;
        if (postPayload) {
            return WM.getPosts(postPayload, (postResponse) => {
                return reply(postResponse);
            });
        }
        return reply({ state: false, message: 'Incorrect payload' });
    }
}

export let CommentAddRoute = {
    method: 'POST',
    path: '/wall/comment/add',
    handler: (req, reply) => {
        let commentPayload = req.payload;
        if (commentPayload) {
            return WM.addComment(commentPayload, (commentResponse) => {
                delete commentResponse["r"];
                return reply(commentResponse);
            });
        }
        return reply({ state: false, message: 'Incorrect payload' });
    }
}


export let GetCommentsRoute = {
    method: 'POST',
    path: '/wall/comment/getcomments',
    handler: (req, reply) => {
        let commentPayload = req.payload;
        if (commentPayload) {
            return WM.getComments(commentPayload, (commentsResponse) => {
                return reply(commentsResponse);
            });
        }
        return reply({ state: false, message: 'Incorrect payload' });
    }
}


export let RemoveCommentRoute = {
    method: 'POST',
    path: '/wall/comment/remove',
    handler: (req, reply) => {
        let commentPayload = req.payload;
        if (commentPayload) {
            return WM.removeComment(commentPayload, reply);
        }
        return reply({ state: false, message: 'Incorrect payload' });
    }
};