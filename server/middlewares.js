const jwt = require('jsonwebtoken');

const expiry_time = 4 * 60 * 60;

function requireLogin(req, res, next) {
  if (!req.session.username) {
    res.redirect('/login');
  } else {
    next();
  }
}

function requireLogout(req, res, next) {
  if (req.session.username) {
    res.redirect('/lobby');
  } else {
    next();
  }
}

function createJWT(username) {
  return jwt.sign({ username }, "secure_secret", {
    expiresIn: expiry_time
  });
}



const authenticate = (req, res, next) => {
  let token = req.cookies.token;
  if (token) {
    jwt.verify(token, "secure_secret", (error, truetoken) => {
      if (error) {
        res.clearCookie("token");
        req.session.destroy();
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    req.session.destroy();
    res.redirect("/login");
  }
}

module.exports = { requireLogin, requireLogout, createJWT, authenticate };
