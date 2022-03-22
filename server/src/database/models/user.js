const BaseModel = require("./base");
const SpaceshipModel = require('./spaceShip');

class UserModel extends BaseModel {
    constructor(username) {
        super('user');
        this.username = username;

        this.isLoggedIn = false;
    }

    readByUsername(username, callback) {
        const sql = "SELECT * FROM user WHERE username = '" + username + "';";
        this.executeSql(sql, callback);
    }

    login(password, callback) {
        this.readByUsername(this.username, (err, result) => {
            let user = null;
            if (result.length <= 0) {
                err = new Error('User not found');
            } else {
                user = result[0];

                if (password !== user.password) {
                    err = new Error('Wrong password');
                }
            }

            if (!err) {
                this.data = user;
                this.isLoggedIn = true;
            }

            callback && callback(err, user);
        });
    }

    register(password, email, callback) {
        const userData = {
            username: this.username,
            password,
            email
        };
        this.create(userData, (err, result) => {
            if (err) {

                console.error(err.message);
                return;
            }

            callback && callback();
            console.info("user " + this.username + " registered");
        });
    }

    updateUserStation(user_id, new_station_id, callback) {
        this.executeQuery("updateStationOfUser", [new_station_id, user_id], (err) => {
            if (err) {
                console.error(err);

                return;
            }

            callback && callback();
        });
    }

    acceptsQquest(user_id, quest_id, callback) {
        this.executeQuery("userAcceptsQuest", [user_id, quest_id], callback);
    }

}

module.exports = UserModel;