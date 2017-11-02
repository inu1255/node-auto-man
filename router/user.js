/**
 * Created Date: 2017-09-29 15:01:20
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 */
const co = require("co");
const knex = require("../common/knex").db;
const email = require("../common/email");
const config = require("../common/config");
const logger = require("../common/log").logger;

/**** 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1 ****/
const CHARS = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
const NUMBERS = '0123456789';
const USERINFO = ["id", "email", "account", "name", "zi", "birthday", "birthtime", "telphone", "idcard", "avatar", "desc"];

function randomString(len) {　　
    var code = '';
    for (var i = 0; i < len; i++) {　　　　
        code += CHARS.charAt(Math.floor(Math.random() * CHARS.length));　　
    }　　
    return code;
}

function randomNumber(len) {　　
    var code = '';　　
    for (var i = 0; i < len; i++) {　　　　
        code += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));　　
    }　　
    return code;
}

exports.login = function(req, res) {
    return co(function*() {
        const body = req.body;
        const user = yield knex("user").select()
            .where("account", body.title)
            .orWhere("email", body.title)
            .orWhere("telphone", body.title)
            .first();
        if (!user) {
            return 404; // 用户不存在
        }
        if (user.password != body.password) {
            return 405; // 密码错误
        }
        let data = {};
        USERINFO.forEach(function(k) {
            data[k] = user[k];
        });
        req.session.user = data;
        return data;
    });
};

exports.logout = function(req, res) {
    delete req.session.user;
};

function checkCode(title, code) {
    return co(function*() {
        const one = yield knex("verify").select().where("title", title).first();
        // 尝试次数过多
        if (one.rest < 1) {
            return 407;
        }
        // 10分钟内有效
        if (one.update_at.getTime() < new Date().getTime() - 600000) {
            return 407;
        }
        // 验证码错误
        if (one.code != code) {
            yield knex("verify").where("title", title).update({ rest: one.rest - 1 });
            return 406;
        }
    });
}

function disableCode(title, trx) {
    console.log(title);
    return (trx || knex)("verify").where("title", title).update({ rest: -1 });
}

exports.register = function(req, res) {
    return co(function*() {
        const body = req.body;
        let user = yield knex("user").select()
            .where("account", body.title)
            .orWhere("email", body.title)
            .orWhere("telphone", body.title)
            .first();
        if (user) {
            // 邮箱/手机被占用
            return 405;
        }
        user = yield knex("user").select()
            .where("account", body.account)
            .orWhere("email", body.account)
            .orWhere("telphone", body.account)
            .first();
        if (user) {
            // 账号已经存在 408
            return 408;
        }
        const errNo = yield checkCode(body.title, body.code);
        if (errNo) {
            return errNo;
        }
        if (/^1\d{10}$/.test(body.title)) {
            // 手机注册
            body.telphone = body.title;
        } else {
            // 邮箱注册
            body.email = body.title;
        }
        let title = body.title;
        delete body.code;
        delete body.title;
        user = {};
        for (let key of USERINFO) {
            user[key] = body[key];
        }
        yield knex.transaction(function(trx) {
            co(function*() {
                const ids = yield trx("user").insert(body, "id");
                yield disableCode(title, trx);
                user.id = ids[0];
                req.session.user = user;
            }).then(trx.commit).catch(trx.rollback);
        });
        return user;
    });
};

exports.sendCode = function(req, res) {
    return co(function*() {
        const body = req.body;
        if (/^1\d{10}$/.test(body.title)) {
            // TODO: 发送手机验证码
            return 402;
        }
        const code = randomNumber(6);
        if (config.dev) {
            logger.info("发送邮箱验证码", code);
        } else {
            yield email.sendCode(body.title, code);
        }
        body.code = code;
        const one = yield knex("verify").select().where("title", body.title).first();
        if (one) {
            yield knex("verify").where("title", body.title).update({
                code,
                rest: 10,
                update_at: new Date()
            });
        } else {
            yield knex("verify").insert(body, "id");
        }
    });
};

exports.sendCodeCheck = function(req, res) {
    return co(function*() {
        const body = req.body;
        return yield checkCode(body.title, body.code);
    });
};

exports.whoami = function(req, res) {
    return req.session.user;
};

exports.edit = function(req, res) {
    return co(function*() {
        const body = req.body;
        let user = req.session.user;
        Object.assign(user, body);
        yield knex("user").where("id", user.id).update(user);
        req.session.user = user;
        return user;
    });
};