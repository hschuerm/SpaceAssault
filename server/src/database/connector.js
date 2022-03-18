const Config = require('../loader/config');

const mysql = require('mysql');

class Connection {
    constructor() {

        return Connection.instance;
    }

    static setConntection(conn) {
        Connection.instance = conn;
    }
}

function connect(callback) {
    console.info(`trying to connect to database ${JSON.stringify(Config.database, null, 2)}`);

    const connection = mysql.createConnection(Config.database);

    connection.connect((err) => {
        if (err) {
            console.error(err);

            return;
        }

        const sql = `
            SELECT 1+1 AS result;
        `;
        connection.query(sql, (err, result) => {
            if (err) {

                console.error(err);

                return;
            }

            console.info(`database returned 1+1 = ${result[0].result}`)

            console.info(`connection successful`);
            callback && callback(connection);
            Connection.setConntection(connection);
        });
    });
}

module.exports = { connect, Connection };