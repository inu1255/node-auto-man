'use strict';
/**
 * Created Date: 2017-09-28 09:50:20
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-10-09 11:19:03
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
require('should');
const request = require('supertest');
const utils = require("./utils");

var url = 'http://localhost:3000';
var userCookie = utils.loadCookie();

var profile = {
    title: '929909260@qq.com',
    password: '123456',
};
it('登录', function(done) {
    request(url)
        .post('/user/login')
        .send(profile)
        .expect('Content-Type', /json/)
        .expect(200) //Status code
        .end(function(err, res) {
            if (err) {
                throw err;
            }
            console.log("success res==>", res.body);
            // Should.js fluent syntax applied
            // res.body.no.should.equal(200);
            userCookie = res.headers['set-cookie'] || '';
            utils.saveCookie(userCookie);
            done();
        });
});