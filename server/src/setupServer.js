const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);

const Config = require('./loader/config');

module.exports = () => {
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