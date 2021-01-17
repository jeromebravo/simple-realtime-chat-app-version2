const Namespace = require('../classes/Namespace');
const Room = require('../classes/Room');

const namespaces = [];

const A = new Namespace('A', '/a');
const B = new Namespace('B', '/b');
const C = new Namespace('C', '/c');

A.addRoom(new Room('Valorant', 'A'));
A.addRoom(new Room('CSGO', 'A'));
A.addRoom(new Room('Call Of Duty', 'A'));

B.addRoom(new Room('Fortnite', 'B'));
B.addRoom(new Room('PUBG', 'B'));
B.addRoom(new Room('Apex', 'B'));

C.addRoom(new Room('LoL', 'C'));
C.addRoom(new Room('Dota', 'C'));

namespaces.push(A, B, C);

module.exports = namespaces;