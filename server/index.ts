import { ChatServer } from './chatServer';

const path = require('path');
const express = require('express');

var app = require('express')();
express.static(path.resolve(__dirname, '../client/build'))
var server = require('http').createServer(app);
const PORT = 8080;
const io = require('socket.io')(server, { cors: { origin: '*', } });

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

// start strategery here
// io.on('connection', (socket) => {
//     console.log("connection 2");
//     socket.on('disconnect', () => {
//         console.log("also disconnected");
//     })
// });

//#region Chat socket stuff

new ChatServer().start(app, io);

//#endregion