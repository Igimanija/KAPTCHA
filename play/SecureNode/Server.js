const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

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

app.get('/', requireLogin, (req, res) => {
  res.send(`
    <h1>Welcome ${req.session.username}!</h1>
    <p><a href="/page1">Page 1</a></p>
    <p><a href="/page2">Page 2</a></p>
    <p><a href="/logout">Logout</a></p>
  `);
});

app.get('/page1', requireLogin, (req, res) => {
  res.send(`
    <h1>Page 1</h1>
    <p><a href="/">Home</a></p>
  `);
});

app.get('/page2', requireLogin, (req, res) => {
  res.send(`
    <h1>Page 2</h1>
    <p><a href="/">Home</a></p>
  `);
});

app.get('/login', requireLogout, (req, res) => {
  res.send(`
    <form method="post">
      <label>
        Username:
        <input type="text" name="username">
      </label>
      <br>
      <label>
        Password:
        <input type="password" name="password">
      </label>
      <br>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.username = user.username;
    res.redirect('/');
  } else {
    res.send('Invalid username or password');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});