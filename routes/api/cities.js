var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var controller      = require('../../controllers/citiesController');
var access          = require('../../controllers/authController').access;


/**
 * @api {get} /api/cities/ GET cities
 * @apiVersion 0.0.1
 * @apiName All
 * @apiGroup Cities
 * @apiDescription Get all cities
 *
 * @apiSuccess {Integer} ID Table: Cities
 * @apiSuccess {String} Name Table: Cities
 * @apiSuccess {String} Postcode Table: Cities
 * @apiSuccess {String} Countries_ID Table: Countries

 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/', access,controller.getCities);

router.get('/:id', access,controller.getCityById);

module.exports = router;
