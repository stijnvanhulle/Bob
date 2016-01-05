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


Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};



var getBobs=function(req,res){
    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }

        connection.query({
                sql: 'SELECT Users.ID as Users_ID, Firstname as Users_Firstname,Users.Added as Users_Added, Users.FacebookID as Users_FacebookID,Users.Lastname as Users_Lastname, Users.Email as Users_Email, Users.Cellphone as Users_Cellphone, Users.Online as Users_Online,' +
                '(Bobs.Active =true AND  Bobs.Active IS NOT NULL) AS IsBob, (Bobs.Offer =true) AS CanOffer, (Users.Bobs_ID IS NOT NULL) as CanBeBob, ' +
                'Bobs.ID as Bobs_ID, Bobs.BobsType_ID as Bobs_BobsType_ID, Bobs.Autotype_ID as Bobs_Autotype_ID, Bobs.PricePerKm as Bobs_PricePerKm, Bobs.LicensePlate as Bobs_LicensePlate, Bobs.Added as Bobs_added, Bobs.Active as Bobs_Active, Bobs.Offer as Bobs_Offer, ' +
                'Users_Locations.Location as Location FROM Users ' +
                'RIGHT JOIN Bobs ON Users.Bobs_ID=Bobs.ID ' +
                'LEFT JOIN Users_Locations ON Users_Locations.Users_ID=Users.ID ' +
                'GROUP BY Bobs.ID',
                timeout: 40000 // 40s
            },
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    var data=[];
                    for(var i=0;i<results.length;i++){
                        var user;
                        if(results[i].Users_ID==null){
                            user=null;
                        }else{
                            user={
                                ID: results[i].Users_ID,
                                Firstname: results[i].Users_Firstname,
                                Lastname: results[i].Users_Lastname,
                                Email: results[i].Users_Email,
                                Cellphone: results[i].Users_Cellphone,
                                IsBob: results[i].IsBob
                            };
                        }
                        var item={
                            User:user,
                            Bob:{
                                ID: results[i].Bobs_ID,
                                BobsType_ID: results[i].Bobs_BobsType_ID,
                                LicensePlate: results[i].Bobs_LicensePlate,
                                Added: results[i].Bobs_Added,
                                Active: results[i].Bobs_Active,
                                Offer: results[i].Bobs_Offer,
                                PricePerKm:results[i].Bobs_PricePerKm,
                                Autotype_ID:results[i].Bobs_Autotype_ID
                            },
                            Accepted: results[i].Accepted,
                            Location: results[i].Location
                        };
                        data.push(item);
                    }
                    res.json(data);
                }
            }
        );
    });
};

var getAverageFromBob=function(req,res){
    var id=req.params.id;
    pool.getConnection(function(error, connection) {
        if (error) {
            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: ' SELECT ROUND(AVG(Bobs_Parties.Rating),2) AS Avg, Bobs_Parties.Bobs_ID as Bobs_ID FROM Bobs_Parties ' +
                'WHERE Bobs_ID=? ' +
                'GROUP BY Bobs_Parties.Bobs_ID ' +
                'ORDER BY Avg DESC',
                timeout: 40000 // 40s
        },
        [id],
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    if(results[0]!=null){
                        res.json(results[0].Avg);
                    }else{
                        res.json({Avg:0});
                    }

                }
            }
        );
    });


};

