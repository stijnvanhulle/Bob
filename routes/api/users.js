var express         = require('express');
var mysql           = require('mysql');
var path            = require("path");
var passport        = require('passport');
var app             = express();
var router          = express.Router();
var fs              = require('fs');
var passport        = require('passport');
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var pool            = require('../../libs/mysql');


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
router.get('/', function(req, res, next) {
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT ID, Firstname, Lastname, Email, Cellphone, (Bobs_ID IS NOT NULL) AS IsBob FROM Users',
                timeout: 40000 // 40s
            },
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    res.json(results);
                }
            }
        );
    });
});

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
router.get('/', function(req, res, next) {
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT Users,ID,Users.Firstname,Users.Lastname,Users.Email,Users.Online FROM Users',
                timeout: 40000 // 40s
            },
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    res.json(results);
                }
            }
        );
    });
});

module.exports = router;
