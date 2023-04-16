const express = require("express");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const router = express.Router();
const db = require("./db");
const {
  requireLogin,
  requireLogout,
  createJWT,
  authenticate,
} = require("./middlewares");
const game_rooms = new Map();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views", "index.html"));
});

router.get("/lobby", authenticate, requireLogin, async (req, res) => {
  const userInfo = await accountInfo2(req);
  const filePath = path.join(__dirname, "../public/views", "lobby.html");
  fs.readFile(filePath, "utf-8", (err, fileContent) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading chatroom");
      return;
    }
    const modified = fileContent
      .replace("{{email}}", userInfo.email)
      .replace("{{username}}", userInfo.username)
      .replace("{{trophies}}", userInfo.trophies);
    res.send(modified);
  });
});

router.get("/login", requireLogout, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views", "login.html"));
});

router.get("/register", requireLogout, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views", "register.html"));
});

router.post("/register", requireLogout, (req, res) => {
  const { username, email, password } = req.body;
  db.query(
    "Select username  from users where username = ?",
    req.body.username,
    function (error, result) {
      if (result.length > 0) {
        res.redirect("/register");
        return;
      }
      db.query(
        "Insert into users (username, email, password) values (?,?,?)",
        [
          username,
          email,
          crypto.createHash("sha256").update(password).digest("hex"),
        ],
        function (error, result) {
          if (error) throw error;
          res.redirect("/login");
        }
      );
    }
  );
});

router.post("/login", requireLogout, (req, res) => {
  db.query(
    "Select username, password from users where username = ?",
    req.body.username,
    function (error, result) {
      if (error) throw error;
      if (result.length === 0) {
        res.redirect("/login");
        return;
      }
      var testpass = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");
      if (result[0].password == testpass) {
        req.session.username = req.body.username;
        let token = createJWT(result[0].username);
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 4 * 60 * 60 * 1000,
        });
        res.redirect("/lobby");
      } else {
        res.redirect("/login");
      }
    }
  );
});

router.get('/logout', (req, res) => {
  res.clearCookie("token");
  req.session.destroy();
  res.redirect('/login');
});

router.post("/rooms/:username", requireLogin, (req, res) => {
  const { username } = req.params;
  if (game_rooms.has(username)) {
    res.status(400);
    res.send({ message: "Room already exists" });
    return;
  }
  const room = {
    player1: {
      username: null,
      trophies: null,
      current_points: 0,
    },
    player2: {
      username: null,
      trophies: null,
      current_points: 0,
    },
    turn: 0,
  };
  game_rooms.set(username, room);
  res.send({ message: "Room created" });
});

router.get("/rooms", requireLogin, (req, res) => {
  res.json(Object.fromEntries(game_rooms));
});

router.delete("/rooms/:username", requireLogin, (req, res) => {
  const { username } = req.params;

  if (!game_rooms.has(username)) {
    res.status(400);
    res.send({ message: "Room does not exist" });
    return;
  }
  game_rooms.delete(username);
  res.redirect('/lobby');
});

router.get("/chatroom/:id", requireLogin, (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, "../public/chatroom.html");
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

/*****
 *
 * Lobby Info
 */

router.get("/accountInfo2", authenticate, requireLogin, async (req, res) => {
  res.send(await accountInfo2(req));
});

function accountInfo2(req) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [req.session.username],
      (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length === 0) {
          reject(new Error("Account not found"));
        } else {
          const accountInfo = {
            username: result[0].username,
            email: result[0].email,
            trophies: result[0].trophies,
          };
          resolve(accountInfo);
        }
      }
    );
  });
}

/**
 * go into gameroom
 */

router.get("/room/:id", authenticate, requireLogin, async (req, res) => {
  if (!game_rooms.has(req.params.id)) {
    res.redirect('/lobby');
    return;
  }  


  const userInfo = await accountInfo2(req);
  const new_player = game_rooms.get(req.params.id); 
  if(new_player.player1.username === null){
    new_player.player1.username = userInfo.username;
    new_player.player1.trophies = userInfo.trophies;
  }else if(new_player.player2.username === null){
    if(new_player.player1.username === userInfo.username){
    res.redirect('/lobby');
    return;  
    }
    new_player.player2.username = userInfo.username;
    new_player.player2.trophies = userInfo.trophies;
  }else{
    res.redirect('/lobby');
    return;
  }

  const filePath = path.join(__dirname, "../public/views", "room.html");
  fs.readFile(filePath, "utf-8", (err, fileContent) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error reading room");
            return;
        }
        const modified = fileContent
            .replace("{{username}}", new_player.player1.username)
            .replace("{{trophies}}", new_player.player1.trophies);
        res.send(modified);
    });
});

module.exports = {router, game_rooms};
