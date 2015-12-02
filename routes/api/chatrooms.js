var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var controller      = require('../../controllers/chatroomsController');
var access          = require('../../controllers/authController').access;
/**
 * @api {get} /api/chatrooms GET rooms[]
 * @apiVersion 0.0.1
 * @apiName /
 * @apiGroup Chatroom
 * @apiDescription Get all chatrooms of current user
 *
 * @apiSuccess {Integer} ID Table:ChatRooms
 * @apiSuccess {Integer} Bobs_ID Table:ChatRooms
 * @apiSuccess {TimeStamp} Added Table:ChatRooms
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */

router.get('/', access,controller.getChatrooms);

/**
 * @api {post} /api/chatrooms POST room
 * @apiVersion 0.0.1
 * @apiName newRoom
 * @apiGroup Chatroom
 * @apiDescription Add a new room
 *
 * @apiParam {String} Bobs_ID
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
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

router.post('/',access,controller.postChatroom);

/**
 * @api {get} /api/chatrooms/:id GET room comments
 * @apiVersion 0.0.1
 * @apiName room_comments
 * @apiGroup Chatroom
 * @apiDescription Get chatcomments from room
 *
 * @apiSuccess {Integer} ID Table:ChatComments
 * @apiSuccess {Integer} ChatRooms_ID Table:ChatComments
 * @apiSuccess {String} Comment Table:ChatComments
 * @apiSuccess {Integer} Users_ID Table:ChatComments/Users
 * @apiSuccess {String} Users_Firstname Table:Users
 * @apiSuccess {String} Users_Lastname Table:Users
 * @apiSuccess {String} Users_Email Table:Users
 * @apiSuccess {String} Users_Cellphone Table:Users
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.get('/:id', access, controller.getChatroomByID);

module.exports = router;