var getBobsOnline=function(req,res){
    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: 'SELECT Users.ID as Users_ID, Firstname as Users_Firstname,Users.Added as Users_Added, Users.FacebookID as Users_FacebookID,Users.Lastname as Users_Lastname, Users.Email as Users_Email, Users.Cellphone as Users_Cellphone, Users.Online as Users_Online,' +
                '(Bobs.Active =true AND  Bobs.Active IS NOT NULL) AS IsBob, (Bobs.Offer =true) AS CanOffer, (Users.Bobs_ID IS NOT NULL) as CanBeBob,' +
                'Bobs.ID as Bobs_ID, Bobs.BobsType_ID as Bobs_BobsType_ID, Bobs.Autotype_ID as Bobs_Autotype_ID, Bobs.PricePerKm as Bobs_PricePerKm, Bobs.LicensePlate as Bobs_LicensePlate, Bobs.Added as Bobs_added, Bobs.Active as Bobs_Active,Bobs.Offer as Bobs_Offer,  ' +
                'Users_Locations.Location as Location FROM Users ' +
                'RIGHT JOIN Bobs ON Users.Bobs_ID=Bobs.ID ' +
                'LEFT JOIN Users_Locations ON Users_Locations.Users_ID=Users.ID ' +
                'WHERE Users.Online=true AND Bobs.Offer=true ' +
                'GROUP BY Bobs.ID',
                timeout: 40000 // 40s
            },
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    var data=[];
                    for(var i=0;i<results.length;i++){
                        var user;
                        if(results[i].Users_ID==null){
                            user=null;
                        }else{
                            user={
                                ID: results[i].Users_ID,
                                Firstname: results[i].Users_Firstname,
                                Lastname: results[i].Users_Lastname,
                                Email: results[i].Users_Email,
                                Cellphone: results[i].Users_Cellphone,
                                IsBob: results[i].IsBob
                            };
                        }
                        var item={
                            User:user,
                            Bob:{
                                ID: results[i].Bobs_ID,
                                BobsType_ID: results[i].Bobs_BobsType_ID,
                                LicensePlate: results[i].Bobs_LicensePlate,
                                Added: results[i].Bobs_Added,
                                Active: results[i].Bobs_Active,
                                Offer: results[i].Bobs_Offer,
                                PricePerKm:results[i].Bobs_PricePerKm,
                                Autotype_ID:results[i].Bobs_Autotype_ID
                            },
                            Accepted: results[i].Accepted,
                            Location: results[i].Location
                        };
                        data.push(item);
                    }
                    res.json(data);
                }
            }
        );
    });
};
var getBobById=function(req,res){
    var id = req.params.id;
    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: 'SELECT Users.ID as Users_ID, Firstname as Users_Firstname,Users.Added as Users_Added, Users.FacebookID as Users_FacebookID,Users.Lastname as Users_Lastname, Users.Email as Users_Email, Users.Cellphone as Users_Cellphone, Users.Online as Users_Online,' +
                '(Bobs.Active =true AND  Bobs.Active IS NOT NULL) AS IsBob, (Bobs.Offer =true) AS CanOffer, (Users.Bobs_ID IS NOT NULL) as CanBeBob, ' +
                'Bobs.ID as Bobs_ID, Bobs.BobsType_ID as Bobs_BobsType_ID, Bobs.Autotype_ID as Bobs_Autotype_ID, Bobs.PricePerKm as Bobs_PricePerKm, Bobs.LicensePlate as Bobs_LicensePlate, Bobs.Added as Bobs_added, Bobs.Active as Bobs_Active,Bobs.Offer as Bobs_Offer,  ' +
                'Users_Locations.Location as Location FROM Users ' +
                'RIGHT JOIN Bobs ON Users.Bobs_ID=Bobs.ID ' +
                'LEFT JOIN Users_Locations ON Users_Locations.Users_ID=Users.ID ' +
                'WHERE Bobs.ID=?',
                timeout: 40000 // 40s
            },
            [id],
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    var data=[];
                    for(var i=0;i<results.length;i++){
                        var user;
                        if(results[i].Users_ID==null){
                            user=null;
                        }else{
                            user={
                                ID: results[i].Users_ID,
                                Firstname: results[i].Users_Firstname,
                                Lastname: results[i].Users_Lastname,
                                Email: results[i].Users_Email,
                                Cellphone: results[i].Users_Cellphone,
                                IsBob: results[i].IsBob
                            };
                        }
                        var item={
                            User:user,
                            Bob:{
                                ID: results[i].Bobs_ID,
                                BobsType_ID: results[i].Bobs_BobsType_ID,
                                LicensePlate: results[i].Bobs_LicensePlate,
                                Added: results[i].Bobs_Added,
                                Active: results[i].Bobs_Active,
                                Offer: results[i].Bobs_Offer,
                                PricePerKm:results[i].Bobs_PricePerKm,
                                Autotype_ID:results[i].Bobs_Autotype_ID
                            },
                            Accepted: results[i].Accepted,
                            Location: results[i].Location
                        };
                        data.push(item);
                    }
                    res.json(data[0]);
                }
            }
        );
    });
};

var getBobTypes=function(req,res){
    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: 'SELECT * FROM BobsType',
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

var putOffer =function(req,res){
    var user_ID= req.user[0].ID;
    var sql='UPDATE Bobs SET Bobs.Offer=? WHERE Bobs.ID=?';
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
            [obj.Active, obj.Bobs_ID],
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

var postFindBobs=function(req,res){
    var user_ID= req.user[0].ID;
    var sql='';
    var obj= parser(req.body);

    var rating=obj.Rating;
    var minDate=obj.MinDate;
    var bobsType_ID=obj.BobsType_ID;
    var location=parser(obj.Location);
    var maxDistance = obj.MaxDistance;


    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }

        getBobsNearby(connection, location,maxDistance,minDate, function(error,results){
            if(error) res.json({success:false, error:error.toString()});
            var bobs=[];
            for(var i=0;i<results.length;i++){
                console.log("bob_DistanceWITHOUT" + results[i].Bobs_ID + " " + results[i].DistanceInMeters);
                if(maxDistance!=null){
                    console.log("bob_Distance" + results[i].Bobs_ID + " " + results[i].DistanceInMeters + ' -  ' + maxDistance);
                    if(results[i].DistanceInMeters<maxDistance){
                        if(!bobs.contains(results[i].Bobs_ID)){
                            bobs.push(results[i].Bobs_ID);
                        }else{
                        }

                    }
                }else{
                    if(!bobs.contains(results[i].Bobs_ID)){
                        bobs.push(results[i].Bobs_ID);
                    }
                }

            }

            getAvg(connection, rating, bobs, function(error,newBobs){
                connection.query({
                        sql: 'SELECT * FROM Bobs ' +
                        'WHERE BobsType_ID < ? ',
                        timeout: 40000 // 40s
                    },
                    [bobsType_ID],
                    function (error, results, fields) {
                        connection.release();
                        if(!error){
                            var _bobs=[];
                            for(var i=0;i<results.length;i++){
                                for(var i2=0;i2<newBobs.length;i2++){
                                    if(results[i].ID==newBobs[i2]){
                                        _bobs.push(results[i]);
                                    }
                                }
                            }

                            res.json(_bobs);
                        }else{
                            res.json({success:false});
                        }
                    });
            });
        });

    });
};

