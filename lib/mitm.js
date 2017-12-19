var mitmproxy = require('node-mitmproxy');
var utils = require("../common/utils");
var db = require("../common/db");
const Storage = require("../common/storage").Storage;

class Collector {
    constructor(port, maxCache) {
        this.port = port;
        this.maxCache = maxCache || 100;
    }
    start() {
        this.server = mitmproxy.createProxy({
            port: this.port,
            sslConnectInterceptor: (req, cltSocket, head) => true,
            caCertPath: 'ca/ca.crt',
            caKeyPath: 'ca/ca.key.pem',
            requestInterceptor: (rOptions, req, res, ssl, next) => {
                if (req.method == "POST") {
                    utils.streamToBuffer(req).then(function(buf) {
                        req.body = buf;
                        next();
                    }, console.error);
                } else {
                    next();
                }
            },
            responseInterceptor: (req, res, proxyReq, proxyRes, ssl, next) => {
                if (proxyRes.headers["content-length"] > 2048) {
                    next();
                } else {
                    utils.streamToBuffer(proxyRes).then((buf) => {
                        res.writeHead(proxyRes.statusCode, proxyRes.headers);
                        res.write(buf);
                        res.end();
                        db.insert("history", {
                            method: req.method,
                            url: ssl ? "https://" + req.headers.host + req.url : req.url,
                            req_header: req.headers,
                            req_body: req.body ? req.body.toString("base64") : undefined,
                            code: proxyRes.statusCode,
                            res_header: proxyRes.headers,
                            res_body: buf.toString("base64"),
                            port: this.port
                        }).then(function() {

                        }, function(err) {
                            console.log(err);
                        });
                        next();
                    }, console.error);
                }
            }
        });
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
        if (!proxy){
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
    run(cron){
        db.select("user", "port").where("port", ">", 0).then((data)=>{
            for(let row of data){
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