function solarSystemEvents(socketServer, socket, solar_system) {
    socket.on('read solar_system', (solar_system_id) => {
        solar_system.read(solar_system_id, (err, result) => {
            if (err) {
                console.error(err.message);

                return;
            }
            socket.emit('solar_system', result);
        });
    });

    socket.on('get content of solar_system', (solar_system_id) => {
        solar_system.getContent((err, content) => {
            if (err) {

                console.error(err.message);

                return;
            }
            socket.emit('content of solar_system', content);
        }, solar_system_id);
    });
};

module.exports = solarSystemEvents;