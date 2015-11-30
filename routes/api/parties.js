var express         = require('express');
var mysql           = require('mysql');
var path            = require("path");
var passport        = require('passport');
var geolib          = require('geolib');
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
 * @apiSuccess {Integer} ID Table: Parties
 * @apiSuccess {String} Name Table: Parties
 * @apiSuccess {String} Organisator Table: Parties
 * @apiSuccess {Integer} Amount Table: Parties
 * @apiSuccess {String} FacebookEventID Table: Parties
 * @apiSuccess {Integer} Cities_ID Table: Parties
 * @apiSuccess {Timestamp} Added Table: Parties
 * @apiSuccess {String} Location Table: Parties, {latitude:x,longitude:y}
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
 * @api {post} /api/parties/area POST parties in the area
 * @apiVersion 0.0.1
 * @apiName allinarea
 * @apiGroup Parties
 * @apiDescription Get all parties in the area
 *
 * @apiParam {String} Location Example: {latitude:x,longitude:y}
 * @apiParam {Integer} Distance Example: Max Distance
 *
 *
 * @apiSuccess {Integer} ID Table: Parties
 * @apiSuccess {String} Name Table: Parties
 * @apiSuccess {String} Organisator Table: Parties
 * @apiSuccess {Integer} Amount Table: Parties
 * @apiSuccess {String} FacebookEventID Table: Parties
 * @apiSuccess {Integer} Cities_ID Table: Parties
 * @apiSuccess {Timestamp} Added Table: Parties
 * @apiSuccess {String} Location Table: Parties, {latitude:x,longitude:y}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false
 *     }
 */
router.post('/area',jsonParser, function(req, res, next) {



    var location=JSON.parse(req.body.Location);
    //var location=req.body.Location;
    //var distance=JSON.parse(req.body.Distance);
    var distance=req.body.Distance;

    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT * FROM Parties',
                timeout: 40000 // 40s
            },
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    var items=[];
                    for(var i=0;i<results.length;i++){
                        var distanceInMeters=geolib.getDistance(
                            location,
                            JSON.parse(results[0].Location)
                        );

                        console.log(distanceInMeters);
                        if(distanceInMeters<=distance){
                            items.push(results[i]);
                        }
                    }

                    res.json(items);
                }
            }
        );
    });
});

/**
 * @api {post} /api/parties/ POST party
 * @apiVersion 0.0.1
 * @apiName post
 * @apiGroup Parties
 * @apiDescription New party
 *
 * @apiParam {String} Name Table: Parties
 * @apiParam {String} Organisator Table: Parties
 * @apiParam {Integer} Amount Table: Parties
 * @apiParam {String} FacebookEventID Table: Parties
 * @apiParam {Integer} Cities_ID Table: Cities
 * @apiParam {Integer} Location Table: Cities, {latitude:x,longitude:y}
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
                    sql: 'INSERT INTO Parties(Name,Organisator, Amount, FacebookEventID, Cities_ID, Location) ' +
                    'VALUES(?,?,?,?,?) ',
                    timeout: 40000 // 40s
                },
                [party.Name, party.Organisator, party.Amount, party.FacebookEventID, party.Cities_ID, party.Location],
                function (error, results, fields) {
                    connection.release();
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
