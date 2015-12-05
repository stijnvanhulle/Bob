var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var controller      = require('../../controllers/statusesController');
var access          = require('../../controllers/authController').access;

/**
 * @api {get} /api/statuses/ GET statuses
 * @apiVersion 0.0.1
 * @apiName All
 * @apiGroup Statuses
 * @apiDescription Get all statuses
 *
 * @apiSuccess {Integer} ID Table: Statuses
 * @apiSuccess {String} Name Table: Statuses
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/', access, controller.getStatuses);

/**
 * @api {post} /api/statuses/ POST statuses
 * @apiVersion 0.0.1
 * @apiName /
 * @apiGroup Statuses
 * @apiDescription Post autotype
 *
 * @apiParam {String} Name
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
router.post('/', access, controller.postStatus);

module.exports = router;
