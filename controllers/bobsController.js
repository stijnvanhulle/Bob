/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql');
var md5             = require('md5');
var async           = require('async');

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');

var getBobs=function(req,res){
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT * FROM Bobs',
                timeout: 40000 // 40s
            },
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    res.json(results);
                }
            }
        );
    });
};

module.exports = (function(){

    //public api
    var publicAPI={
        getBobs:getBobs
    };

    return publicAPI;
})();