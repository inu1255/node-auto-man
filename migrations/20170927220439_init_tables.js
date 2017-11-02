const co = require("co");
const db = require("../common/knex").db;

exports.up = function(knex, Promise) {
    return co(function*() {
        yield db.schema.createTable('file', function(table) {
            table.increments();
            table.integer('create_id');
            table.string('name', 128);
            table.string('ext', 32);
            table.string('md5', 32);
        });
        yield db.schema.createTable('user', function(table) {
            table.increments();
            table.string('account', 32).unique();
            table.string('email', 64).unique();
            table.string('telphone', 11).unique();
            table.string('password', 32);
            table.string('name', 32);
            table.string('avatar', 1024);
            table.string('desc', 255);
            table.string('role', 32).defaultTo("");
        });
        yield db.schema.createTable("verify", function(table) {
            table.increments();
            table.string("title", 64);
            table.string("code", 16);
            table.integer("rest").defaultTo(10);
            table.timestamp("update_at").defaultTo(knex.fn.now());
        });
        yield db.schema.createTable("service", function(table) {
            table.increments();
            table.integer("create_by");
            table.string("title", 128);
            table.text("desc");
            table.string("url", 1024);
            table.text("body");
            table.string("method", 32);
            table.json("headers");
            table.json("params");
            table.json("checks");
            table.timestamp("create_at").defaultTo(knex.fn.now());
            table.unique("title");
        });
        yield db.schema.createTable("params", function(table) {
            table.integer("sid");
            table.integer("uid");
            table.json("values");
            table.integer("active").defaultTo(1);
            table.bigInteger("lastrun_at").defaultTo(0);
            table.integer("rid");
            table.primary(["sid", "uid"]);
        });
        yield db.schema.createTable("record", function(table) {
            table.increments();
            table.integer("sid");
            table.integer("uid");
            table.json("params");
            table.text("body");
            table.text("code");
            table.text("msg");
            table.timestamp("create_at").defaultTo(knex.fn.now());
        });
    });
};

exports.down = function(knex, Promise) {
    return co(function*() {
        yield db.schema.dropTable("file");
        yield db.schema.dropTable("user");
        yield db.schema.dropTable("verify");
        yield db.schema.dropTable("service");
        yield db.schema.dropTable("params");
        yield db.schema.dropTable("record");
    });
};