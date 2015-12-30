/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql').getPool();
var md5             = require('md5');
var async           = require('async');
var geolib          = require('geolib');

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');

var getParties=function(req,res){
    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: 'SELECT * FROM Parties',
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

var getPartyById=function(req,res){
    var id = req.params.id;
    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: 'SELECT * FROM Parties WHERE ID=?',
                timeout: 40000 // 40s
            },
            [id],
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

var getPartiesInArea=function(req,res){
    var location= parser(req.body.Location);
    var distance= parser(req.body.Distance);

    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: 'SELECT * FROM Parties',
                timeout: 40000 // 40s
            },
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    getDitanceInMeter(results,location,distance,res);
                }
            }
        );
    });
};

var postParty=function(req,res){
    var user_ID= req.user[0].ID;

    var obj; //autotype
    try {
        obj = JSON.parse(req.body);
    } catch (e) {
        obj = req.body;
    }

    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: 'INSERT INTO Parties(Name, Organisator, Amount, FacebookEventID, Cities_ID, Location) ' +
                'VALUES(?,?,?,?,?,?) ',
                timeout: 40000 // 40s
            },
            [obj.Name, obj.Organisator, obj.Amount, obj.FacebookEventID, obj.Cities_ID, obj.Location],
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


//custom
var getDitanceInMeter= function(results,location, distance, res){
    var items=[];
    for(var i=0;i<results.length;i++){
        var distanceInMeters=geolib.getDistance(
            location,
            JSON.parse(results[0].Location)
        );
        if(distanceInMeters<=distance){
            items.push(results[i]);
        }
    }

    res.json(items);
};


module.exports = (function(){

    //public api
    var publicAPI={
        getParties:getParties,
        getPartiesInArea:getPartiesInArea,
        postParty:postParty,
        getPartyById:getPartyById

    };

    return publicAPI;
})();