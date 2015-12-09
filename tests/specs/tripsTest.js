var assert   = require("chai").assert;
var http     = require("http");
var Chance   = require('chance');
var md5      = require('md5');
var login    = require('./../libs/login');

var chance   = new Chance();

var test= function(server,options) {

    describe('getTrips', function () {
        it('should be logged in', login(server,options.email,options.password));
        it("should return a 200 response", function (done) {
            server
                .get('/api/trips')
                .end(function(err, res){
                    if (err) return done(err);
                    var item=res.body;
                    assert.notEqual(item[0].Trips_ID,null,'No ID');
                    assert.equal(item.error, null,'Login failed');
                    assert.equal(res.statusCode, 200,'Success request');
                    done()
                });
        });
    });
    describe('getCurrentTrip', function () {
        it('should be logged in', login(server,options.email,options.password));
        it("should return a 200 response", function (done) {
            server
                .get('/api/trips/current')
                .end(function(err, res){
                    if (err) return done(err);
                    var item=res.body;
                    assert.notEqual(item.Trips_ID,null,'No ID');
                    assert.equal(item.error, null,'Login failed');
                    assert.equal(res.statusCode, 200,'Success request');
                    done()
                });
        });
    });

    describe('postTrip', function () {
        it('should be logged in', login(server,options.email,options.password));
        it("should return a 200 response", function (done) {
            var friends=[];
            friends.push(1);
            friends.push(2);

            var obj= {
                Bobs_ID:1,
                Destinations_ID:1,
                Friends:JSON.stringify(friends)
            };
            server
                .post('/api/trips')
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
