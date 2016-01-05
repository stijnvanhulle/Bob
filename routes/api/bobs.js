var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var controller      = require('../../controllers/bobsController');
var access          = require('../../controllers/authController').access;

/**
 * @api {get} /api/bobs GET Bobs
 * @apiVersion 0.0.1
 * @apiName get
 * @apiGroup Bobs
 * @apiDescription Get all bobs
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
router.get('/', access,controller.getBobs);

/**
 * @api {get} /api/bobs/online GET bobs online[]
 * @apiVersion 0.0.1
 * @apiName All online
 * @apiGroup Bobs
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
router.get('/online', access, controller.getBobsOnline);

/**
 * @api {post} /api/bobs/find POST find
 * @apiVersion 0.0.1
 * @apiName find
 * @apiGroup Bobs
 * @apiDescription Find online bobs with params
 *
 * @apiParam {Integer} Rating
 * @apiParam {Timestamp} Date
 * @apiParam {Integer} BobsType_ID
 * @apiParam {Integer} Location {latitude:x,longitude:y}
 *
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
router.post('/find', access, controller.postFindBobs);
router.get('/types', controller.getBobTypes);
router.put("/offer", access, controller.putOffer);
router.get('/avg/:id', access, controller.getAverageFromBob);

router.get('/:id', access, controller.getBobById);



module.exports = router;
