var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var controller      = require('../../controllers/partiesController');
var access          = require('../../controllers/authController').access;

/**
 * @api {get} /api/parties/ GET parties
 * @apiVersion 0.0.1
 * @apiName all
 * @apiGroup Parties
 * @apiDescription Get all parties
 *
 * @apiSuccess {Integer} ID Table: Parties
 * @apiSuccess {String} Name Table: Parties
 * @apiSuccess {String} Organisator Table: Parties
 * @apiSuccess {Integer} Amount Table: Parties
 * @apiSuccess {String} FacebookEventID Table: Parties
 * @apiSuccess {Integer} Cities_ID Table: Parties
 * @apiSuccess {Timestamp} Added Table: Parties
 * @apiSuccess {String} Location Table: Parties, {latitude:x,longitude:y}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/', access, controller.getParties);

/**
 * @api {post} /api/parties/area POST parties in the area
 * @apiVersion 0.0.1
 * @apiName allinarea
 * @apiGroup Parties
 * @apiDescription Get all parties in the area
 *
 * @apiParam {String} Location Example: {latitude:x,longitude:y}
 * @apiParam {Integer} Distance Example: Max Distance
 *
 *
 * @apiSuccess {Integer} ID Table: Parties
 * @apiSuccess {String} Name Table: Parties
 * @apiSuccess {String} Organisator Table: Parties
 * @apiSuccess {Integer} Amount Table: Parties
 * @apiSuccess {String} FacebookEventID Table: Parties
 * @apiSuccess {Integer} Cities_ID Table: Parties
 * @apiSuccess {Timestamp} Added Table: Parties
 * @apiSuccess {String} Location Table: Parties, {latitude:x,longitude:y}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.post('/area',jsonParser, controller.getPartiesInArea);

/**
 * @api {post} /api/parties/ POST party
 * @apiVersion 0.0.1
 * @apiName post
 * @apiGroup Parties
 * @apiDescription New party
 *
 * @apiParam {String} Name Table: Parties
 * @apiParam {String} Organisator Table: Parties
 * @apiParam {Integer} Amount Table: Parties
 * @apiParam {String} FacebookEventID Table: Parties
 * @apiParam {Integer} Cities_ID Table: Cities
 * @apiParam {Integer} Location Table: Cities, {latitude:x,longitude:y}
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
router.post('/', access, controller.postParty);

router.get('/:id', access, controller.getPartyById);

module.exports = router;
