const mysql = require("mysql2");

//
process.env.MYSQL_DB_HOST = process.env.DB_HOST || "127.0.0.1";
process.env.MYSQL_DB_USER = process.env.DB_USER || "idpuser";
process.env.MYSQL_DB_PASSWORD = process.env.DB_PASSWORD || "idppwd";
process.env.MYSQL_DB_SCHEME = process.env.DB_SCHEME || "idp";
//

var connection = mysql.createPool({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_SCHEME,
});

/*
const connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'idpuser',
  password : 'idppwd',
  database: 'idp'
});
*/

module.exports = connection;
