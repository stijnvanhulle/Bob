var http = require('http');
var https = require('https');
var app = require('./app');
var io =  require('socket.io');
var fs = require('fs');
//Lets define a port we want to listen to
const PORT=80;

var certificate = {
    //key: fs.readFileSync('/srv/bob/certs/self_signed_ssl.key'),
    //cert: fs.readFileSync('/srv/bob/certs/self_signed_ssl.crt')
};

//Create a server
var server = http.createServer(app);
//https.createServer(options, app).listen(443);r
io = io.listen(server);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://stijnvanhulle.be/:%s", PORT);
});
//https.createServer(certificate, app).listen(443, function(){
    //Callback triggered when server is successfully listening. Hurray!;
    console.log("Server listening on: http://stijnvanhulle.be/:%s", "443");
//});

//sockets
io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('connect', 'a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

});
global.socketIO = io;


