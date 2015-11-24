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
router.get('/autotypes', function(req, res, next) {
    if(req.isAuthenticated()){
        var id= req.user[0].ID;
        pool.getConnection(function(error, connection) {
            connection.query({
                    sql: 'SELECT * FROM Statuses ',
                    timeout: 40000 // 40s
                },
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
    }else{
        res.json({success:false, error:'Not authenticated'});
    }

});

/**
 * @api {post} /api/statuses/ POST statuses
 * @apiVersion 0.0.1
 * @apiName /
 * @apiGroup Autotype
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
router.post('/', function(req, res, next) {
    var status=JSON.parse(req.body.Status);

    if(req.isAuthenticated()){
        var id= req.user[0].ID;
        pool.getConnection(function(error, connection) {
            connection.query({
                    sql: 'INSERT INTO Statuses(Name) VALUES(?) ',
                    timeout: 40000 // 40s
                },
                [status.Name],
                function (error, results, fields) {
                    //if (error) throw error;
                    if (error){
                        res.json({success:false});
                    } else{
                        res.json({success:true});
                    }
                }
            );
        });
    }else{
        res.json({success:false, error:'Not authenticated'});
    }

});

module.exports = router;
