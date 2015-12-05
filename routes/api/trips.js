var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var controller      = require('../../controllers/tripsController');
var access          = require('../../controllers/authController').access;
/**
 * @api {get} /api/trips GET trips[]
 * @apiVersion 0.0.1
 * @apiName All
 * @apiGroup Trips
 * @apiDescription Get all trips of current user
 *
 * @apiSuccess {Integer} Trips_ID Table: Trips
 * @apiSuccess {String} Trips_CurrentLocation Table: Trips, {latitude:"",longitude:""}
 * @apiSuccess {Integer}r Trips_Bobs_ID Table: Trips
 * @apiSuccess {Integer} Users_ID Table: Users
 * @apiSuccess {Integer} Destinations_ID Table: Users_Destinations/Trips
 * @apiSuccess {String} Destinations_Location Table: Users_Destinations, {latitude:"",longitude:""}
 * @apiSuccess {Integer} Cities_ID Table: Cities/Destinations
 * @apiSuccess {String} Cities_Name Table: Cities
 * @apiSuccess {Boolean} Default Table: Users_Destinations
 * @apiSuccess {Timestamp} Added Table: Users_Destinations
 * @apiSuccess {String} Name Table: Users_Destinations
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/', access, controller.getTrips);


/**
 * @api {get} /api/trips/current GET CurrentTrip
 * @apiVersion 0.0.1
 * @apiName current
 * @apiGroup Trips
 * @apiDescription Get trip of current user
 *
 * @apiSuccess {Integer} Trips_ID Table: Trips
 * @apiSuccess {String} Trips_CurrentLocation Table: Trips, {latitude:"",longitude:""}
 * @apiSuccess {Integer} Trips_Bobs_ID Table: Trips
 * @apiSuccess {Integer} Users_ID Table: Users
 * @apiSuccess {Integer} Destinations_ID Table: Users_Destinations/Trips
 * @apiSuccess {String} Destinations_Location Table: Users_Destinations, {latitude:"",longitude:""}
 * @apiSuccess {Integer} Cities_ID Table: Cities/Destinations
 * @apiSuccess {String} Cities_Name Table: Cities
 * @apiSuccess {Boolean} Default Table: Users_Destinations
 * @apiSuccess {Timestamp} Added Table: Users_Destinations
 * @apiSuccess {String} Name Table: Users_Destinations
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/current', access, controller.getCurrentTrip);

/**
 * @api {post} /api/trips/ POST trip
 * @apiVersion 0.0.1
 * @apiName posttrips
 * @apiGroup Trips
 * @apiDescription Post trip
 *
 * @apiParam {Integer} Bobs_ID table: Bobs
 * @apiParam {Integer} Destinations_ID table: Destinations
 * @apiParam {String} Friends table: Friends, example: {id1,id2,id3,id4}
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
router.post('/', access, controller.postTrip);

router.post('/location', access, controller.postLocation);
module.exports = router;
