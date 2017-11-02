'use strict';
/**
 * Created Date: 2017-10-07 10:35:31
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-10-09 11:19:17
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
require('should');
const request = require('supertest');
const utils = require("./utils");

var url = 'http://localhost:3000';
var userCookie = utils.loadCookie();

it('获取账号信息', function(done) {
    request(url)
        .get('/user/whoami')
        .set('Cookie', userCookie)
        .expect('Content-Type', /json/)
        .expect(200) //Status code
        .end(function(err, res) {
            if (err) {
                throw err;
            }
            console.log("success res==>", res.body);
            done();
        });
});