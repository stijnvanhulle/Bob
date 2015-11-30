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
                    assert.equal(item.error, null,'Login failed');
                    assert.equal(res.statusCode, 200,'Success request');
                    done()
                });
        });
    });

    describe('postLocation', function () {
        xit('should be logged in', login(server,options.email,options.password));
        xit("should return a 200 response", function (done) {
            var location= {
                Latitude:'50.8888',
                Longitude: '15.11'
            };
            server
                .post('/api/user/location')
                .send({location: location})
                .end(function(err, res){
                    if (err) return done(err);
                    var item=res.body;
                    assert.equal(item.error, null,'Failed');
                    assert.equal(res.statusCode, 200,'Success request');
                    done()
                });
        });
    });

    describe('postUser', function () {
        xit('should be logged in', login(server,options.email,options.password));
        xit("should return a 200 response", function (done) {
            var user= {
                Firstname:'Stijn',
                Lastname: 'Van Hulle',
                Email:'stijn.vanhulle@outlook.com',
                Cellphone:'534234',
                Password:'test',
                IsBob:false
            };
            var bob= {
                Firstname:'Stijn',
                Lastname: 'Van Hulle',
                Email:'stijn.vanhulle@outlook.com',
                Cellphone:'534234',
                Password:'test',
                IsBob:true,
                PricePerKm:2.3,
                BobsType_ID:1,
                LicensePlate:'1FHX-185',
                AutoType_ID: 1
            };
            server
                .post('/api/user/register')
                .send({user: bob})
                .end(function(err, res){
                    if (err) return done(err);
                    var item=res.body;
                    assert.equal(item.error, null,'Failed');
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
                Firstname:'Stijn',
                Lastname: 'Van Hulle',
                Email:'stijn.vanhulle@outlook.com',
                Cellphone:'534234',
                Password:'test',
                IsBob:false
            };
            var bob= {
                Users_ID:23,
                Bobs_ID:6,
                Firstname:'TETTEN',
                Lastname: 'Van Hulle',
                Email:'stijn.vanhulle@outlook.com',
                Cellphone:'534234',
                Password:'test',
                IsBob:true,
                PricePerKm:2.3,
                BobsType_ID:1,
                LicensePlate:'1FHX-185',
                AutoType_ID: 1
            };
            server
                .put('/api/user/edit')
                .send({user: bob})
                .end(function(err, res){
                    if (err) return done(err);
                    var item=res.body;
                    assert.equal(item.error, null,'Failed');
                    assert.equal(res.statusCode, 200,'Success request');
                    done()
                });
        });
    });

};

module.exports=function(server,options) {
    return test(server,options);
};
