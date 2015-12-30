/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql').getPool();
var md5             = require('md5');
var async           = require('async');

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');
var geolib          = require('geolib');

//start
//find bob

//bent u zeker dat u deze bob wilt
//JAAAA
//add trip: Bobs_ID, Destination_ID, Friends
//add to Bobs_Parties: Users_ID, Party_ID, statuses_ID, Bobs_ID, Trips_ID
//add every minute to Trips_Locations met bijhorende status: Trips_ID, Location, Added, Statuses_ID
//NEEE
//herzoek een nieuwe bob


//maak chatroom aan
//add comment to chatroom

//opweg
//add every minute to Trips_Locations met bijhorende status: Trips_ID, Location, Added, Statuses_ID:OPWEG

//aangekomen

//angekomen wanneer desination location en current 1km van elkaar zijn
//add every minute to Trips_Locations met bijhorende status: Trips_ID, Location, Added, Statuses_ID:AANGEKOMEN
//update trips to active:0

//bob zegt als de rit is gedaan

//cancel een rit? feature

//add points to user
//add rating to bobs-parties


var getTripById=function(req,res){
    var user_ID= req.user[0].ID;

    var arr=[];
    var sql="";

    if(user_ID!=null){
        var extra="";
        if(req.user[0].IsBob==true){
            extra="WHERE Trips.Bobs_ID=? ";
            arr=[req.user[0].Bobs_ID, req.params.id];
        }else{
            extra="WHERE Trips.Users_ID=? ";
            arr=[user_ID, req.params.id];
        }
        sql='SELECT Trips.ID as ID,Trips.Active as Active, Statuses.Name as Status_Name, Statuses.ID as StatusID, Trips.Party_ID as Party_ID, Trips.Bobs_ID as Bobs_ID, ' +
            'a.Users_ID as Users_ID, Trips.Added as Added, Trips.Friends as Friends, a.Destinations_ID as Destinations_ID ' +
            ',Bobs_Parties.Rating FROM Trips '+
            'INNER JOIN Users_Destinations as a ON Trips.Destinations_ID= a.Destinations_ID '+
            'INNER JOIN Users ON Users.ID= a.Users_ID '+
            'LEFT JOIN Trips_Locations ON Trips_Locations.Trips_ID=Trips.ID ' +
            'LEFT JOIN Statuses ON Statuses.ID= Trips_Locations.Statuses_ID ' +
            'INNER JOIN Destinations ON Destinations.ID=a.Destinations_ID '+
            'INNER JOIN Cities On Cities.ID=Destinations.Cities_ID ' +
            'LEFT JOIN Bobs_Parties ON Trips.ID=Bobs_Parties.Trips_ID '+
             extra +
            ' AND Trips.ID=?';
    }else{
        res.json({success:false});
    }


    pool.getConnection(function(error, connection) {
        if (error) {
            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            arr,
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

var getTrips=function(req,res){
    var user_ID= req.user[0].ID;
    var sql="";
    var arr=[];

    if(user_ID!=null){
        var extra="";
        if(req.user[0].IsBob==true){
            extra="WHERE Trips.Bobs_ID=? ";
            arr=[req.user[0].Bobs_ID];
        }else{
            extra="WHERE Trips.Users_ID=? ";
            arr=[user_ID];
        }
        sql='SELECT Trips.ID as ID,Trips.Active as Active, Statuses.Name as Status_Name, Statuses.ID as StatusID, Trips.Party_ID as Party_ID, Trips.Bobs_ID as Bobs_ID, ' +
            'a.Users_ID as Users_ID, Trips.Added as Added, Trips.Friends as Friends, a.Destinations_ID as Destinations_ID ' +
            ',Bobs_Parties.Rating FROM Trips '+
            'INNER JOIN Users_Destinations as a ON Trips.Destinations_ID= a.Destinations_ID '+
            'INNER JOIN Users ON Users.ID= a.Users_ID '+
            'LEFT JOIN Trips_Locations ON Trips_Locations.Trips_ID=Trips.ID ' +
            'LEFT JOIN Statuses ON Statuses.ID= Trips_Locations.Statuses_ID ' +
            'INNER JOIN Destinations ON Destinations.ID=a.Destinations_ID '+
            'INNER JOIN Cities On Cities.ID=Destinations.Cities_ID ' +
            'LEFT JOIN Bobs_Parties ON Trips.ID=Bobs_Parties.Trips_ID '+
             extra +
            ' ORDER BY Trips.Added DESC';
    }else{
        res.json({success:false});
    }


    pool.getConnection(function(error, connection) {
        if (error) {
            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            arr,
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
    var arr=[];

    if(user_ID!=null){
        var extra="";
        if(req.user[0].IsBob==true){
            extra="WHERE Trips.Bobs_ID=? ";
            arr=[req.user[0].Bobs_ID];
        }else{
            extra="WHERE Trips.Users_ID=? ";
            arr=[user_ID];
        }
        sql='SELECT Trips.ID as ID,Trips.Active as Active, Statuses.Name as Status_Name, Statuses.ID as StatusID, Trips.Party_ID as Party_ID, Trips.Bobs_ID as Bobs_ID, ' +
            'a.Users_ID as Users_ID, Trips.Added as Added, Trips.Friends as Friends, a.Destinations_ID as Destinations_ID ' +
            ',Bobs_Parties.Rating FROM Trips '+
            'INNER JOIN Users_Destinations as a ON Trips.Destinations_ID= a.Destinations_ID '+
            'INNER JOIN Users ON Users.ID= a.Users_ID '+
            'LEFT JOIN Trips_Locations ON Trips_Locations.Trips_ID=Trips.ID ' +
            'LEFT JOIN Statuses ON Statuses.ID= Trips_Locations.Statuses_ID ' +
            'INNER JOIN Destinations ON Destinations.ID=a.Destinations_ID '+
            'INNER JOIN Cities On Cities.ID=Destinations.Cities_ID ' +
            'LEFT JOIN Bobs_Parties ON Trips.ID=Bobs_Parties.Trips_ID '+
             extra +
            ' ORDER BY Trips.Added DESC '+
            'LIMIT 1';
    }else{
        res.json({success:false});
    }


    pool.getConnection(function(error, connection) {
        if (error) {
            connection.release();
            res.json({success : false, error : error});
            return;
        }
            connection.query({
                    sql: sql,
                    timeout: 40000 // 40s
                },
                arr,
                function (error, results, fields) {
                    connection.release();
                    if (error){
                        res.json({success:false, error:error});
                    } else{
                        res.json(results[0]);
                    }
                }
            );


    });
};
var postTrip=function(req,res){
    var user_ID= req.user[0].ID;
    var sql='INSERT INTO Trips(Users_ID,Party_ID, Bobs_ID, Destinations_ID,Friends) VALUES(?,?,?,?,?)';
    var obj= parser(req.body);

    pool.getConnection(function(error, connection) {
        if (error) {
            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            [user_ID,obj.Party_ID,obj.Bobs_ID,obj.Destinations_ID, obj.Friends],
            function (error, rows, fields) {
                connection.release();
                if(error){
                    res.json({success:false,error:error.message});
                }else{
                    res.json({success:true, newID: rows.insertId});
                }
            });
    });
};

var addRating=function(req,res){
    var user_ID= req.user[0].ID;
    var sql='INSERT INTO Bobs_Parties(Users_ID,Party_ID, Bobs_ID, Trips_ID, Rating) VALUES(?,?,?,?,?)';
    var obj= parser(req.body);

    pool.getConnection(function(error, connection) {
        if (error) {
            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            [user_ID,obj.Party_ID,obj.Bobs_ID,obj.Trips_ID, obj.Rating],
            function (error, rows, fields) {
                connection.release();
                if(error){
                    res.json({success:false,error:error.message});
                }else{
                    res.json({success:true, newID: rows.insertId});
                }
            });
    });
};

var postLocation=function(req,res){
    var user_ID= req.user[0].ID;
    var sql='INSERT INTO Trips_Locations(Trips_ID,Location, Statuses_ID) VALUES(?,?,?)';
    var obj= parser(req.body);

    pool.getConnection(function(error, connection) {
        if (error) {
            res.json({success : false, error : error.toString()});
            return;
        }
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            [obj.Trips_ID,obj.Location, obj.Statuses_ID],
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



var putActive =function(req,res){
    var user_ID= req.user[0].ID;
    var sql='UPDATE Trips SET Trips.Active=? WHERE Trips.ID=?';
    var obj= parser(req.body);

    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            [obj.Active, obj.TripsID],
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

var postDifference=function(req,res){
    var obj= parser(req.body);

    var from={'latitude':obj.From.Latitude, 'longitude': obj.From.Longitude};
    var to={'latitude':obj.To.Latitude, 'longitude': obj.To.Longitude};

    var distanceInMeters=geolib.getDistance(
        from,to
    );
    if(distanceInMeters<=1000){
        res.json({success:true, value: distanceInMeters});
    }else{
        res.json({success:false});
    }
};
//custom



module.exports = (function(){

    //public api
    var publicAPI={
        getTrips:getTrips,
        getTripById:getTripById,
        getCurrentTrip:getCurrentTrip,
        postTrip:postTrip,
        postLocation:postLocation,
        putActive:putActive,
        postDifference:postDifference,
        addRating:addRating
    };

    return publicAPI;
})();