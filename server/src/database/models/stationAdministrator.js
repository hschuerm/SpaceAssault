const BaseModel = require("./base");

class StationAdministratorModel extends BaseModel {
    constructor() {
        super('station_administrator');
    }

    readOnStation(station_id, callback) {
        this.executeQuery("stationAdministratorWithQuests", [station_id], callback)
    }
}

module.exports = StationAdministratorModel;