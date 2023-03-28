var express = require("express");
var parser = require("body-parser");
var mysql = require("mysql2");
var crypto = require('crypto');
const { Socket } = require("engine.io");



const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: '*'}});
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");

var questionArr = [];
const expirytime = 4 * 60 * 60;


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
    setupQA();
});

const authenticate = (req, res, next) => {
    let token = req.cookies.token;
    console.log(token);
    if(token){
        jwt.verify(token, "secure_secret", (error, truetoken) => {
            if(error){
                console.log(error);
                res.redirect("login.html");
            }else{
                //console.log(truetoken);
                next();
            }
        });
    }else{
        res.redirect("login.html");
    }
}

app.use(express.static("./"));
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
app.use(cookieparser());

app.get("/", (req, res) => {
    res.redirect("index.html");
}).listen(3000);

app.post("/login", (req, res) => {
    conn.query("Select * from users where username = ?", req.body.username, function (error, result) {
        if(error) throw error;
        //console.log(result);
        var testpass = crypto.createHash('sha256').update(req.body.password).digest('hex');
        if(result[0].password == testpass){
            let token = createJWT(result[0].username, result[0].trophies);
            res.cookie('token', token, {httpOnly: true, maxAge: expirytime * 1000});
            res.redirect("lobby");
        }else{
            res.redirect("login.html");
        }
    });
});

app.get("/lobby", authenticate, (req, res) => {
    res.redirect("lobby.html");
});

app.get("/start", (req, res) => {
    //console.log(questionArr);
    res.json(getNewQ([-1]));
});

app.get("/newQuestion", (req,res) => {
    let usedNum = req.body.numArr;
    res.json(getNewQ([usedNum]));
});


io.on('connection', (socket)=>{
    console.log('socket id: ' + socket.id);
    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('message', data);
    });
});

function getNewQ(alreadyUsedID){
    var boolean = true;
    let number;

    while(boolean){
        number = Math.floor(Math.random() * (questionArr.length - 1 + 1) + 1);
        
        for(var i = 0; i<alreadyUsedID.length;i++){
            var element = alreadyUsedID[i];
            //console.log("Number in arr " + element + ", random number " + number);
            if(element == number){
                //console.log("true");
                boolean = true;
                break;
            }
            boolean = false;
        }
    }

    return questionArr[number-1];

}

function setupQA(){
    conn.query("Select * from questions", function (error, result) {
        if(error) throw error;
        //console.log(result);
        questionArr = result;
    });
}

function createJWT(username, trophies){
    return jwt.sign({username, trophies}, "secure_secret", {
        expiresIn: expirytime
    });
}