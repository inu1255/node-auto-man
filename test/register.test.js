'use strict';
/**
 * Created Date: 2017-09-30 12:42:57
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-10-09 15:36:38
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
require('should');
const request = require('supertest');
const utils = require("./utils");
var url = 'http://localhost:3000';
var userCookie = utils.loadCookie();
const co = require("co");
const knex = require("../common/knex").db;

it('注册', function(done) {
    var profile = {
        account:'inu1255',
        title: '929909260@qq.com',
        password: '123456'
    };
    profile = {
        account:'inu1255',
        title: '18782071219@163.com',
        password: '123456'
    };
    co(function*() {
        let one = yield knex("verify").where("title", profile.title).first();
        profile.code = one.code;
        console.log("use code", profile.code);
        request(url)
            .post('/user/register')
            .send(profile)
            .expect('Content-Type', /json/)
            .expect(200) //Status code
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                console.log("success res==>", res.body);
                if (res.body.no===200) {
                    userCookie = res.headers['set-cookie'];
                    utils.saveCookie(userCookie);
                }
                done();
            });
    });
});