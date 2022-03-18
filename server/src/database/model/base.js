const fs = require('fs');
const path = require('path');

const { Connection } = require('../connector');

class BaseModel {
    constructor(tableName) {
        this.data = new Object();
        this.tableName = tableName;
    }

    executeQuery(queryName, ...args) {
        const pathToQuery = path.resolve(__dirname + `/../queries/${queryName}.sql`);
        fs.readFile(pathToQuery, (err, blob) => {
            if (err) {
                callback && callback(err);

                return;
            }

            this.executeSql(blob.toString(), ...args);
        });
    }

    executeSql(...args) {
        Connection.instance.query(...args);
    }

    create(data, callback) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        const columnNames = Object.keys(data[0]);
        const rowRenderer = (row) => "(" + columnNames.map(columnName => "'" + row[columnName] + "'").join(',') + ")";

        const sql = "INSERT INTO " + this.tableName + " (" + columnNames.join(',') + ") VALUES " + data.map(rowRenderer) + ";";

        this.executeSql(sql, callback);
    }

    read(id, callback) {
        const sql = "SELECT * FROM " + this.tableName + " WHERE solar_system_id = " + id + ";";

        this.executeSql(sql, (err, result) => callback(err, result[0]));
    }

    update() {

    }

    delete() {

    }

    toJson() {

        return this.data;
    }
}

module.exports = BaseModel;