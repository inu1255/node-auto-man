/**
 * Created Date: 2017-09-27 14:33:43
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-09-29 14:47:16
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
const knex = require('knex');
const config = require("./config");

const options = {
    client: 'mysql',
    connection: config.mysql,
    pool: {
        min: 0,
        max: 50,
        afterCreate: function(conn, done) {
            done();
        }
    },
    debug: config.dev, //指明是否开启debug模式，默认为true表示开启
    acquireConnectionTimeout: 10000, //指明连接计时器大小，默认为60000ms
};
const db = knex(options);

exports.db = db;
exports.options = options;
exports.express = function(req, res, next) {
    req.db = db;
    next();
};