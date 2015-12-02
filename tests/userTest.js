var assert   = require("chai").assert;
var http     = require("http");
var Chance   = require('chance');
var md5      = require('md5');
var login    = require('./libs/login');

var chance   = new Chance();

var test= function(server,options) {
    describe('getUser', function () {
        it('should be logged in', login(server,options.email,options.password));
        it("should return a 200 response", function (done) {
            server
                .get('/api/user')
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

    describe('getLocation', function () {
        it('should be logged in', login(server,options.email,options.password));
        it("should return a 200 response", function (done) {
            server
                .get('/api/user/location')
                .end(function(err, res){
                    if (err) return done(err);
                    var item=res.body;
                    assert.equal(item.error, null,'Failed');
                    assert.equal(res.statusCode, 200,'Success request');
                    done()
                });
        });
    });

    describe('postLocation', function () {
        xit('should be logged in', login(server,options.email,options.password));
        xit("should return a 200 response", function (done) {
            var obj= {
                Latitude:'50.8888',
                Longitude: '15.11'
            };
            server
                .post('/api/user/location')
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

    describe('postUser', function () {
        xit('should be logged in', login(server,options.email,options.password));
        xit("should return a 200 response", function (done) {
            var user= {
                Firstname: Chance.first(),
                Lastname: Chance.last(),
                Email:chance.email({domain: 'example.com'}),
                Cellphone:chance.phone({ country: 'be' }),
                Password:'test',
                IsBob:false
            };
            var bob= {
                Firstname: Chance.first(),
                Lastname: Chance.last(),
                Email:chance.email({domain: 'example.com'}),
                Cellphone:chance.phone({ country: 'be' }),
                Password:'test',
                IsBob:true,
                PricePerKm:2.3,
                BobsType_ID:1,
                LicensePlate:'1FHX-185',
                AutoType_ID: 1
            };
            server
                .post('/api/user/register')
                .send(bob)
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

    describe('putUser', function () {
        xit('should be logged in', login(server,options.email,options.password));
        xit("should return a 200 response", function (done) {
            var user= {
                Users_ID:23,
                Firstname: Chance.first(),
                Lastname: Chance.last(),
                Email:chance.email({domain: 'example.com'}),
                Cellphone:chance.phone({ country: 'be' }),
                Password:'test',
                IsBob:false
            };
            var bob= {
                Users_ID:23,
                Bobs_ID:6,
                Firstname: Chance.first(),
                Lastname: Chance.last(),
                Email:chance.email({domain: 'example.com'}),
                Cellphone:chance.phone({ country: 'be' }),
                Password:'test',
                IsBob:true,
                PricePerKm:2.3,
                BobsType_ID:1,
                LicensePlate:'1FHX-185',
                AutoType_ID: 1
            };
            server
                .put('/api/user/edit')
                .send(bob)
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


    describe('putChange', function () {
        xit('should be logged in', login(server,options.email,options.password));
        xit("should return a 200 response", function (done) {
            var obj= {
                IsBob:true
            };

            server
                .put('/api/user/change')
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
