function joinNamespace(endpoint) {
    nsSocket = io(`http://localhost:3000${endpoint}`);

    nsSocket.on('roomlist', nsRooms => {
        const roomlist = document.querySelector('#roomlist');
        roomlist.innerHTML = '<li class="description">TEXT CHANNELS</li>';

        nsRooms.forEach(room => {
            roomlist.innerHTML += `<li class="room">${room.name}</li>`
        });

        const rooms = Array.from(document.getElementsByClassName('room'));

        rooms.forEach(room => {
            room.addEventListener('click', () => {
                joinRoom(room.innerHTML);
                setActive(rooms, room, 'room-active');
            });
        });

        joinRoom(rooms[0].innerHTML);
        setActive(rooms, rooms[0], 'room-active');
    });

    nsSocket.on('newMessageToClients', chat => {
        const conversation = document.querySelector('#conversation');
        const date = new Date(chat.date).toLocaleString();
    
        conversation.innerHTML += `
            <li class="chat">
                <span class="username">${chat.username}</span>
                <span class="date">${date}</span>
                <p>${chat.text}</p>
            </li>
        `;
    });

    document.querySelector('#form').addEventListener('submit', e => {
        e.preventDefault();
        const message = document.querySelector('#message');
        
        if(message.value !== '') {
            nsSocket.emit('newMessageToServer', message.value);
            message.value = '';
        }
    });
}