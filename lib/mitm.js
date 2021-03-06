var utils = require("../common/utils");
var db = require("../common/db");
const Storage = require("../common/storage").Storage;
const fetch = require("node-fetch");
const co = require("co");
const noginx = require("express-noginx");

class Collector {
    constructor(port, maxCache) {
        this.port = port;
        this.maxCache = maxCache || 100;
    }
    insert(req, res) {
        if (/image/.test(res.header["content-type"]))
            return;
        db.insert("history", {
            method: req.method,
            url: req.url,
            req_header: req.headers,
            req_body: req.body ? req.body.toString("base64") : undefined,
            code: res.statusCode,
            res_header: res.header,
            res_body: res.buf.toString("base64"),
            port: this.port
        }).then(function() {

        }, function(err) {
            console.log(err);
        });
    }

    start() {
        this.server = noginx.express();
        this.server.use((req, res, next) => {
            let url = req.url;
			if (url.indexOf(":") <= 0) {
				url = req.protocol + "://" + req.headers["host"] + url;
			}
            if (url.endsWith(".map"))
                return next();
            if (url.endsWith(".js"))
                return next();
            if (url.endsWith(".css"))
                return next();
            let that = this;
            return co(function*() {
                req.url = url;
                if (req.method == "POST") {
                    let buf = yield utils.streamToBuffer(req);
                    req.body = buf;
                }
                let proxyRes = yield fetch(req.url, { method: req.method, body: req.body, headers: req.headers });
                proxyRes.header = {};
                let d = proxyRes.headers.raw();
                for (let k in d) {
                    let v = d[k];
                    if (k != "content-encoding") {
                        proxyRes.header[k] = v[0];
                    }
                }
                res.writeHead(proxyRes.status, proxyRes.header);
                proxyRes.buf = yield proxyRes.buffer();
                res.write(proxyRes.buf);
                res.end();
                that.insert(req, proxyRes);
                next();
            });
		});
		this.server.listen(this.port);
        return this;
    }
    stop() {
        return new Promise((resolve, reject) => {
            this.server.close(resolve);
        });
    }
}

class MitmStorage extends Storage {
    start(port) {
        let proxy = this.storage[port];
        if (!proxy) {
            proxy = this.storage[port] = new Collector(port).start();
            setTimeout(() => {
                this.stop(port);
            }, 600000);
        }
        return db.update("user", { port }).where("id", port - 1024);
    }
    stop(port) {
        let proxy = this.storage[port];
        if (proxy) {
            delete this.storage[port];
            proxy.stop();
        }
        return db.update("user", { port: 0 }).where("id", port - 1024);
    }
    run(cron) {
        db.select("user", "port").where("port", ">", 0).then((data) => {
            for (let row of data) {
                this.start(row.port);
            }
        });
        let old = this.storage["cron"];
        if (old) {
            console.log("清除之前的任务计时器");
            clearTimeout(old.timer);
        }
        this.storage["cron"] = cron;
        cron();
    }
}

exports.Collector = Collector;
exports.MitmStorage = MitmStorage;