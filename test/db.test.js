'use strict';
const db = require("../common/db");
const assert = require("assert");

describe('db.where测试', function() {
    it('key, value', function() {
        let wb = db.where("name", "aaa");
        assert.equal(wb.toString(), "name=?");
        assert.deepEqual(wb.params(), ["aaa"]);
    });
    it('key, op, value', function() {
        let wb = db.where("name", "like", "aaa%");
        assert.equal(wb.toString(), "name like ?");
        assert.deepEqual(wb.params(), ["aaa%"]);
    });
    it('Array', function() {
        let wb = db.where([
            ["name", "aaa"],
            ["name", "like", "aaa%"]
        ]);
        assert.equal(wb.toString(), "name=? and name like ?");
        assert.deepEqual(wb.params(), ["aaa", "aaa%"]);
    });
    it('object', function() {
        let wb = db.where({
            id: 1,
            name: "aaa"
        });
        assert.equal(wb.toString(), "id=? and name=?");
        assert.deepEqual(wb.params(), [1, "aaa"]);
    });
    it('and', function() {
        let wb = db.where("name", "1").or("name", "2").build().and(
            db.where("age", ">", 60).or("age", "<", 16)
        );
        assert.equal(wb.toString(), "(name=? or name=?) and (age > ? or age < ?)");
        assert.deepEqual(wb.params(), ['1', '2', 60, 16]);
    });
});

describe('db.SingleSql测试', function() {
    it('and', function() {
        db.SingleSQL("select * from user").first().then(function(rows) {
            assert.notEqual(rows.constructor, Array);
        },function(err) {
            console.log(err);
        });
    });
});

describe('db.Sql测试', function() {
    it('insert', function() {
        let sql = db.insert("user", {
            name: "aaa",
            age: 77
        });
        assert.equal(sql.toString(), "insert into user (name,age) values(?,?)");
        assert.deepEqual(sql.params(), ["aaa", 77]);
    });
    it('update 0', function() {
        let sql = db.update("user", {
            name: "aaa",
            age: 77
        });
        assert.equal(sql.toString(), "update user set name=?,age=?");
        assert.deepEqual(sql.params(), ["aaa", 77]);
        sql.then(function(data) {
            console.log("should not reach");
        }, function(err) {
            assert.equal(err, "禁止update/delete不带where语句: update user set name=?,age=?");
        });
    });
    it('update where', function() {
        let sql = db.update("user", {
            name: "aaa",
            age: 77
        }).where("id", 1);
        assert.equal(sql.toString(), "update user set name=?,age=? where id=?");
        assert.deepEqual(sql.params(), ["aaa", 77, 1]);
    });
    it('update where', function() {
        let sql = db.update("user", {
            name: "aaa",
            age: 77
        }).where("id", 1);
        assert.equal(sql.toString(), "update user set name=?,age=? where id=?");
        assert.deepEqual(sql.params(), ["aaa", 77, 1]);
    });
    it('select where', function() {
        let sql = db.select("user").where("id", "in", [1024, 1026]).first();
        assert.equal(sql.toString(), "select * from user where id in (?) limit 1");
        sql.then(function(rows) {
            assert.notEqual(rows.constructor, Array);
        }, function(err) {
            console.log(err);
        });
        assert.deepEqual(sql.params(), [[1024, 1026]]);
    });
    it('select name', function() {
        let sql = db.select("user", "name").where("id", 1);
        assert.equal(sql.toString(), "select name from user where id=?");
        assert.deepEqual(sql.params(), [1]);
    });
    it('select first', function() {
        let sql = db.select("user", "name");
        sql.first().then(function(data) {
            assert.notEqual(data.constructor, Array);
        }, function(err) {
            console.error(err);
        });
        assert.equal(sql.toString(), "select name from user limit 1");
        assert.deepEqual(sql.params(), []);
    });
    it('delete where', function() {
        let sql = db.delete("user").where("id", 1);
        assert.equal(sql.toString(), "delete from user where id=?");
        assert.deepEqual(sql.params(), [1]);
    });
});

describe('db.InsertOrUpdate测试', function() {
    it('insertOrUpdate', function() {
        let sql = db.insertOrUpdate("user", {
            name: "aaa"
        }).where("name", "aaa");
        sql.then(function(data) {
            // console.log(data);
            db.getPool().end();
        }, function(err) {
            console.error(err);
        });
    });
});