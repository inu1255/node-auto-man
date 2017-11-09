/**
 * Created Date: 2017-10-09 11:42:25
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 */
const co = require("co");
const knex = require("../common/knex").db;
const email = require("../common/email");
const config = require("../common/config");
const logger = require("../common/log").logger;
const fetch = require("node-fetch");

function getService(sid) {
    return co(function*() {
        const serv = yield knex("service").where("id", sid).first();
        if (!serv) return serv;
        serv.params = JSON.parse(serv.params);
        serv.checks = JSON.parse(serv.checks);
        return serv;
    });
}

function parseParam(s, params, param) {
    for (let k in params) {
        let v = param[k];
        s = s.replace(k, v);
    }
    return s;
}

function signin(param) {
    const sid = param.sid;
    return co(function*() {
        const serv = yield getService(sid);
        if (!serv) return { code: 404, msg: `服务${sid}不存在` };
        const opt = {};
        for (let k in serv.params) {
            if (param.values[k] == null) {
                return { code: 400, msg: `缺少参数${k}(${serv.params[k]})` };
            }
        }
        opt.body = parseParam(serv.body, serv.params, param.values);
        opt.headers = parseParam(serv.headers, serv.params, param.values);
        opt.headers = JSON.parse(opt.headers);
        opt.method = serv.method;
        const url = parseParam(serv.url, serv.params, param.values);
        const res = yield fetch(url, opt);
        const text = yield res.text();
        for (let k in serv.checks) {
            let msg = serv.checks[k];
            if (new RegExp(k).test(text)) {
                if (msg.startsWith("error:")) {
                    return { code: 1, text, msg: msg.slice(6) };
                }
                if (msg.startsWith("retry:")) {
                    return { code: 2, text, msg: msg.slice(6) };
                }
                return { code: 0, text, msg };
            }
        }
        return { code: 1, text, msg: "失败" };
    });
}

function run(param) {
    return co(function*() {
        param.values = JSON.parse(param.values);
        let res = yield signin(param);
        let record = {
            sid: param.sid,
            uid: param.uid,
            params: JSON.stringify(param.values),
            body: res.text,
            code: res.code,
            msg: res.msg
        };
        let ids = yield knex("record").insert(record, "id");
        record.id = ids[0];
        record.create_at = new Date();
        if (res.code === 2) {
            yield knex("params").where("sid", param.sid).where("uid", param.uid).update({ rid: ids[0] });
        } else {
            yield knex("params").where("sid", param.sid).where("uid", param.uid).update({ rid: ids[0], lastrun_at: today() });
        }
        return record;
    });
}

function today() {
    return Math.floor(new Date().getTime() / 86400000);
}

function worker() {
    return co(function*() {
        let rows = yield knex("params").where("active", ">", 0).where("lastrun_at", "<", today()).limit(30);
        for (let param of rows) {
            yield run(param);
        }
        return rows.length;
    });
}

function loop() {
    worker();
    setTimeout(loop, 300000);
}

loop();

if (require.main == module) {
    co(function*() {
        try {
            const data = yield worker();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    });
}

exports.test = function(req, res) {
    return co(function*() {
        const serv = req.body;
        const param = serv;
        const opt = {};
        for (let k in serv.params) {
            if (param.values[k] == null) {
                return { code: 400, msg: `缺少参数${k}(${serv.params[k]})` };
            }
        }
        opt.body = parseParam(serv.body||"", serv.params, param.values);
        opt.headers = parseParam(serv.headers, serv.params, param.values);
        opt.headers = JSON.parse(opt.headers);
        opt.method = serv.method;
        const url = parseParam(serv.url, serv.params, param.values);
        const res = yield fetch(url, opt);
        const text = yield res.text();
        for (let k in serv.checks) {
            let msg = serv.checks[k];
            if (new RegExp(k).test(text)) {
                if (msg.startsWith("error:")) {
                    return { code: 1, text, msg: msg.slice(6) };
                }
                if (msg.startsWith("retry:")) {
                    return { code: 2, text, msg: msg.slice(6) };
                }
                return { code: 0, text, msg };
            }
        }
        return { code: 1, text, msg: "失败" };
    });
};

exports.create = function(req, res) {
    return co(function*() {
        const body = req.body;
        const user = req.session.user;
        body.create_by = user.id;
        try {
            const ids = yield knex("service").insert(body, "id");
            body.id = ids[0];
            return body;
        } catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
                return 405;
            }
            throw error;
        }
    });
};

