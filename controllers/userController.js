/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql');
var md5             = require('md5');
var async           = require('async');

var getUser=function(req,res){
    var user_ID= req.user[0].ID;
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT ID, Firstname, Lastname, Email, Cellphone, (Bobs_ID IS NOT NULL) AS IsBob FROM Users ' +
                'WHERE ID=?',
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

var getProfile=function(req,res){
    var user_ID= req.user[0].ID;
    var sql="";

    if(user_ID!=null){
        sql='SELECT Users.ID as Users_ID, Firstname, Lastname, Email, Cellphone, (Bobs_ID IS NOT NULL) AS IsBob, '+
            'Bobs.ID as Bobs_ID, Bobs.BobsType_ID As BobsType_ID, BobsType.Name As BobsType_Name, Bobs.Autotype_ID as Autotype_ID, Autotype.Name as Autotype_Name, Bobs.LicensePlate FROM Users '+
            'INNER JOIN Bobs ON Users.Bobs_ID=Bobs.ID '+
            'INNER JOIN BobsType ON BobsType.ID=Bobs.BobsType_ID '+
            'INNER JOIN Autotype ON Autotype.ID=Bobs.Autotype_ID ' +
            'WHERE Users.ID=?';
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

var getPoints=function(req,res){
    var sql='SELECT PointsDescription_ID,PointsDescription.Description as PointsDescription_Name,PointsDescription.Points as Points, Added FROM Bob.Users_PointsDescription '+
        'INNER JOIN PointsDescription ON PointsDescription.ID=Users_PointsDescription.PointsDescription_ID';


    pool.getConnection(function(error, connection) {
        connection.query({
                sql: sql,
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

var getPointsAmount=function(req,res){
    var sql='SELECT SUM(PointsDescription.Points) as Points FROM Bob.Users_PointsDescription '+
        'INNER JOIN PointsDescription ON PointsDescription.ID=Users_PointsDescription.PointsDescription_ID';

    pool.getConnection(function(error, connection) {
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
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


var postUser=function(req,res) {
    var user;
    try {
        user = JSON.parse(req.body.user);
    } catch (e) {
        user = req.body.user;
    }


    pool.getConnection(function (error, connection) {
        connection.beginTransaction(function (err) {
            if (error) {
                connection.release();
                res.json({success: false, error: error.message});
            }

            if (user.IsBob == true || register.Bobs_ID!=null) {
                async.waterfall([
                    function (cb) {
                        addBob(connection, user, function (err, id) {
                            if (err) {
                                cb(err, null);
                            } else {
                                cb(null, id);
                            }
                        });
                    },
                    function (id, cb) {
                        addUser(connection, user, id, function (err) {
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

            } else {
                addUser(connection, user, null, function (err) {
                    commit(connection, err, res);
                });


            }
        });

    });

};

var putUser=function(req,res){
    var user;
    try {
        user = JSON.parse(req.body.user);
    } catch (e) {
        user = req.body.user;
    }

    pool.getConnection(function (error, connection) {
        connection.beginTransaction(function (err) {
            if (error) {
                connection.release();
                res.json({success: false, error: error.message});
            }

            if (user.IsBob == true || register.Bobs_ID!=null) {
                async.waterfall([
                    function (cb) {
                        editBob(connection, user, function (err) {
                            if (err) {
                                cb(err, null);
                            } else {
                                cb(null);
                            }
                        });
                    },
                    function (cb) {
                        editUser(connection, user, function (err) {
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

            } else {
                editUser(connection, user, function (err) {
                    commit(connection, err, res);
                });


            }
        });

    });
};

var getLocation=function(req,res){
    var user_ID= req.user[0].ID;

    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT * FROM Users_Locations WHERE ' +
                'Users_ID=? ' +
                'ORDER BY Added DESC LIMIT 1',
                timeout: 40000 // 40s
            },
            [user_ID],
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    results[0].Location=JSON.parse(results[0].Location);
                    res.json(results[0]);
                }


            });
    });
};

var postLocation=function(req,res){
    var user_ID= req.user[0].ID;
    var location;

    try {
        location = JSON.parse(req.body.location);
    } catch (e) {
        location = req.body.location;
    }

    var currentLocation={'latitude':location.Latitude,'longitude': location.Longitude};

    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'INSERT INTO Users_Locations(Users_ID,Location) VALUES(?,?)',
                timeout: 40000 // 40s
            },
            [user_ID,JSON.stringify(currentLocation)],
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
var addUser=function(connection, user, bobs_ID, cb){
    var sql;
    var items;
    if(bobs_ID==null){
        sql='INSERT INTO Users (Firstname,Lastname,Email,Cellphone,Password, FacebookID) ' +
            'VALUES (?,?,?,?,?,?)';
        items=[user.Firstname,user.Lastname,user.Email,user.Cellphone, md5(user.Password), user.FacebookID];
    }else{
        sql='INSERT INTO Users (Firstname,Lastname,Email,Cellphone,Password, FacebookID, Bobs_ID) ' +
            'VALUES (?,?,?,?,?,?,?)';
        items=[user.Firstname,user.Lastname,user.Email,user.Cellphone, md5(user.Password), user.FacebookID, bobs_ID];

    }
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

var addBob=function(connection, user, cb){
    connection.query({
            sql: 'INSERT INTO Bobs (PricePerKm, BobsType_ID, LicensePlate, AutoType_ID) ' +
            'VALUES (?,?,?,?)',
            timeout: 40000 // 40s
        },
        [user.PricePerKm, user.BobsType_ID,user.LicensePlate, user.AutoType_ID],
        function (error, rows, fields) {
            if (error) {
                cb(error);
            }else{
                cb(null, rows.insertId);
            }
    });
};

var editUser=function(connection, user, cb){
    var sql;
    var items;
    if(user.bobs_ID==null){
        sql='UPDATE Users SET Firstname=?,Lastname=?,Email=?,Cellphone=?,Password=?, FacebookID=? ' +
            'WHERE Users.ID=?';
        items=[user.Firstname,user.Lastname,user.Email,user.Cellphone, md5(user.Password), user.FacebookID, user.Users_ID];

    }else{
        sql= 'UPDATE Users SET Firstname=?,Lastname=?,Email=?,Cellphone=?,Password=?,FacebookID=?,Bobs_ID=? ' +
            'WHERE Users.ID=?';
        items=[user.Firstname,user.Lastname,user.Email,user.Cellphone, md5(user.Password), user.FacebookID, user.bobs_ID, user.Users_ID ];
    }
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

var editBob=function(connection, user, cb){
    connection.query({
            sql: 'UPDATE Bobs SET PricePerKm=?, BobsType_ID=?, LicensePlate=?, AutoType_ID=? ' +
            'WHERE Bobs.ID=?',
            timeout: 40000 // 40s
        },
        [user.PricePerKm, user.BobsType_ID,user.LicensePlate, user.AutoType_ID, user.Bobs_ID],
        function (error, rows, fields) {
            if (error) {
                cb(error);
            }else{
                cb(null);
            }
        });
};

var commit=function(connection, err, res){
    if(err){
        return connection.rollback(function() {
            res.json({success:false,error:err.message});
        });
    }else{
        connection.commit(function(err) {
            if (err) {
                return connection.rollback(function() {
                    connection.release();
                    console.log('unsuccessfull!');
                    res.json({success:false,error:err.message});
                });
            }else{
                connection.release();
                console.log('success!');
                res.json({success:true});
            }

        });
    }
};

module.exports = (function(){

    //public api
    var publicAPI={
        getUser:getUser,
        getProfile:getProfile,
        getPoints:getPoints,
        getPointsAmount:getPointsAmount,
        postUser:postUser,
        putUser:putUser,
        getLocation:getLocation,
        postLocation:postLocation
    };

    return publicAPI;
})();