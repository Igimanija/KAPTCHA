const { game_rooms } = require('./routes');
const db = require("./db");

let num_q;
setupQA();

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('username', (room_id) => {
            io.emit('username', game_rooms.get(room_id), room_id);
            let check = false;
            if (game_rooms.get(room_id).player2.username !== null) {
                check = true;
                game_rooms.get(room_id).turn = Math.random() >= 0.5 ? 1 : 0;
                console.log(game_rooms.get(room_id).turn);
            }
            io.emit('game-start', check, room_id);
        });

        socket.on('message', (message, room_id) => {
            io.emit('message', message, room_id);
        });

        socket.on('logging', (room_id) => {
            var check = true;
            if (!game_rooms.has(room_id)) {
                check = false;
            }
            io.emit('logged', check, room_id);
        });

        socket.on('my-turn', (room_id) => {
            let player = game_rooms.get(room_id).player1.username;
            if (game_rooms.get(room_id).turn % 2 === 1) {
                player = game_rooms.get(room_id).player2.username;
            }
            const next_q = getNewNum(game_rooms.get(room_id).usedQ);
            //console.log("In socket1: ", next_q);
            io.emit('my-turn', player, next_q, room_id);
        });

        socket.on('answer', (room_id, username, checked_item) => {
            let player_turn = game_rooms.get(room_id).player1.username;
            let next_player = game_rooms.get(room_id).player2.username;
            if (game_rooms.get(room_id).turn % 2 === 1) {
                player_turn = game_rooms.get(room_id).player2.username;
                next_player = game_rooms.get(room_id).player1.username;
            }
            if (player_turn !== username) {
                return;
            }
            //console.log(`${player_turn} should be playing`);
            game_rooms.get(room_id).turn++;

            const next_q = getNewNum(game_rooms.get(room_id).usedQ);
            //console.log("In socket2: ", next_q);
            io.emit('my-turn', next_player, next_q, room_id);
        });
    });
};

function getNewNum(arr) {
    var boolean = true;
    let num;

    while (boolean) {
        num = Math.floor(Math.random() * num_q + 1);

        for (var i = 0; i < arr.length; i++) {
            var element = arr[i];
            //console.log("Number in arr " + element + ", random number " + number);
            if (element == num) {
                //console.log("true");
                boolean = true;
                break;
            }
            boolean = false;
        }
    }

    return num;
}

function setupQA() {
    db.query("select * from questions", (err, result) => {
        if (err) throw err;
        num_q = result.length;
    });
}