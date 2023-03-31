const session = require('express-session');
const jwt = require('jwt');

module.exports = session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
});
