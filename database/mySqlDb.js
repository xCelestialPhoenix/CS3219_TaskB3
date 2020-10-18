const mysql = require("mysql");
require('dotenv').config();

var config = {
    database: process.env.SQL_DATABASE
}

if(process.env.NODE_ENV === "production") {
    config.host = process.env.CLOUD_SQL_IP;
    config.user = process.env.CLOUD_SQL_USER;
    config.password = process.env.CLOUD_SQL_PASSWORD;
} else {
    config.user = process.env.LOCAL_SQL_USER;
    config.password = process.env.LOCAL_SQL_PASSWORD;
}

var connection = mysql.createConnection(config);

function executeQuery(sql, callback) {

    connection.query(sql, function (error, results, fields) {
        if (error) {
            return callback(error, null);
        } else {
            return callback(null, results);
        }
    });
 }
 
 function query(sql, callback) {
    executeQuery(sql, function (error, data) {
        if (error) {
            return callback(error);
        } else {
            callback(null, data);
        }
    });
 }

 module.exports = {
    query: query,
    connection: connection
 }