class Room {
    constructor(name, namespace) {
        this.name = name;
        this.namespace = namespace;
        this.history = [];
    }

    addMessage(message) {
        this.history.push(message);
    }
}

module.exports = Room;