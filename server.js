var express = require("express");
var parser = require("body-parser");
var mysql = require("mysql2");
var crypto = require('crypto');
const { Socket } = require("engine.io");

const fs = require("fs");
const path = require("path");

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: '*'}});
const server_room=[];
const room_ids = new Map();
// app.use(express.static("public"));

server.listen(3001, ()=>{
    console.log('Server running...');
});

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "secure_wa"
});

conn.connect(function(error) {
    if(error) throw error;
    console.log("Connected");
});

app.use(express.static("./"));
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.redirect("index.html");
}).listen(3000);

app.post("/login", (req, res) => {
    conn.query("Select username, password from users where username = ?", req.body.username, function (error, result) {
        if(error) throw error;
        //console.log(result);
        var testpass = crypto.createHash('sha256').update(req.body.password).digest('hex');
        if(result[0].password == testpass){
            res.redirect("lobby.html")
        }else{
            res.redirect("login.html");
        }
    });
});


io.on('connection', (socket)=>{
    console.log('socket id: ' + socket.id);
    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('message', data);
    });
});


app.post("/rooms", (req, res) => {
        const {username}=req.body;
        if(server_room.includes(username)){
            res.status(400)

            res.send({"error":"Room already exists"})
            return;
        }
        server_room.push(username);
        res.send({"success":"Room created"})
})

app.get("/rooms/", (req, res) => {
    res.send(server_room);
})

app.delete("/rooms/:username",(req, res) => {
    const {username}=req.params;
    if(!server_room.includes(username)){
        res.status(400)
        res.send({"error":"Room does not exists"})
        return;
    }
   const roomDelete= server_room.splice(server_room.indexOf(username),1);
    res.send({"success":"Room deleted "+roomDelete})
})


/*
* create room CRUD done
* START GAME call the questions from the db
* after each question each question is popped from the result array
* the users will only be able to communicate with people they are against
* every user that is playing will be the blue while the opponent will be the red
*/






app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/chatroom", function (req, res) {
  res.sendFile(__dirname + "/chatroom.html");
});



// app.get('/mess.js', function(req, res) {
//     res.sendFile(__dirname + '/mess.js');
// });

app.get("/chatroom.html/:id", (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, "/chatroom.html");
  fs.readFile(filePath, "utf-8", (err, fileContent) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading chatroom");
      return;
    }
    const modified = fileContent.replace("{{id}}", id);
    res.send(modified);
  });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (message, room_id) => {
    console.log(room_id, ": ", message);
    io.emit("message", message, room_id);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});


