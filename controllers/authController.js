/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql').getPool();

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');


var local=function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        //console.log(err, info, user);
        //login db
        if (err)   { return res.json({ error: err.message, success: false }); }
        if (!user) { return res.json({error : "Invalid Login", success: false}); }
        req.login(user, {}, function(err) {
            if (err) { return res.json({error:err, success: false}); }
            online(req.user[0].ID, function(err, result){
                if(result==true){
                    return res.json(
                        { user: {
                            ID: req.user[0].ID,
                            Email: req.user[0].Email,
                            FirstName: req.user[0].FirstName,
                            LastName: req.user[0].LastName,
                            Cellphone:req.user[0].Cellphone,
                            IsBob:req.user[0].IsBob
                        },
                            success: true
                        });
                }

            });


        });
    })(req, res, next);
};

var facebook= function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
        //console.log(err, info, user);
        //login db
        if (err)   { return res.json({ error: err.message, success: false }); }
        if (!user) { return res.json({error : "Invalid Login", success: false}); }
        req.login(user, {}, function(err) {
            if (err) { return res.json({error:err, success: false}); }
            return res.json(
                { user: {
                    ID: req.user[0].ID,
                    Email: req.user[0].Email,
                    FirstName: req.user[0].FirstName,
                    LastName: req.user[0].LastName,
                    Cellphone:req.user[0].Cellphone,
                    IsBob:req.user[0].IsBob
                },
                    success: true
                });
        });
    })(req, res, next);
};

var logoff=function(req,res){
    var id=req.user[0].ID;
    var sql='UPDATE Users SET Online=False ' +
        'WHERE ID=?';
    pool.getConnection(function(error, connection) {
        if (error) {
            res.json({success : false, error : error});
            return;
        }

        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            [id],
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success: false});
                } else{
                    req.logout();
                    res.json({success: true});
                }
            }
        );
    });

};
var access=function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        //req.user=[];
        //req.user.push({ID:1});
        //next();

        res.json({success:false, error:'Not authenticated'});
    }
};

var online =function(id,cb){
    var sql='UPDATE Users SET Online=True ' +
        'WHERE ID=?';
    pool.getConnection(function(error, connection) {
        if (error) {
            cb(error);
        }
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            [id],
            function (error, results, fields) {
                connection.release();

                if (error){
                    cb(error,null);
                } else{
                    cb(null,true);
                }
            }
        );
    });
};

module.exports = (function(){

    //public api
    var publicAPI={
        local:local,
        logoff:logoff,
        facebook:facebook,
        access:access
    };

    return publicAPI;
})();