
module.exports = function(io,cb) {
  io.on('connection', function(socket){
    global.socket=socket;
    console.log('a user connected');
    io.emit('connect', 'a user connected ' + socket.toString());

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('bob_ACCEPT:send', function(msg){
        io.emit('bob_ACCEPT',msg);
    });

    socket.on('trip_START:send', function(msg){
        io.emit('trip_START',msg);
    });
    socket.on('trip_DONE:send', function(msg){
      io.emit('trip_DONE',msg);
    });
    socket.on('trip_UPDATE:send', function(msg){
      io.emit('trip_UPDATE',msg);
    });

    socket.on('trip_MAKE:send', function(msg){
      io.emit('trip_MAKE',msg);
    });

    socket.on('friend_REQUEST:send', function(msg){
      io.emit('friend_REQUEST',msg);
    });

    socket.on('chatroom_OPEN:send', function(msg){
      io.emit('chatroom_OPEN',msg);
    });
    socket.on('chatroom_COMMENT:send', function(msg){
      io.emit('chatroom_COMMENT',msg);
    });


    if(global.socket!=null){
      cb(true);
    }else{
      cb(true);
    }

  });
};
