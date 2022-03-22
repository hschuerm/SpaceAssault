const UserModel = require('../database/models/user');

function userEvents(socketServer, socket, solar_system) {

    socket.on('register', ({ username, password, email = null }) => {
        const user = new UserModel(username);
        user.register(password, email, () => {
            solar_system.getContent((err, content) => {
                if (err) {

                    console.error(err.message);

                    return;
                }
                socketServer.emit('content of solar_system', content);
            }, 1);

            user.login(password, (err) => {

                if (!user.isLoggedIn) {

                    socket.emit('login failed: ' + err.message);

                    return;
                }

                socket.emit('login successfull', user.toJson());
            });
        });
    });

    socket.on('login', ({ username, password }) => {
        const user = new UserModel(username);
        user.login(password, (err) => {

            if (!user.isLoggedIn) {

                socket.emit('login failed: ' + err.message);

                return;
            }

            socket.emit('login successfull', user.toJson());
        });
    });

    socket.on('user changed station', ({ user_id, new_station_id }) => {
        const user = new UserModel();
        user.updateUserStation(user_id, new_station_id, () => {
            solar_system.getContent((err, content) => {
                if (err) {

                    console.error(err.message);

                    return;
                }
                socketServer.emit('content of solar_system', content);
            }, 1);
        });
    });

    socket.on('user accepts quest', ({ user_id, quest_id }) => {
        const user = new UserModel();
        user.acceptsQquest(user_id, quest_id, (err) => {
            if (err) {

                console.error(err.message);

                return;
            }
        });
    });
};

module.exports = userEvents;