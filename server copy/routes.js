const express = require('express');
const conn = require('./db');
const crypto = require('crypto');
const path = require('path');
const router = express.Router();
router.use(express.static(path.join(__dirname, '../public')));


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/lobby', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'lobby.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.get('/chatroom/:id', (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, '../public/chatroom.html');
  fs.readFile(filePath, 'utf-8', (err, fileContent) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading chatroom');
      return;
    }
    const modified = fileContent.replace('{{id}}', id);
    res.send(modified);
  });
});

router.get('/rooms', (req, res) => {
  res.send(server_room);
});


router.post('/login', (req, res) => {
  conn.query(
    'SELECT username, password FROM users WHERE username = ?', req.body.username,
    (error, result) => {
      if (error) throw error;
      if (result.length === 0) {
        res.redirect('/login');
        return;
      }
      const testpass = crypto.createHash('sha256').update(req.body.password).digest('hex');
      if (result[0].password == testpass) {
        res.redirect('/lobby');
      } else {
        res.redirect('/login');
      }
    }
  );
});

router.post('/rooms/:username', (req, res) => {
  const { username } = req.params;
  if (server_room.includes(username)) {
    res.status(400);
    res.send({ message: 'Room already exists' });
    return;
  }

  server_room.push(username);
  res.send({ message: 'Room created' });
});



router.delete('/rooms/:username', (req, res) => {
  const { username } = req.params;
  if (!server_room.includes(username)) {
    res.status(400);
    res.send({ error: 'Room does not exists' });
    return;
  }
  const roomDelete = server_room.splice(server_room.indexOf(username), 1);
  res.send({ success: 'Room deleted ' + roomDelete });
});

module.exports = router;
