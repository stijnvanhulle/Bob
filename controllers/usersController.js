/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql');
var md5             = require('md5');
var async           = require('async');

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');

var getUsers=function(req,res){
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT ID, Firstname, Lastname, Email, Cellphone, (Bobs_ID IS NOT NULL) AS IsBob FROM Users',
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

var getUsersOnline=function(req,res){
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT Users.ID,Users.Firstname,Users.Lastname,Users.Email,Users.Online FROM Users',
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



//custom




module.exports = (function(){

    //public api
    var publicAPI={
        getUsers:getUsers,
        getUsersOnline:getUsersOnline

    };

    return publicAPI;
})();