var getAvg=function(connection, rating, bobs, cb){
    var sql="SELECT ROUND(AVG(Bobs_Parties.Rating),2) AS Avg, Bobs_Parties.Bobs_ID as Bobs_ID FROM Bobs_Parties " +
        "GROUP BY Bobs_Parties.Bobs_ID " +
        "ORDER BY Avg DESC";
    connection.query({
            sql: sql,
            timeout: 40000 // 40s
        },
        function (error, results, fields) {
            if(!error){
                var newBobs=[];

                if(rating==null || rating ==0){
                    cb(null, bobs);
                }else{
                    for(var i=0;i<results.length;i++){
                        for(var i2=0;i2<bobs.length;i2++){

                            if(results[i].Bobs_ID==bobs[i]){
                                if(results[i].Avg>= rating){
                                    newBobs.push(results[i].Bobs_ID);
                                }
                            }
                        }
                    }
                    cb(null,newBobs);
                }



            }else{
                cb(error,null);
            }
        });

};

var getBobsNearby=function(connection,location, maxDistance,date, cb){
    var sql="SELECT Bobs.ID as Bobs_ID, Users_Locations.Location,Users_Locations.Added FROM Users_Locations INNER JOIN Users ON Users_Locations.Users_ID= Users.ID INNER JOIN Bobs ON Bobs.ID=Users.Bobs_ID " +
        "WHERE Bobs.Active =1 AND Users.Online=1 AND Bobs.Offer=1 " +
        // "WHERE Bobs.Active =1 AND Users.Online=1 AND Users_Locations.Added >= ?" +
        "ORDER BY Users_Locations.Added DESC";

    connection.query({
            sql: sql,
            timeout: 40000 // 40s
        },
        //[date],
        function (error, results, fields) {
            if(!error){
                for(var i=0;i<results.length;i++){
                    if(location!=null){
                        var locationN={'latitude':location.Latitude, 'longitude': location.Longitude};
                        var distanceInMeters=geolib.getDistance(
                            locationN,
                            JSON.parse(results[i].Location)
                        );
                        results[i].DistanceInMeters=distanceInMeters;
                    }

                }
                cb(null,results);
            }else{
                cb(error,null);
            }
        });
};


var postBobs_Parties=function(req,res){
    var user_ID= req.user[0].ID;
    var sql='';
    var obj= parser(req.body);

    var users_ID=obj.Users_ID;
    var party_ID=obj.Party_ID;
    var statuses_ID=obj.Statuses_ID;
    var bobs_ID=obj.Bobs_ID;
    var trips_ID=obj.Trips_ID;


    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: '',
                timeout: 40000 // 40s
            },
            [users_ID,party_ID,statuses_ID,bobs_ID,trips_ID],
            function (error, results, fields) {
                connection.release();
                if(!error){
                    res.json(results[0]);
                }else{
                    res.json({success:false});
                }
            });

    });
};

var updateBobs_Parties=function(req,res){
    var user_ID= req.user[0].ID;
    var sql='';
    var obj= parser(req.body);

    var rating= obj.Rating;



    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: '',
                timeout: 40000 // 40s
            },
            [rating],
            function (error, results, fields) {
                connection.release();
                if(!error){
                    res.json(results[0]);
                }else{
                    res.json({success:false});
                }
            });

    });
};

module.exports = (function(){

    //public api
    var publicAPI={
        getBobs:getBobs,
        getBobsOnline:getBobsOnline,
        putOffer:putOffer,
        postFindBobs:postFindBobs,
        postBobs_Parties:postBobs_Parties,
        getBobTypes:getBobTypes,
        getBobById:getBobById,
        updateBobs_Parties:updateBobs_Parties,
        getAverageFromBob:getAverageFromBob
    };

    return publicAPI;
})();
