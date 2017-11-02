'use strict';
/**
 * Created Date: 2017-10-04 19:02:42
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-10-09 11:19:11
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
'use strict';
/**
 * Created Date: 2017-09-30 12:42:57
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-09-30 12:56:06
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
require('should');
const request = require('supertest');
var url = 'http://localhost:3000';

const emails = [
    "929909260@qq.com",
    "18782071219@163.com"
];

it('发送邮箱验证码', function(done) {
    const email = emails[1];
    request(url)
        .get('/user/send-code?title=' + email)
        .expect('Content-Type', /json/)
        .expect(200) //Status code
        .end(function(err, res) {
            if (err) {
                throw err;
            }
            console.log("验证码 res==>", res.body);
            done();
        });
});