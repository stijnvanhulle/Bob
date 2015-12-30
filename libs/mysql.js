var mysql       = require('mysql');

module.exports= (function(){
    var getPool=function(){
        return GLOBAL.pool;
    };
    var createPool=function(){
        var pool=mysql.createPool({
            host     : 'localhost',
            user     : 'bob',
            password : 'g9fTU9PNto54LHg',
            database : 'Bob',
            connectTimeout: 10000,
            acquireTimeout:10000,
            connectionLimit:20,
            queueLimit: 50,
            debug:true
        });
        pool.on('connection', function (connection) {
            console.log('New connection to db made');
        });

        pool.on('enqueue', function () {
            console.log('Waiting for available connection slot');
        });

        GLOBAL.pool=pool
        return pool;
    };
    var endPool=function(){
        GLOBAL.pool.end();
    };

    return {
        getPool:getPool,
        createPool:createPool,
        endPool:endPool

    };

    return publicAPI;
})();
