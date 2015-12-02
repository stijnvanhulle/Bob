var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var controller      = require('../../controllers/friendsController');
var access          = require('../../controllers/authController').access;

/**
 * @api {get} /api/friends/ GET friends
 * @apiVersion 0.0.1
 * @apiName All
 * @apiGroup Friends
 * @apiDescription Get all friends form current user
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
router.get('/', access, controller.getFriends);

module.exports = router;
