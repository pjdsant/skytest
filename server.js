const http = require('http');
const app = require('./app');

const port = process.env.PORT || '2009';

const server = http.createServer(app);

server.listen(port);

module.exports = server;
