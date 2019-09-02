const app = require('express')();
const http = require('http').createServer(app);

const io = require('socket.io')(http);
require('./app')(io);

http.listen(9001, () => console.info('Zlack backend listening on *:9001'));
