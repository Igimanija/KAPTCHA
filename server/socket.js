const {game_rooms} = require('./routes');

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('username', (room_id)=>{
            io.emit('username',game_rooms.get(room_id), room_id);
            let check = false;
            if(game_rooms.get(room_id).player2.username !== null){
                check = true;
                game_rooms.get(room_id).turn = Math.random() >= 0.5 ? 1 : 0;
                console.log(game_rooms.get(room_id).turn);
            }
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

        socket.on('my-turn', (room_id)=>{
            let player = game_rooms.get(room_id).player1.username;
            if(game_rooms.get(room_id).turn%2 === 1){
                player = game_rooms.get(room_id).player2.username;
            }
            io.emit('my-turn', player, room_id);
        });

        socket.on('answer', (room_id, username, checked_item)=>{
            let player_turn = game_rooms.get(room_id).player1.username;
            let next_player = game_rooms.get(room_id).player2.username;
            if(game_rooms.get(room_id).turn%2 === 1){
                player_turn = game_rooms.get(room_id).player2.username;
                next_player = game_rooms.get(room_id).player1.username;
            }
            if(player_turn !== username){
                return;
            }
            console.log(`${player_turn} should be playing`);
            game_rooms.get(room_id).turn++;
            io.emit('my-turn', next_player, room_id);
        });
    });
};
