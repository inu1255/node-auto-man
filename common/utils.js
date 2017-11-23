const fs = require("fs");
const logger = require("./log").logger;
const net = require("net");

exports.readJson = function(filePath) {
    var s;
    try {
        s = fs.readFileSync(filePath, "utf8");
    } catch (e) {
        if (e.errno == -2) {
            logger.log(filePath, "不存在");
        }else{
            logger.log(filePath, e);
        }
        return;
    }
    try {
        return JSON.parse(s);
    } catch (error) {
        return eval("(" + s + ")");
    }
};

exports.writeJson = function(filePath, data, space) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, space), "utf8");
    } catch (e) {
        logger.log(filePath, e);
    }
};

exports.cross = function(req, res, next) {
    const origin = req.headers["origin"];
    if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
    }
    next();
};

/**
 * 检查端口是否占用
 * @param {number} port 端口
 */
exports.probe = function(port) {
    return new Promise(function(resolve, reject) {
        var server = net.createServer().listen(port);

        var calledOnce = false;

        var timeoutRef = setTimeout(function() {
            calledOnce = true;
            resolve(true);
        }, 2000);

        server.on('listening', function() {
            clearTimeout(timeoutRef);

            if (server)
                server.close();

            if (!calledOnce) {
                calledOnce = true;
                resolve(false);
            }
        });

        server.on('error', function(err) {
            clearTimeout(timeoutRef);

            var result = false;
            if (err.code === 'EADDRINUSE')
                result = true;

            if (!calledOnce) {
                calledOnce = true;
                resolve(result);
            }
        });
    });
};