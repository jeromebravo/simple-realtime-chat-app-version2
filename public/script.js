const username = prompt('Enter username: ');

const socket = io(`http://localhost:${window.location.port}`, {
    query: {
        username
    }
});

let nsSocket = '';

socket.on('serverlist', namespaces => {
    const serverlist = document.querySelector('#serverlist');
    serverlist.innerHTML = '';

    namespaces.forEach(namespace => {
        serverlist.innerHTML += `<div class="server" endpoint=${namespace.endpoint}>${namespace.name}</div>`;
    });

    const servers = Array.from(document.getElementsByClassName('server'));

    servers.forEach(server => {
        server.addEventListener('click', () => {
            const endpoint = server.getAttribute('endpoint');
            joinNamespace(endpoint);
            setActive(servers, server, 'server-active');
        });
    });

    joinNamespace(servers[0].getAttribute('endpoint'));
    setActive(servers, servers[0], 'server-active');
});