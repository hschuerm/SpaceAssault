const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const Config = require('./loader/config');

module.exports = () => {
    const app = express();

    const clientPath = __dirname + '/../../client/build/';
    app.use(express.static(clientPath));
    app.get('/*', function (req, res) {
        res.sendFile(path.join(clientPath), function (err) {
            if (err) {
                res.status(500).send(err)
            }
        })
    });

    const httpServer = http.createServer(app);

    const socketServer = new Server(httpServer, Config.websocket);

    socketServer.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    const { port } = Config.http;

    httpServer.listen(Config.http.port, () => {
        console.log(`listening on port ${port}`);
    });

    return { httpServer, socketServer };
};