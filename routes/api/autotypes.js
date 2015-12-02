var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var pool            = require('../../libs/mysql');
var controller      = require('../../controllers/autotypesController');
var access          = require('../../controllers/authController').access;

/**
 * @api {get} /api/autotypes/ GET autotypes
 * @apiVersion 0.0.1
 * @apiName all
 * @apiGroup Autotype
 * @apiDescription Get all autotypes
 *
 * @apiSuccess {Integer} ID Table: Autotype
 * @apiSuccess {String} Name Table: Autotype
 * @apiSuccess {String} Brand Table: Autotype
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/', access, controller.getAutotypes);

/**
 * @api {post} /api/autotypes/ POST autotypes
 * @apiVersion 0.0.1
 * @apiName Add
 * @apiGroup Autotype
 * @apiDescription Post autotype
 *
 * @apiParam {String} Name
 * @apiParam {String} Brand
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
router.post('/', jsonParser,access,controller.postAutotype);

module.exports = router;
