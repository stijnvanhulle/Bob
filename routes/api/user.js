var express         = require('express');
var path            = require("path");
var passport        = require('passport');
var app             = express();
var router          = express.Router();
var fs              = require('fs');
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var controller      = require('../../controllers/userController');
var access          = require('../../controllers/authController').access;
/**
 * @api {get} /api/user/ GET user
 * @apiVersion 0.0.1
 * @apiName /
 * @apiGroup User
 * @apiDescription Get small info about current user
 *
 * @apiSuccess {Integer} ID Table: Users
 * @apiSuccess {String} Firstname Table: Users
 * @apiSuccess {String} Lastname Table: Users
 * @apiSuccess {String} Email Table: Users
 * @apiSuccess {String} Cellphone Table: Users
 * @apiSuccess {Boolean} IsBob Table: Users
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/', access, controller.getUser);

/**
 * @api {get} /api/user/profile GET profile
 * @apiVersion 0.0.1
 * @apiName profile
 * @apiGroup User
 * @apiDescription Get profile of the current user.
 *
 * @apiSuccess {Integer} Users_ID Table: Users/Bobs
 * @apiSuccess {String} Firstname Table: Users
 * @apiSuccess {String} Lastname Table: Users
 * @apiSuccess {String} Email Table: Users
 * @apiSuccess {String} Cellphone Table: Users
 * @apiSuccess {Boolean} IsBob
 * @apiSuccess {Integer} Bobs_ID Table: Users/Bob
 * @apiSuccess {Integer} BobsType_ID Table: Bob
 * @apiSuccess {String} BobsType_Name Table: BobsType
 * @apiSuccess {Integer} Autotype_ID Table: Autotype/Bob
 * @apiSuccess {String} Autotype_Name Table: AutoType
 * @apiSuccess {String} LicensePlate
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/profile/', access, controller.getProfile);
/**
 * @api {get} /api/user/points GET points[]
 * @apiVersion 0.0.1
 * @apiName points
 * @apiGroup User
 * @apiDescription Get all points of the current user.
 *
 * @apiSuccess {Integer} PointsDescription_ID Table: Users_PointsDescription/PointsDescription
 * @apiSuccess {String} PointsDescription_Name Table: PointsDescription
 * @apiSuccess {DoublePrecision} Points Table: PointsDescription
 * @apiSuccess {Timestamp} Added Table: PointsDescription
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/points/', access, controller.getPoints);

/**
 * @api {get} /api/user/points/amount GET Total points
 * @apiVersion 0.0.1
 * @apiName pointsAmount
 * @apiGroup User
 * @apiDescription Get the total points of the current user.
 *
 * @apiSuccess {DoublePrecision} Points Table: PointsDescription
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/points/amount', access, controller.getPointsAmount);

/**
 * @api {post} /api/user/register POST Register
 * @apiVersion 0.0.1
 * @apiName register
 * @apiGroup User
 * @apiDescription Register a new user
 *
 * @apiParam {String} Firstname
 * @apiParam {String} Lastname
 * @apiParam {String} Email
 * @apiParam {String} [Cellphone]
 * @apiParam {String} Password
 * @apiParam {String} [FacebookID]
 * @apiParam {Boolean} IsBob
 *
 * @apiParam {DoublePrecision} [PricePerKm] Table: Bobs
 * @apiParam {Integer} [BobsType_ID] Table: Bobs
 * @apiParam {String} [LicensePlate] Table: Bobs
 * @apiParam {Integer} [AutoType_ID] Table: Bobs
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
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
router.post('/register',jsonParser, access,controller.postUser);

/**
 * @api {put} /api/user/edit PUT Edit
 * @apiVersion 0.0.1
 * @apiName edit
 * @apiGroup User
 * @apiDescription Edit a currentuser
 *
 * @apiParam {Integer} Bobs_ID
 * @apiParam {Integer} Users_ID
 * @apiParam {String} Firstname
 * @apiParam {String} Lastname
 * @apiParam {String} Email
 * @apiParam {String} [Cellphone]
 * @apiParam {String} Password
 * @apiParam {String} [FacebookID]
 * @apiParam {Boolean} IsBob
 *
 * @apiParam {DoublePrecision} [PricePerKm] Table: Bobs
 * @apiParam {Integer} [BobsType_ID] Table: Bobs
 * @apiParam {String} [LicensePlate] Table: Bobs
 * @apiParam {Integer} [AutoType_ID] Table: Bobs
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
router.put('/edit', jsonParser, access,controller.putUser);


/**
 * @api {post} /api/user/location POST Location
 * @apiVersion 0.0.1
 * @apiName Location
 * @apiGroup User
 * @apiDescription Update location
 *
 * @apiParam {String} Latitude
 * @apiParam {String} Longitude
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
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
router.post('/location',jsonParser, access,controller.postLocation);

/**
 * @api {get} /api/user/location GET Location
 * @apiVersion 0.0.1
 * @apiName LatestLocation
 * @apiGroup User
 * @apiDescription Latest location
 *
 * @apiSuccess {Integer} ID Table: Users
 * @apiSuccess {String} Firstname Table: Users
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/location',access,controller.getLocation);

module.exports = router;
