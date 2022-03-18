const { connect } = require('./database/connector');
const SetupServer = require('./setupServer');

const UserEvents = require('./events/user');
const SolarSystemEvents = require('./events/solarSystem');

const SolarSystem = require('./database/model/solarSystem');

connect(() => {
    const { socketServer } = SetupServer();

    socketServer.on('connection', (socket) => {
        const solar_system = new SolarSystem();

        UserEvents(socketServer, socket, solar_system);
        SolarSystemEvents(socketServer, socket, solar_system);
    });
});