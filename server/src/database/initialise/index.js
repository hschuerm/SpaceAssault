const Config = require('../../loader/config');

const mysql = require('mysql');

const InitUser = require('./user');

module.exports = (callback) => {
    console.info(`trying to connect to database ${JSON.stringify(Config.database, null, 2)}`);

    const connection = mysql.createConnection(Config.database);

    connection.connect((err) => {
        if (err) {
            console.error(err);

            return;
        }
        console.info(`initilaise database`);

        InitUser(connection);

        callback && callback(connection);
    });

};