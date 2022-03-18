const BaseModel = require("./base");

class SolarSystemModel extends BaseModel {
    constructor() {
        super('solar_system');
    }

    getContent(callback, solar_system_id) {
        this.executeQuery("getSolarSystemContent", [solar_system_id], (err, result) => {
            const planet_orbits = new Array();

            if (!err) {
                const planetRegister = new Object();
                const stationsRegister = new Object();
                const spaceshipRegister = new Object();
                const userRegister = new Object();

                result.forEach(row => {
                    if (row.planet_orbit_id !== null && typeof planetRegister[row.planet_orbit_id] === 'undefined') {
                        planetRegister[row.planet_orbit_id] = {
                            planet_orbit_id: row.planet_orbit_id,
                            name: row.name,
                            position_x: row.po_position_x,
                            position_y: row.po_position_y,
                            stations: new Array()
                        };

                        planet_orbits.push(planetRegister[row.planet_orbit_id]);
                    }

                    if (row.station_id !== null && typeof stationsRegister[row.station_id] === 'undefined') {
                        stationsRegister[row.station_id] = {
                            station_id: row.station_id,
                            position_x: row.s_position_x,
                            position_y: row.s_position_y,
                            docked_ships: new Array()
                        };

                        planetRegister[row.planet_orbit_id].stations.push(stationsRegister[row.station_id]);
                    }

                    if (row.spaceship_id !== null && typeof spaceshipRegister[row.spaceship_id] === 'undefined') {
                        spaceshipRegister[row.spaceship_id] = {
                            spaceship_id: row.spaceship_id
                        };

                        stationsRegister[row.station_id].docked_ships.push(spaceshipRegister[row.spaceship_id]);
                    }

                    if (row.user_id !== null && typeof userRegister[row.user_id] === 'undefined') {
                        userRegister[row.user_id] = {
                            user_id: row.user_id,
                            username: row.username
                        };

                        spaceshipRegister[row.spaceship_id].user = userRegister[row.user_id];
                    }
                });
            }

            callback && callback(err, planet_orbits);
        }, solar_system_id);
    }
}

module.exports = SolarSystemModel;