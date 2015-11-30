var express         = require('express');
var path            = require("path");
var app             = express();
var router          = express.Router();
var fs              = require('fs');
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var controller      = require('../../controllers/authController');
var passport        = require('passport');

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
router.post('/local',jsonParser, controller.local);

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
router.get('/facebook',jsonParser, controller.facebook);
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
router.post('/logoff', controller.logoff);
module.exports = router;
