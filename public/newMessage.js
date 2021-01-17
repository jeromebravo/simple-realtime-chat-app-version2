document.querySelector('#form').addEventListener('submit', e => {
    e.preventDefault();
    const message = document.querySelector('#message');

    nsSocket.emit('newMessageToServer', message.value);
});