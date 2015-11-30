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
 * @api {get} /api/cities/ GET cities
 * @apiVersion 0.0.1
 * @apiName All
 * @apiGroup Cities
 * @apiDescription Get all cities
 *
 * @apiSuccess {Integer} ID Table: Cities
 * @apiSuccess {String} Name Table: Cities
 * @apiSuccess {String} Postcode Table: Cities
 * @apiSuccess {String} Countries_ID Table: Countries

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
                sql: 'SELECT * FROM Cities',
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
