function joinRoom(roomName) {
    nsSocket.emit('joinRoom', roomName);

    nsSocket.on('getHistory', history => {
        const conversation = document.querySelector('#conversation');
        conversation.innerHTML = '';

        if(history.length > 0) {
            history.forEach(chat => {
                const date = new Date(chat.date).toLocaleString();

                conversation.innerHTML += `
                    <li class="chat">
                        <span class="username">${chat.username}</span>
                        <span class="date">${date}</span>
                        <p>${chat.text}</p>
                    </li>
                `;
            });
        }
    });
}