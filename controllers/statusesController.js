/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql');
var md5             = require('md5');
var async           = require('async');

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');

var getStatuses=function(req,res){
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT * FROM Statuses',
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


var postStatus=function(req,res){
    var user_ID= req.user[0].ID;

    var obj= parser(req.body);

    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'INSERT INTO Statuses(Name) VALUES(?)',
                timeout: 40000 // 40s
            },
            [obj.Name],
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
        getStatuses:getStatuses,
        postStatus:postStatus

    };

    return publicAPI;
})();