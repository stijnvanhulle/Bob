var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var controller      = require('../../controllers/destinationsController');
var access          = require('../../controllers/authController').access;

/**
 * @api {get} /api/destinations/ GET destinations
 * @apiVersion 0.0.1
 * @apiName all
 * @apiGroup Destinations
 * @apiDescription Get all destinations
 *
 * @apiSuccess {Integer} ID Table: Countries
 * @apiSuccess {String} Name Table: Countries

 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/', access,controller.getDestinations);

/**
 * @api {get} /api/destinations/default GET default destination
 * @apiVersion 0.0.1
 * @apiName Default
 * @apiGroup Destinations
 * @apiDescription Get home
 *
 * @apiSuccess {Integer} ID Table: Countries
 * @apiSuccess {String} Name Table: Countries

 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/default', access,controller.getDefaultDestination);

module.exports = router;
