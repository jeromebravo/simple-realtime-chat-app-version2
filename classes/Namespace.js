class Namespace {
    constructor(name, endpoint) {
        this.name = name;
        this.endpoint = endpoint;
        this.rooms = [];
    }

    addRoom(room) {
        this.rooms.push(room);
    }
}

module.exports = Namespace;