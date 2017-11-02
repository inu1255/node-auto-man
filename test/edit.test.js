'use strict';
/**
 * Created Date: 2017-09-30 12:42:57
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-10-09 11:19:00
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
require('should');
const request = require('supertest');
const utils = require("./utils");
var url = 'http://localhost:3000';
var userCookie = utils.loadCookie();

it('修改个人信息', function(done) {
    var profile = {
        name: "inu1255",
        zi: "天长",
        birthday: "1313-12-12",
        birthtime: "55:11",
        idcard: "511511131312121111",
        avatar: "guigui",
        desc: "没有介绍",
    };
    request(url)
        .post('/user/edit')
        .set('Cookie', userCookie)
        .send(profile)
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