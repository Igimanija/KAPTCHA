const express = require('express');
const http = require('http');
const socketIo = require('./socket');
const router = require('./routes');
const app = express();
const { sessionMiddleware } = require('./session');
const parser = require('body-parser');
const server = http.createServer(app);

// app.use(middleware);
app.use('/', router);
app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

socketIo.attach(server);

server.listen(3001, () => {
  console.log('Server running...');
});
