// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const fs = require('fs');
// const path = require('path');
// const io = require('socket.io')(http);

var express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const fs = require("fs");
const path = require("path");

let room_ids = new Map();
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/chatroom", function (req, res) {
  res.sendFile(__dirname + "/chatroom.html");
});

app.get("/script.js", function (req, res) {
  res.sendFile(__dirname + "/script.js");
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

app.get("/generate-room", function (req, res) {
  const random_number = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  room_ids.set(random_number, 0);
  console.log("New room:", random_number);
  res.send(random_number);
});

app.get("/get-rooms", function (req, res) {
  res.send([ ...room_ids.keys() ]);
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

// Start the server
server.listen(3000, () => {
  console.log("Server running...");
});
