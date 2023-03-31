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

function createJWT(username, trophies){
  return jwt.sign({username, trophies}, "secure_secret", {
      expiresIn: expiry_time
  });
}

const authenticate = (req, res, next) => {
  let token = req.cookies.token;
  if(token){
      jwt.verify(token, "secure_secret", (error, truetoken) => {
          if(error){
              console.log(error);
              res.redirect("/login");
          }else{
              next();
          }
      });
  }else{
      res.redirect("/login");
  }
}

module.exports = { requireLogin, requireLogout, createJWT, authenticate};
