const app = require('express')();
const http = require('http').createServer(app);

const io = require('socket.io')(http);

const AuthorizationMiddleware = require('./middleware/AuthorizationMiddleware');
io.use(AuthorizationMiddleware.middleware);

require('./api')(io);

http.listen(9001, () => console.info('Zlack backend listening on *:9001'));
