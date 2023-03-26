var express = require("express");
var parser = require("body-parser");
var mysql = require("mysql2");
var crypto = require('crypto');
const { Socket } = require("engine.io");



const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: '*'}});


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