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
 * @api {get} /api/parties/ GET parties
 * @apiVersion 0.0.1
 * @apiName all
 * @apiGroup Parties
 * @apiDescription Get all parties
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
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT * FROM Parties',
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
});

/**
 * @api {post} /api/parties/ POST party
 * @apiVersion 0.0.1
 * @apiName all
 * @apiGroup Parties
 * @apiDescription New party
 *
 * @apiParam {String} Name Table: Parties
 * @apiParam {String} Organisator Table: Parties
 * @apiParam {Integer} Amount Table: Parties
 * @apiParam {String} FacebookEventID Table: Parties
 * @apiParam {Integer} Cities_ID Table: Cities
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
    var party=JSON.parse(req.body.Party);

    if(req.isAuthenticated()){
        var id= req.user[0].ID;
        pool.getConnection(function(error, connection) {
            connection.query({
                    sql: 'INSERT INTO Parties(Name,Organisator, Amount,FacebookEventID, Cities_ID) ' +
                    'VALUES(?,?,?,?,?) ',
                    timeout: 40000 // 40s
                },
                [party.Name, party.Organisator, party.Amount, party.FacebookEventID, party.Cities_ID],
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
