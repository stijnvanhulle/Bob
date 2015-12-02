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
var authTest         = require('./authTest');
var userTest         = require('./userTest');
var autotypesTest    = require('./autotypesTest');
var citiesTest       = require('./citiesTest');
var countriesTest    = require('./countriesTest');
var bobsTest         = require('./bobsTest');
var chatroomsTest    = require('./chatroomsTest');
var destinationsTest = require('./destinationsTest');
var friendsTest      = require('./friendsTest');
var partiesTest      = require('./partiesTest');
var statusesTest     = require('./statusesTest');
var tripsTest        = require('./tripsTest');
var usersTest        = require('./usersTest');


describe('Access server:', function () {
    it("should return a 200 response", function (done) {
        http.get(address + "/api", function (res) {
            done();
        });
    });
});

describe('Authtentication testing:',function(){
    authTest(server,options);
});
describe('User testing:',function(){
    userTest(server,options);
});

describe('Autotype testing:',function(){
    autotypesTest(server,options);
});

describe('Cities testing:',function(){
    citiesTest(server,options);
});
describe('Countries testing:',function(){
    countriesTest(server,options);
});
describe('Bobs testing:',function(){
    bobsTest(server,options);
});
describe('Chatrooms testing:',function(){
    chatroomsTest(server,options);
});
describe('Destinations testing:',function(){
    destinationsTest(server,options);
});
describe('Friends testing:',function(){
    friendsTest(server,options);
});
describe('Parties testing:',function(){
    partiesTest(server,options);
});
describe('Statuses testing:',function(){
    statusesTest(server,options);
});
describe('Trips testing:',function(){
    tripsTest(server,options);
});
describe('Users testing:',function(){
    usersTest(server,options);
});