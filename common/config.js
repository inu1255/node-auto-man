/**
 * Created Date: 2017-09-27 14:35:00
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 */
const appname = "automan";
let port = 3000;
let i = process.argv.indexOf("--port");
if (i >= 0) {
    port = process.argv[i + 1] || port;
}
module.exports = {
    appname,
    port,
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: '199337',
        database: appname
    },
    dev: process.argv.indexOf("--dev") >= 0,
    error: {
        "400": "非法的参数值、格式或类型",
        "401": "您尚未登录",
        "402": "功能尚未实现",
        "403": "没有权限"
    }
};