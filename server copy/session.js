const session = require('express-session');

const sessionMiddleware = session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
});

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

module.exports = {
  sessionMiddleware,
  requireLogin,
  requireLogout
};