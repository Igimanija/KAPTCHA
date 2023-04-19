const session = require('express-session');

module.exports = session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: 'strict',
    }
});
