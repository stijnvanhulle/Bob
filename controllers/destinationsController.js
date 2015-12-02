/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql');
var md5             = require('md5');
var async           = require('async');

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');

var getDestinations=function(req,res){
    var user_ID= req.user[0].ID;

    pool.getConnection(function(error, connection) {
        connection.query({
                sql: "SELECT Users_Destinations.Users_ID,Users_Destinations.Destinations_ID,Users_Destinations.Default,Users_Destinations.Added,Users_Destinations.Name, Cities_ID, Location FROM Users_Destinations INNER JOIN Destinations " +
                "ON Destinations.ID=Users_Destinations.Destinations_ID " +
                "WHERE Users_ID=?",
                timeout: 40000 // 40s
            },
            [user_ID],
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
var getDefaultDestination=function(req,res){
    var user_ID= req.user[0].ID;
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: "SELECT Users_Destinations.Users_ID,Users_Destinations.Destinations_ID,Users_Destinations.Default,Users_Destinations.Added,Users_Destinations.Name, Cities_ID, Location FROM Users_Destinations INNER JOIN Destinations " +
                "ON Destinations.ID=Users_Destinations.Destinations_ID " +
                "WHERE Users_ID=? AND Users_Destinations.Default=1",
                timeout: 40000 // 40s
            },
            [user_ID],
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false, error:error.toString()});
                } else{
                    res.json(results[0]);
                }
            }
        );
    });
};



module.exports = (function(){

    //public api
    var publicAPI={
        getDestinations:getDestinations,
        getDefaultDestination:getDefaultDestination
    };

    return publicAPI;
})();