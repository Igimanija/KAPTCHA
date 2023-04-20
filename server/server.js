const express = require("express");
const http = require('http');
const path = require("path");
const socketIO = require('socket.io');
const bodyParser = require("body-parser");
const session = require('./session');
const { router } = require('./routes');
const attachSocketIO = require('./socket');
const db = require('./db');
const cookieparser = require("cookie-parser");
const helmet = require("helmet");
// const { application } = require("express");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });

// app.use(helmet());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session);
app.use(cookieparser());
app.use(router);
app.set('socket.io', io)
app.disable("x-powered-by");

attachSocketIO(io);


server.listen(3000, () => {
    console.log('Server running...');
});