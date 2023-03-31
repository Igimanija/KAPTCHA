const express = require("express");
const http = require('http');
const path = require("path");
const socketIO = require('socket.io');
const bodyParser = require("body-parser");
const session = require('./session');
const routes = require('./routes');
const attachSocketIO = require('./socket');
const db = require('./db');
const cookieparser = require("cookie-parser");
// const { application } = require("express");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session);
app.use(cookieparser());
app.use(routes);

attachSocketIO(io);

server.listen(3001, () => {
    console.log('Server running...');
});
