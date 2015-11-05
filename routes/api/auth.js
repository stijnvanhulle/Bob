var express         = require('express');
var mysql           = require('mysql');
var path            = require("path");
var passport        = require('passport');
var app             = express();
var router          = express.Router();
var fs              = require('fs');
var passport        = require('passport');
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var pool            = require('../../libs/mysql');

/**
 * @api {post} /api/auth/local POST Locallogin
 * @apiVersion 0.0.1
 * @apiName login
 * @apiGroup Auth
 * @apiDescription Login the user
 *
 * @apiParam {String} Email
 * @apiParam {String} Password Gehashed
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       success: true
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */

router.post('/local',jsonParser, function(req, res, next) {
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
});

/**
 * @api {post} /api/auth/facebook POST Facebook
 * @apiVersion 0.0.1
 * @apiName loginFacebook
 * @apiGroup Auth
 * @apiDescription Login the user with facebook
 *
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       success: true
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/facebook',jsonParser, function(req, res, next) {
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
});
/**
 * @api {get} /api/auth/callback GET Callback
 * @apiVersion 0.0.1
 * @apiName callback
 * @apiGroup Auth
 * @apiDescription Callback from Facebook
 *
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       success: true
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/success', function(req, res) {
    if(req.isAuthenticated()){
        res.json({success: true});
    }else{
        res.json({success: false});
    }

});

/**
 * @api {get} /api/auth/callback GET Callback
 * @apiVersion 0.0.1
 * @apiName callback
 * @apiGroup Auth
 * @apiDescription Callback from Facebook
 *
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       success: true
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/callback', passport.authenticate('facebook', { failureRedirect: '/facebook' }), function(req, res) {
    // Successful authentication, redirect home.
    res.json({success: true});
});

/**
 * @api {post} /api/auth/logoff POST Logoff
 * @apiVersion 0.0.1
 * @apiName logoff
 * @apiGroup Auth
 * @apiDescription Logoff current user
 *
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       success: true
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.post('/logoff', function(req, res){
    req.logout();
    console.log(req.isAuthenticated());
    res.json({success: true});

});
module.exports = router;
