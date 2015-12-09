var assert   = require("chai").assert;
var http     = require("http");
var Chance   = require('chance');
var md5      = require('md5');
var login    = require('./../libs/login');

var chance   = new Chance();

var test= function(server,options) {

    describe('getChatrooms', function () {
        it('should be logged in', login(server,options.email,options.password));
        it("should return a 200 response", function (done) {
            server
                .get('/api/chatrooms')
                .end(function(err, res){
                    if (err) return done(err);
                    var item=res.body;
                    assert.notEqual(item[0].ID,null,'No ID');
                    assert.equal(item.error, null,'Login failed');
                    assert.equal(res.statusCode, 200,'Success request');
                    done()
                });
        });
    });
    describe('getChatroomById', function () {
        it('should be logged in', login(server,options.email,options.password));
        it("should return a 200 response", function (done) {
            var id=1;
            server
                .get('/api/chatrooms/'+ id)
                .end(function(err, res){
                    if (err) return done(err);
                    var item=res.body;
                    assert.notEqual(item.ID,null,'No ID');
                    assert.equal(item.error, null,'Login failed');
                    assert.equal(res.statusCode, 200,'Success request');
                    done()
                });
        });
    });

    describe('postChatroom', function () {
        xit('should be logged in', login(server,options.email,options.password));
        xit("should return a 200 response", function (done) {
            var obj= {
                Users_ID:1,
                Bobs_ID:1
            };
            server
                .post('/api/chatrooms')
                .send(obj)
                .end(function(err, res){
                    if (err) return done(err);
                    var item=res.body;
                    assert.equal(item.error, null,'Failed');
                    assert.equal(item.success, true,'Failed');
                    assert.equal(res.statusCode, 200,'Success request');
                    done()
                });
        });
    });


};

module.exports=function(server,options) {
    return test(server,options);
};
