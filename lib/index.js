import Hapi from "hapi"
import inert from "inert"
import {StatusRoute, GetTripRoute, MainPage, SaveTripRoute, UploadImageSnapshotRoute} from "./routes/TripRoutes"

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
 

    // Start the server
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);

    });
});