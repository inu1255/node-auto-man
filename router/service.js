/**
 * Created Date: 2017-10-09 11:42:25
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 */
const co = require("co");
const db = require("../common/db");
const config = require("../common/config");
const logger = require("../common/log").logger;
const utils = require("../common/utils");
const MitmStorage = require("../lib/mitm").MitmStorage;
const fs = require("fs");
const promisify = require("../common/promisify");
const statAsync = promisify(fs.stat);
const fetch = require("node-fetch");

let storage = new MitmStorage("mitm");
storage.run(cron);

function cron() {
    return co(function*() {
        let now = new Date();
        if (now.getHours() < 8) {
            cron.timer = setTimeout(cron, 3600000);
            return;
        }
        let yestoday = Math.floor(now.getTime() / 1000) - 80000;
        let t = yield db.SingleSQL("select title,uid from task where enable=1 and lastrun_at<? and uid in (select id from user where money>used_money) order by lastrun_at", [yestoday]).first();
        if (t) {
            let rows = yield db.select("task").where(t);
            try {
                yield Promise.all(rows.map(row => {
                    let body = row.req_body ? new Buffer(row.req_body, 'base64') : undefined;
                    return fetch(row.url, { method: row.method, headers: JSON.parse(row.req_header), body });
                }));
                yield db.update("task", { "lastrun_at": yestoday + 80000, "run_num": db.Raw("run_num+1") }).where(t).where("lastrun_at", "<", yestoday);
                yield db.update("user", { used_money: db.Raw(`used_money+${rows.length}`) }).where("id", t.uid);
            } catch (error) {
                console.log(error);
            }
            cron.timer = setTimeout(cron, 1000);
        } else {
            cron.timer = setTimeout(cron, 60000);
        }
    });
}

exports.start = function(req, res) {
    return co(function*() {
        let user = req.session.user;
        let port = user.id + 1024;
        yield storage.start(port);
        return { port };
    });
};

exports.stop = function(req, res) {
    return co(function*() {
        let user = req.session.user;
        let port = user.id + 1024;
        yield storage.stop(port);
    });
};

exports.history = function(req, res) {
    return co(function*() {
        let user = req.session.user;
        let port = user.id + 1024;
        let body = req.body;
        return yield db.select("history").where("port", port).where("id", body.id).first();
    });
};

exports.historyTree = function(req, res) {
    return co(function*() {
        let user = req.session.user;
        let port = user.id + 1024;
        let body = req.body;
        let data = yield db.select("history", ["id", "url"]).where("port", port).where("id", body.id);
        let hostMap = {};
        for (let item of data) {
            let ss = item.url.split("/");
            let host = ss.slice(0, 3).join("/");
            let path = ss.slice(3).join("/");
            let m = hostMap[host] = hostMap[host] || {
                label: host,
                children: []
            };
            m.children.push({
                label: path,
                id: item.id
            });
        }
        return Object.values(hostMap);
    });
};

exports.clear = function(req, res) {
    return co(function*() {
        let user = req.session.user;
        let port = user.id + 1024;
        yield db.execSQL([
            { sql: `insert into history_backup select * from history where port=?`, args: [port] },
            db.delete("history").where("port", port),
        ]);
    });
};

exports.addTask = function(req, res) {
    return co(function*() {
        let user = req.session.user;
        let port = user.id + 1024;
        let body = req.body;
        let rows = yield db.select("history").where("id", "in", body.ids).where("port", port);
        let tasks = rows.map(x => {
            return {
                method: x.method,
                url: x.url,
                req_header: x.req_header,
                req_body: x.req_body,
                code: x.code,
                res_header: x.res_header,
                res_body: x.res_body,
                uid: user.id,
                title: body.title,
            };
        });
        yield db.execSQL([
            { sql: `insert into history_backup select * from history where port=?`, args: [port] },
            db.delete("history").where("port", port),
            db.insert("task", tasks),
        ]);
    });
};

exports.listTask = function(req, res) {
    return co(function*() {
        let user = req.session.user;
        return yield db.SingleSQL("select title,count(title) count,lastrun_at,sum(run_num) money from task where enable=1 and uid=? group by title", [user.id]);
    });
};

exports.delTask = function(req, res) {
    return co(function*() {
        let user = req.session.user;
        let body = req.body;
        return yield db.update("task", { enable: 0 }).where("title", body.title).where("uid", user.id);
    });
};