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
router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
        var id= req.user[0].ID;
        pool.getConnection(function(error, connection) {
            connection.query({
                    sql: 'SELECT * FROM Autotype ',
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
router.post('/', function(req, res, next) {
    var autotype=JSON.parse(req.body.Autotype);

    if(req.isAuthenticated()){
        var id= req.user[0].ID;
        pool.getConnection(function(error, connection) {
            connection.query({
                    sql: 'INSERT INTO Autotype(Name,Brand) VALUES(?,?) ',
                    timeout: 40000 // 40s
                },
                [autotype.Name, autotype.Brand],
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