exports.update = function(req, res) {
    return co(function*() {
        const body = req.body;
        const user = req.session.user;
        const serv = yield knex("service").where("id", body.id).first();
        if (!serv) {
            return 404;
        }
        if (serv.create_by != user.id && user.id != 2) {
            return 405;
        }
        yield knex("service").where("id", body.id).update(body);
    });
};

exports.info = function(req, res) {
    return co(function*() {
        const body = req.body;
        const user = req.session.user;
        const serv = yield knex("service").where("id", body.id).first();
        if (!serv) {
            return 404;
        }
        if (serv.create_by != user.id && user.id != 2) {
            return 405;
        }
        serv.params = JSON.parse(serv.params);
        serv.headers = JSON.parse(serv.headers);
        serv.checks = JSON.parse(serv.checks);
        return serv;
    });
};

exports.params = function(req, res) {
    return co(function*() {
        const body = req.body;
        const user = req.session.user;
        body.uid = user.id;
        try {
            yield knex("params").insert(body);
            return body;
        } catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
                let sid = body.sid;
                delete body.sid;
                yield knex("params").where({ sid, uid: user.id }).update(body);
                return;
            }
            throw error;
        }
    });
};

exports.run = function(req, res) {
    return co(function*() {
        const body = req.body;
        const user = req.session.user;
        let { sid } = body;
        let count = yield knex("record").where({ sid, uid: user.id }).whereRaw("FLOOR((UNIX_TIMESTAMP(create_at)+28800)/86400)=" + today()).count();
        count = count[0]["count(*)"];
        if (count > 10) {
            return 405;
        }
        let param = yield knex("params").where({ sid, uid: user.id }).first();
        if (!param) {
            return 404;
        }
        let record = yield run(param);
        return record;
    });
};

exports.list = function(req, res) {
    return co(function*() {
        const body = req.body;
        const user = req.session.user;
        const { keyword, page, size } = body;
        let sql = knex("service").select(["id", "title", "desc", "params", "create_at", "create_by"]);
        if (keyword) sql.where("service.title", "like", `%${keyword}%`).orWhere("service.desc", "like", `%${keyword}%`);
        if (user) sql.select("params.*").leftJoin(knex("params").where("params.uid", user.id).as("params"), "service.id", "params.sid");
        let rows = yield sql.offset(page * size).limit(size);
        return rows;
    });
};

exports.mine = function(req, res) {
    return co(function*() {
        const body = req.body;
        const user = req.session.user;
        const { keyword, active, page, size } = body;
        let sql = knex(knex("params").where("params.uid", user.id).as("params"));
        sql.select(["service.id", "service.title", "service.desc", "service.params", "service.create_at",
            "params.active", "params.rid", "params.values",
            "record.params as param", "record.body", "record.code", "record.msg", "record.create_at",
        ]);
        sql.leftJoin("service", "service.id", "params.sid").leftJoin("record", "record.id", "params.rid");
        if (keyword) sql.where("service.title", "like", `%${keyword}%`).orWhere("service.desc", "like", `%${keyword}%`);
        sql.where("params.active", active ? ">" : "<=", 0);
        let rows = yield sql.offset(page * size).limit(size);
        return rows;
    });
};

exports.records = function(req, res) {
    return co(function*() {
        const body = req.body;
        const user = req.session.user;
        const { sid, page, size } = body;
        let sql = knex("record").where("uid", user.id).where("sid", sid).orderBy("id", "desc");
        let rows = yield sql.offset(page * size).limit(size);
        return rows;
    });
};