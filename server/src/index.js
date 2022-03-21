const { connect } = require('./database/connector');
const SetupServer = require('./setupServer');

const UserEvents = require('./events/user');
const SolarSystemEvents = require('./events/solarSystem');
const StationAdministratorEvents = require('./events/stationAdministrator');

const SolarSystem = require('./database/models/solarSystem');

connect(() => {
    const { socketServer } = SetupServer();

    socketServer.on('connection', (socket) => {
        const solar_system = new SolarSystem();

        UserEvents(socketServer, socket, solar_system);
        SolarSystemEvents(socketServer, socket, solar_system);
        StationAdministratorEvents(socketServer, socket);
    });
});