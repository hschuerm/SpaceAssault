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

    socket.on('load quests of station_administrator', (station_administrator_id) => {
        const station_administrator = new StationAdministratorModel();
        station_administrator.loadQuests(station_administrator_id, (err, result) => {
            if (err) {
                console.error(err.message);

                return;
            }

            socket.emit(`quests of station_administrator ${station_administrator_id}`, result);
        });
    });
};

module.exports = StationAdministratorEvents;