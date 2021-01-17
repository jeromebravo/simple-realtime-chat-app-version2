const express = require('express');
const socketio = require('socket.io');
const namespaces = require('./data/namespaces');
const app = express();

app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 3000;
const expressServer = app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

const io = socketio(expressServer);

io.on('connect', socket => {
    socket.emit('serverlist', namespaces);
});

namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on('connect', socket => {
        socket.emit('roomlist', namespace.rooms);

        socket.on('joinRoom', roomToJoin => {
            const roomToLeave = [...socket.rooms][1];

            socket.leave(roomToLeave);
            socket.join(roomToJoin);

            const roomJoined = namespace.rooms.find(room => room.name === roomToJoin);

            socket.emit('getHistory', roomJoined.history);
        });

        socket.on('newMessageToServer', message => {
            const username = socket.handshake.query.username;

            const fullMessage = {
                username: username,
                text: message,
                date: Date.now()
            };
            
            const roomName = [...socket.rooms][1];
            const roomJoined = namespace.rooms.find(room => room.name === roomName);
            
            roomJoined.addMessage(fullMessage);
            
            io.of(namespace.endpoint).to(roomName).emit('newMessageToClients', fullMessage);
        });
    });
});