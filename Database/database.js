var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 1000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    // port: 3306,
    // debug: false,
    // socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock', // A retirer sur le serveur
    // multipleStatements: true
});

module.exports.connection = connection;