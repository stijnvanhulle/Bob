var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var controller      = require('../../controllers/usersController');
var access          = require('../../controllers/authController').access;


/**
 * @api {get} /api/users/ GET users[]
 * @apiVersion 0.0.1
 * @apiName All
 * @apiGroup Users
 * @apiDescription Get all users
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
router.get('/', access, controller.getUsers);


/**
 * @api {get} /api/users/online GET users online[]
 * @apiVersion 0.0.1
 * @apiName All online
 * @apiGroup Users
 * @apiDescription Get all users online
 *
 * @apiSuccess {Integer} ID Table: Users
 * @apiSuccess {String} Firstname Table: Users
 * @apiSuccess {String} Lastname Table: Users
 * @apiSuccess {String} Email Table: Users
 * @apiSuccess {Boolean} IsBob Table: Users
 * @apiSuccess {Boolean} Online Table: Users
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/online', access, controller.getUsersOnline);

module.exports = router;
