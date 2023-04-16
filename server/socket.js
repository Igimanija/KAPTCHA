const {game_rooms} = require('./routes');

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('username', (room_id)=>{
            io.emit('username',game_rooms.get(room_id), room_id);
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
    function start_game(room_id){
        const rand = Math.random() >= 0.5 ? 1 : 0;
        game_rooms.get(req.params.id).turn = rand;
        io.emit("start_game", req.params.id);
    };
};
