/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql');
var md5             = require('md5');
var async           = require('async');

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');

var getAutotypes=function(req,res){
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT * FROM Autotypes ',
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

var postAutotype=function(req,res){
    var obj= parser(req.body);

    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'INSERT INTO Autotypes(Name,Brand) VALUES(?,?) ',
                timeout: 40000 // 40s
            },
            [obj.Name, obj.Brand],
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    res.json({success:true});
                }
            }
        );
    });
};



module.exports = (function(){

    //public api
    var publicAPI={
        getAutotypes:getAutotypes,
        postAutotype:postAutotype
    };

    return publicAPI;
})();