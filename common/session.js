/**
 * Created Date: 2017-09-27 14:13:07
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-09-30 09:34:34
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const sessionMiddleware = session({
    name: 'session',
    store: new RedisStore({
        prefix: "qianxun:"
    }),
    secret: '652927164',
    resave: true,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        signed: false
    },
});

const recoverMiddleWare = function(req, res, next) {
    var tries = 3;
    sessionMiddleware(req, res, lookupSession);

    function lookupSession(error) {
        if (error) {
            return next(error);
        }
        tries -= 1;
        if (req.session !== undefined) {
            return next();
        }
        if (tries < 0) {
            return next(new Error('oh no'));
        }
        sessionMiddleware(req, res, lookupSession);
    }
};

module.exports = recoverMiddleWare;