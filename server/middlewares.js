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

module.exports = { requireLogin, requireLogout };
