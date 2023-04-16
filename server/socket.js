const {game_rooms} = require('./routes');

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('username', (room_id)=>{
            io.emit('username',game_rooms.get(room_id), room_id);
        });

        socket.on('message', (message, room_id)=>{
            io.emit('message', message, room_id);
        });


        // console.log(game_rooms);
        // console.log('socket id: ' + socket.id);

        // socket.on('username', (username, room_id) => {
        //    io.emit("message", username + " connected!", room_id); 
        // });

        // socket.on('message', (data) => {
        //     console.log(data);
        //     socket.broadcast.emit('message', data);
        // });

        // socket.on("message", (message, room_id) => {
        //     io.emit("message", message, room_id);
        // });


        // socket.on('join-room', (game_rooms, room_id)=>{
        //     io.emit('join', game_rooms, room_id);
        // });

        // socket.on("disconnect", () => {
        //     console.log("a user disconnected");
        // });
    });
};
