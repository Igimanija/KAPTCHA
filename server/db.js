const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "secure_wa"
});

conn.connect(function(error) {
    if(error) throw error;
    console.log("Connected");
});

module.exports = conn;
