const child_process = require('child_process');
const spawn = child_process.spawn;

if (process.argv.length < 3) {
    console.log("需要指定命令");
    process.exit();
}

const exe = process.argv[2];
const arg = process.argv.slice(3);

run(exe, arg);

function run(exe, arg) {
    const cmd = spawn(exe, arg);

    cmd.stdout.on('data', function(data) {
        console.log("" + data);
    });
    var s = "";
    cmd.stderr.on('data', function(data) {
        console.log("" + data);
        s += data;
    });

    cmd.on('exit', function(code, signal) {
        let m = /Cannot find module '([^\/']+)/.exec(s);
        if (m) {
            let mod = m[1];
            install(mod, exe, arg);
        }
    });
}

function install(mod, exe, arg) {
    const cmd = spawn("cnpm", ["i", mod]);

    cmd.stdout.on('data', function(data) {
        console.log("" + data);
    });
    var s = "";
    cmd.stderr.on('data', function(data) {
        console.log("" + data);
        s += data;
    });

    cmd.on('exit', function(code, signal) {
        if (code === 0) {
            run(exe, arg);
        }
    });
}