/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql');


var local=function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
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
    req.logout();
    res.json({success: true});
};
var access=function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.json({success:false, error:'Not authenticated'});
        next();
    }
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