module.exports = (io) => {
  io.on('connection', (socket) => {
      console.log('socket id: ' + socket.id);

      socket.on('message', (data) => {
          console.log(data);
          socket.broadcast.emit('message', data);
      });

      socket.on("message", (message, room_id) => {
          console.log(room_id, ": ", message);
          io.emit("message", message, room_id);
      });

      socket.on("disconnect", () => {
          console.log("a user disconnected");
      });
  });
};
