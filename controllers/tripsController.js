/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql');
var md5             = require('md5');
var async           = require('async');

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');

var getTrips=function(req,res){
    var user_ID= req.user[0].ID;
    var sql="";

    if(user_ID!=null){
        sql='SELECT Trips.ID as Trips_ID, Trips.Bobs_ID as Trips_Bobs_ID, a.Users_ID, a.Destinations_ID,Destinations.Location as Destinations_Location, Destinations.Cities_ID, Cities.Name as Cities_Name, a.Default, a.Added, a.Name FROM Trips '+
            'INNER JOIN Users_Destinations as a ON Trips.Destinations_ID= a.Destinations_ID  '+
            'INNER JOIN Users ON Users.ID= a.Users_ID '+
            'INNER JOIN Destinations ON Destinations.ID=a.Destinations_ID '+
            'INNER JOIN Cities On Cities.ID=Destinations.Cities_ID '+
            'WHERE a.Users_ID=?';
    }else{
        res.json({success:false});
    }


    pool.getConnection(function(error, connection) {
        connection.query({
                sql: sql,
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

var getCurrentTrip=function(req,res){
    var user_ID= req.user[0].ID;
    var sql="";

    if(user_ID!=null){
        sql='SELECT Trips.ID as Trips_ID, Trips.Bobs_ID as Trips_Bobs_ID, a.Users_ID, a.Destinations_ID,Destinations.Location as Destinations_Location, Destinations.Cities_ID, Cities.Name as Cities_Name, a.Default, a.Added, a.Name FROM Trips '+
            'INNER JOIN Users_Destinations as a ON Trips.Destinations_ID= a.Destinations_ID '+
            'INNER JOIN Users ON Users.ID= a.Users_ID '+
            'INNER JOIN Destinations ON Destinations.ID=a.Destinations_ID '+
            'INNER JOIN Cities On Cities.ID=Destinations.Cities_ID '+
            'WHERE a.Users_ID=? '+
            'ORDER BY Trips.Added DESC '+
            'LIMIT 1';
    }else{
        res.json({success:false});
    }


    pool.getConnection(function(error, connection) {
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            [user_ID],
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
var postTrip=function(req,res){
    var user_ID= req.user[0].ID;
    var sql='INSERT INTO Trips(Users_ID, Bobs_ID, Destinations_ID,Friends) VALUES(?,?,?,?)';
    var obj= parser(req.body);

    pool.getConnection(function(error, connection) {
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            [user_ID,obj.Bobs_ID,obj.Destinations_ID, obj.Friends],
            function (error, rows, fields) {
                connection.release();
                if(error){
                    res.json({success:false,error:error.message});
                }else{
                    res.json({success:true});
                }
            });
    });
};


//custom



module.exports = (function(){

    //public api
    var publicAPI={
        getTrips:getTrips,
        getCurrentTrip:getCurrentTrip,
        postTrip:postTrip

    };

    return publicAPI;
})();