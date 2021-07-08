var app = require('express')();
var server = require('http').createServer(app);
const PORT = 8080;
const io = require('socket.io')(server, { cors: { origin: '*', } });

const STATIC_CHANNELS = ['global_notifications', 'global_chat'];

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => {
    console.log('new client connected');
    socket.emit('connection', null);
});