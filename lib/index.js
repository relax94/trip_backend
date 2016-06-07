import Hapi from "hapi"
import inert from "inert"
import {StatusRoute, GetTripSnapshot, GetTripRoute, MainPage, SaveTripRoute} from "./routes/TripRoutes"
import {UploadImageSnapshotRoute, GetFileRoute} from "./routes/FileRoutes"
import {AddPostRoute, RemovePostRoute, GetPostsRoute, CommentAddRoute, GetCommentsRoute, RemoveCommentRoute} from './routes/WallRoutes'
import {AddMemberRoute, GetMemberRoute} from './routes/MemberRoutes'
import {SyncDBUserRoute} from './routes/SyncRoutes'
import {NotificationManager} from './db/NotificationManager'
import {GetAllNotification} from './routes/NotificationRoutes'

const server = new Hapi.Server();




server.connection({
    port: 4343
});
server.register(inert, (err) => {

    if (err)
        throw err;

    server.route(MainPage);
    server.route(StatusRoute);
    server.route(GetTripRoute);
    server.route(SaveTripRoute);
    server.route(UploadImageSnapshotRoute);
    server.route(GetFileRoute);
    server.route(AddPostRoute);
    server.route(RemovePostRoute);
    server.route(GetPostsRoute);
    server.route(CommentAddRoute);
    server.route(GetCommentsRoute);
    server.route(RemoveCommentRoute);
    server.route(AddMemberRoute);
    server.route(GetMemberRoute);
    server.route(GetTripSnapshot);
    server.route(SyncDBUserRoute);
    server.route(GetAllNotification);

    // Start the server
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
        
         let NM = new NotificationManager();
         NM.setListener(server.listener);
    });
});