'use strict';
// Update with your config settings.
const mysql = require("./common/config").mysql;

module.exports = {
    client: 'mysql',
    connection: mysql,
    pool: {
        min: 0,
        max: 50,
        afterCreate: function(conn, done) {
            done();
        }
    },
    acquireConnectionTimeout: 10000, //指明连接计时器大小，默认为60000ms
    // development: ,
    // staging: options,
    // production: options
};