const {game_rooms} = require('./routes');

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('username', (room_id)=>{
            io.emit('username',game_rooms.get(room_id), room_id);
            let check = false;
            if(game_rooms.get(room_id).player2.username !== null){
                check = true;
            }
            console.log(check);
            io.emit('game-start', check, room_id);
        });

        socket.on('message', (message, room_id)=>{
            io.emit('message', message, room_id);
        });

        socket.on('logging', (room_id)=>{
            var check = true;
            if(!game_rooms.has(room_id)){
                check = false;
            }
            io.emit('logged', check, room_id);
        });
    });
};
