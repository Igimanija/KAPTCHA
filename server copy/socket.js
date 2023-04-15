const { Server } = require('socket.io');
const io = new Server({
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('message', (data) => {
    console.log(data);
    socket.broadcast.emit('message', data);
  });
});

module.exports = io;
