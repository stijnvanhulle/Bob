var assert   = require("chai").assert;
var http     = require("http");
var Chance   = require('chance');
var md5      = require('md5');
var login    = require('./libs/login');

var chance   = new Chance();

var test= function(server,options) {

    describe('getUsers', function () {
        it('should be logged in', login(server,options.email,options.password));
        it("should return a 200 response", function (done) {
            server
                .get('/api/users')
                .end(function(err, res){
                    if (err) return done(err);
                    var item=res.body;
                    assert.notEqual(item[0].User.ID,null,'No ID');
                    assert.equal(item[0].User.IsBob,true,'No user');
                    assert.equal(item.error, null,'Login failed');
                    assert.equal(res.statusCode, 200,'Success request');
                    done()
                });
        });
    });
    describe('getUsersOnline', function () {
        it('should be logged in', login(server,options.email,options.password));
        it("should return a 200 response", function (done) {
            server
                .get('/api/users/online')
                .end(function(err, res){
                    if (err) return done(err);
                    var item=res.body;
                    if(item[0]!=null){
                        assert.notEqual(item[0].User.ID,null,'No ID');
                        assert.equal(item[0].User.IsBob,true,'No user');
                    }
                    assert.equal(item.error, null,'Login failed');
                    assert.equal(res.statusCode, 200,'Success request');
                    done()
                });
        });
    });






};

module.exports=function(server,options) {
    return test(server,options);
};
