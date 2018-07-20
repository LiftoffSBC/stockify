// Set up MySQL connection.
var mysql = require('mysql');

var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'wiad5ra41q8129zn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'djhehl6pk55pq5vf',
        password: 'mrhtf0sikrvugpfn',
        database: 'uk7v5q6yl6m6cx41',
    });
};

connection.connect();
// Export connection for our ORM to use.
module.exports = connection;
