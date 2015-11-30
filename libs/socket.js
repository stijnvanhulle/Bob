
module.exports = function(io,cb) {
  io.on('connection', function(socket){
    global.socket=socket;
    console.log('a user connected');
    io.emit('connect', 'a user connected ' + socket.toString());

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    if(global.socket!=null){
      cb(true);
    }else{
      cb(true);
    }

  });
};
