const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'secure_wa'
});

conn.connect((error) => {
  if (error) throw error;
  console.log('Connected to database');
});

module.exports = conn;
