var express = require("express");
const session = require('express-session');
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

app.use(express.static(path.join(__dirname, '../public')));



server.listen(3001, ()=>{
    console.log('Server running...');
});

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "secure_wa"
});

conn.connect(function(error) {
    if(error) throw error;
    console.log("Connected");
});

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
  }));
  
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("./"));
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.post("/login", requireLogout, (req, res) => {
    conn.query("Select username, password from users where username = ?", req.body.username, function (error, result) {
        if(error) throw error;
        if(result.length === 0){
            // this is just a quick solution
            res.redirect("/login");
            return;
        }
        // console.log(result);
        var testpass = crypto.createHash('sha256').update(req.body.password).digest('hex');
        if(result[0].password == testpass){
            console.log("test123");
            req.session.username = req.body.username;
            res.redirect("/lobby")
        }else{
            res.redirect("/login");
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


app.post("/rooms/:username", requireLogin,(req, res) => {
        const {username}=req.params;
        if(server_room.includes(username)){
            res.status(400)
            res.send({"message":"Room already exists"})
            return;
        }
        
        server_room.push(username);
        res.send({"message":"Room created"})
})

app.get("/rooms", requireLogin,(req, res) => {
    res.send(server_room);
})

app.delete("/rooms/:username",requireLogin,(req, res) => {
    const {username}=req.params;
    if(!server_room.includes(username)){
        res.status(400)
        res.send({"error":"Room does not exists"})
        return;
    }
   const roomDelete= server_room.splice(server_room.indexOf(username),1);
    res.send({"success":"Room deleted "+roomDelete})
})


app.get('/lobby', requireLogin,(req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'lobby.html'));
});

app.get('/login', requireLogout,(req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

app.get("/chatroom.html/:id", requireLogin,(req, res) => {
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

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
  }));

function requireLogin(req, res, next) {
    if (!req.session.username) {
      res.redirect('/login');
    } else {
      next();
    }
  }
  
  function requireLogout(req, res, next) {
    if (req.session.username) {
      res.redirect('/');
    } else {
      next();
    }
  }
