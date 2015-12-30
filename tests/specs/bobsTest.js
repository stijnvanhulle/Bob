var assert   = require("chai").assert;
var http     = require("http");
var Chance   = require('chance');
var md5      = require('md5');
var login    = require('./../libs/login');

var chance   = new Chance();

var test= function(server,options) {

    describe('getBobs', function () {
        it('should be logged in', login(server,options.email,options.password));
        it("should return a 200 response", function (done) {
            server
                .get('/api/bobs')
                .end(function(err, res){
                    if (err) return done(err);
                    var item=res.body;
                    assert.notEqual(item[0].Bob.ID,null,'No ID');
                    assert.equal(item[0].User.IsBob,true,'No bob');
                    assert.equal(item.error, null,'Login failed');
                    assert.equal(res.statusCode, 200,'Success request');
                    done()
                });
        });
    });

    describe('findBobs', function () {
        it('should be logged in', login(server,options.email,options.password));
        it("should return a 200 response", function (done) {
            var obj= {
                Rating:null,
                MinDate:"",
                BobsType_ID: 1,
                Location:JSON.stringify({ Latitude : 51.177134640708495, Longitude : 3.2177382568767574 }),
                MaxDistance:null
            };
            server
                .post('/api/bobs/find')
                .send(obj)
                .end(function(err, res){
                    if (err) return done(err);
                    var item=res.body;
                    console.log(item);
                    assert.notEqual(item.ID,null,'No ID');
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
