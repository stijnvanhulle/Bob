var assert   = require("chai").assert;
var http     = require("http");
var Chance   = require('chance');
var md5      = require('md5');
var login    = require('./../libs/login');

var chance   = new Chance();

var test= function(server,options) {

    describe('getParties', function () {
        it('should be logged in', login(server,options.email,options.password));
        it("should return a 200 response", function (done) {
            server
                .get('/api/parties')
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
    describe('getPartiesInArea', function () {
        it('should be logged in', login(server,options.email,options.password));
        it("should return a 200 response", function (done) {
            var obj= {
                Location:JSON.stringify({latitude:50.8028841,longitude:3.2097454}),
                Distance:30
            };
            server
                .post('/api/parties/area')
                .send(obj)
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

    describe('postParty', function () {
        xit('should be logged in', login(server,options.email,options.password));
        xit("should return a 200 response", function (done) {
            var obj= {
                Name:'Kiekenfuif',
                Organisator:'Centaura',
                Amount:'1200',
                FacebookEventID:'323423',
                Cities_ID:1,
                Location:JSON.stringify({latitude:chance.latitude({min: 50.8010, max: 50.8110}),longitude:chance.latitude({min: 3.209, max: 3.210})})
            };
            server
                .post('/api/parties')
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
