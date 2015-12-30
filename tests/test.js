var assert      = require("chai").assert;
var http        = require("http");
var md5         = require('md5');
var request     = require('superagent');

var address     ='http://localhost:80';
var server      = request.agent(address);
//var server    = require("../server"); //on when not using a other process to run node

var options={
    email:"stijn.vanhulle@outlook.com",
    password:"test"
};
//tests
var authTest         = require('./specs/authTest');
var userTest         = require('./specs/userTest');
var autotypesTest    = require('./specs/autotypesTest');
var citiesTest       = require('./specs/citiesTest');
var countriesTest    = require('./specs/countriesTest');
var bobsTest         = require('./specs/bobsTest');
var chatroomsTest    = require('./specs/chatroomsTest');
var destinationsTest = require('./specs/destinationsTest');
var friendsTest      = require('./specs/friendsTest');
var partiesTest      = require('./specs/partiesTest');
var statusesTest     = require('./specs/statusesTest');
var tripsTest        = require('./specs/tripsTest');
var usersTest        = require('./specs/usersTest');


describe('Access server:', function () {
    it("should return a 200 response", function (done) {
        http.get(address + "/api", function (res) {
            done();
        });
    });
});

xdescribe('Authtentication testing:',function(){
    authTest(server,options);
});
xdescribe('User testing:',function(){
    userTest(server,options);
});

xdescribe('Autotype testing:',function(){
    autotypesTest(server,options);
});

xdescribe('Cities testing:',function(){
    citiesTest(server,options);
});
xdescribe('Countries testing:',function(){
    countriesTest(server,options);
});
describe('Bobs testing:',function(){
    bobsTest(server,options);
});
xdescribe('Chatrooms testing:',function(){
    chatroomsTest(server,options);
});
xdescribe('Destinations testing:',function(){
    destinationsTest(server,options);
});
xdescribe('Friends testing:',function(){
    friendsTest(server,options);
});
xdescribe('Parties testing:',function(){
    partiesTest(server,options);
});
xdescribe('Statuses testing:',function(){
    statusesTest(server,options);
});
xdescribe('Trips testing:',function(){
    tripsTest(server,options);
});
xdescribe('Users testing:',function(){
    usersTest(server,options);
});