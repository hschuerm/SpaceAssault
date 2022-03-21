const StationAdministratorModel = require("../database/models/stationAdministrator");

function StationAdministratorEvents(socketServer, socket) {
    socket.on('load station administrator', (station_id) => {
        const station_administrator = new StationAdministratorModel();
        station_administrator.readOnStation(station_id, (err, result) => {
            if (err) {
                console.error(err.message);

                return;
            }

            socket.emit(`administrator of station with id ${station_id}`, result[0]);
        });
    });
};

module.exports = StationAdministratorEvents;