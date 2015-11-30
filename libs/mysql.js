var mysql       = require('mysql');
var pool        = mysql.createPool({
    host     : 'bob-2u15832u.cloudapp.net',
    user     : 'bob',
    password : 'g9fTU9PNto54LHg',
    database : 'Bob',
    connectTimeout: 2000
});

module.exports=pool;
