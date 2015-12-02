var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var controller      = require('../../controllers/countriesController');
var access          = require('../../controllers/authController').access;

/**
 * @api {get} /api/countries/ GET countries
 * @apiVersion 0.0.1
 * @apiName All
 * @apiGroup Countries
 * @apiDescription Get all countries
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
router.get('/', access, controller.getCountries);

module.exports = router;
