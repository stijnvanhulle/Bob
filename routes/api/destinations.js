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
 * @api {get} /api/destinations/ GET destinations
 * @apiVersion 0.0.1
 * @apiName all
 * @apiGroup Destinations
 * @apiDescription Get all destinations
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
router.get('/', function(req, res, next) {
    var id= req.user[0].ID;
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: "SELECT Users_Destinations.Users_ID,Users_Destinations.Destinations_ID,Users_Destinations.Default,Users_Destinations.Added,Users_Destinations.Name, Cities_ID, Location FROM Users_Destinations INNER JOIN Destinations " +
                     "ON Destinations.ID=Users_Destinations.Destinations_ID " +
                     "WHERE Users_ID=?",
                timeout: 40000 // 40s
            },
            [id],
            function (error, results, fields) {
                //if (error) throw error;
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
 * @api {get} /api/destinations/default GET default destination
 * @apiVersion 0.0.1
 * @apiName Default
 * @apiGroup Destinations
 * @apiDescription Get home
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
router.get('/default', function(req, res, next) {
    var id= req.user[0].ID;
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: "SELECT Users_Destinations.Users_ID,Users_Destinations.Destinations_ID,Users_Destinations.Default,Users_Destinations.Added,Users_Destinations.Name, Cities_ID, Location FROM Users_Destinations INNER JOIN Destinations " +
                "ON Destinations.ID=Users_Destinations.Destinations_ID " +
                "WHERE Users_ID=? AND Default=1",
                timeout: 40000 // 40s
            },
            [id],
            function (error, results, fields) {
                //if (error) throw error;
                if (error){
                    res.json({success:false});
                } else{
                    res.json(results[0]);
                }
            }
        );
    });
});

module.exports = router;
