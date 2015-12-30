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
 * @apiSuccess {Integer} Users_ID Table: Users
 * @apiSuccess {String} Users_Firstname Table: Users
 * @apiSuccess {String} Users_Lastname Table: Users
 * @apiSuccess {String} Users_Email Table: Users
 * @apiSuccess {String} Users_Cellphone Table: Users
 * @apiSuccess {Boolean} IsBob Table: Users
 *
 * @apiSuccess {Integer} Bobs_ID Table: Bobs
 * @apiSuccess {Integer} Bobs_BobsType_ID Table: Bobs
 * @apiSuccess {String} Users_Cellphone Table: Bobs
 * @apiSuccess {String} Bobs_LicensePlate Table: Bobs
 * @apiSuccess {Timestamp} Bobs_Added Table: Bobs
 * @apiSuccess {Boolean} Bobs_Active Table: Bobs
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
 * @apiSuccess {Integer} Users_ID Table: Users
 * @apiSuccess {String} Users_Firstname Table: Users
 * @apiSuccess {String} Users_Lastname Table: Users
 * @apiSuccess {String} Users_Email Table: Users
 * @apiSuccess {String} Users_Cellphone Table: Users
 * @apiSuccess {Boolean} IsBob Table: Users
 *
 * @apiSuccess {Integer} Bobs_ID Table: Bobs
 * @apiSuccess {Integer} Bobs_BobsType_ID Table: Bobs
 * @apiSuccess {String} Users_Cellphone Table: Bobs
 * @apiSuccess {String} Bobs_LicensePlate Table: Bobs
 * @apiSuccess {Timestamp} Bobs_Added Table: Bobs
 * @apiSuccess {Boolean} Bobs_Active Table: Bobs
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/online', access, controller.getUsersOnline);
router.post('/find', access, controller.getUserByEmail);

router.get('/:id', access, controller.getUserById);

module.exports = router;
