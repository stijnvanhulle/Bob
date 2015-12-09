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

var getDestinationById=function(req,res){
    var user_ID= req.user[0].ID;
    var id= req.params.id;

    pool.getConnection(function(error, connection) {
        connection.query({
                sql: "SELECT Users_Destinations.Users_ID,Users_Destinations.Destinations_ID,Users_Destinations.Default,Users_Destinations.Added,Users_Destinations.Name, Cities_ID, Location FROM Users_Destinations INNER JOIN Destinations " +
                "ON Destinations.ID=Users_Destinations.Destinations_ID " +
                "WHERE Users_ID=? AND Destinations.ID=?",
                timeout: 40000 // 40s
            },
            [user_ID, id],
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    res.json(results[0]);
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

var postDestination=function(req,res){
    var user_ID= req.user[0].ID;

    var obj; //autotype
    try {
        obj = JSON.parse(req.body);
    } catch (e) {
        obj = req.body;
    }

    pool.getConnection(function(error, connection) {
        connection.beginTransaction(function (err) {
            if (err) {
                connection.release();
                res.json({success: false, error: err.message});
            }

            async.waterfall([
                function (cb) {
                    addDestination(connection, obj, function (err, id) {
                        if (err) {
                            cb(err, null);
                        } else {
                            cb(null, id);
                        }
                    });
                },
                function (destination_ID, cb) {
                    addUserDestination(connection, obj,destination_ID, user_ID, function (err) {
                        if (err) {
                            cb(err, false);
                        } else {
                            cb(null, true);
                        }
                    });

                }
            ], function (err, result) {
                commit(connection, err, res);
            });

        });

    });
};

var addDestination=function(connection, destination, cb){
    var sql;
    var items;
    sql='INSERT INTO Destinations (Cities_ID,Location) ' +
        'VALUES (?,?)';
    items=[destination.Cities_ID, destination.Location];


    connection.query({
            sql: sql,
            timeout: 40000 // 40s

        },
        items,
        function (error, rows, fields) {
            if (error) {
                cb(error);
            }else{
                cb(null,rows.insertId);
            }
        });
};

var addUserDestination=function(connection, destination, destination_ID, user_ID, cb){
    var sql;
    var items;
    sql='INSERT INTO Users_Destinations (Users_ID,Destinations_ID,Name) ' +
        'VALUES (?,?,?)';
    items=[user_ID,destination_ID,destination.Name];

    connection.query({
            sql: sql,
            timeout: 40000 // 40s

        },
        items,
        function (error, rows, fields) {
            if (error) {
                cb(error);
            }else{
                cb(null);
            }
        });
};


module.exports = (function(){

    //public api
    var publicAPI={
        getDestinations:getDestinations,
        getDefaultDestination:getDefaultDestination,
        postDestination:postDestination,
        getDestinationById:getDestinationById
    };

    return publicAPI;
})();