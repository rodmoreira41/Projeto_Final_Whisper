'user strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'mysql',
  //host: 'localhost',
  user: 'root',
  password: '12345678',
  database: "movies"
});

connection.connect(function (err) {
  if (err) {
    console.log('Error on database connection.');
    throw err;
  }
  console.log('Database connection active.');
});

module.exports = connection;