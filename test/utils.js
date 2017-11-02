'use strict';
/**
 * Created Date: 2017-10-07 10:37:07
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-10-09 09:16:57
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
const fs = require("fs");
const path = require("path");

const cookie_path = path.join(__dirname, "cookie.txt");

exports.saveCookie = function(cookie) {
    fs.writeFileSync(cookie_path, cookie);
};

exports.loadCookie = function() {
    if (fs.existsSync(cookie_path)) {
        return fs.readFileSync(cookie_path);
    }
    return '';
};