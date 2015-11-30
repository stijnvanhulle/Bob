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
 * @api {get} /api/friends/ GET friends
 * @apiVersion 0.0.1
 * @apiName All
 * @apiGroup Friends
 * @apiDescription Get all friends form current user
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
    var query='';
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT Friends.Users_ID as Users1_ID,' +
                'Users1.Firstname as Users1_Firstname,Users1.Lastname as Users1_Lastname,Users1.Email as Users1_Email,Users1.Cellphone as Users1_Cellphone,Users1.Bobs_ID as Users1_Bobs_ID,Users1.FacebookID as Users1_FacebookID,Users1.Added as Users1_Added,Users1.Online as Users1_Online,' +
                'Friends.Friends_ID as Users2_ID, Friends.Accepted, Friends.Added' +
                'Users2.Firstname as Users2_Firstname,Users2.Lastname as Users2_Lastname,Users2.Email as Users2_Email,Users2.Cellphone as Users2_Cellphone,Users2.Bobs_ID as Users2_Bobs_ID,Users2.FacebookID as Users2_FacebookID,Users2.Added as Users2_Added,Users2.Online as Users2_Online ' +
                'FROM Friends ' +
                'INNER JOIN Users as Users1 ON Friends.Users_ID=Users1.ID ' +
                'INNER JOIN Users as Users2 ON Friends.Friends_ID=Users2.ID ' +
                'WHERE Users1.ID=? AND ' + query,
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

module.exports = router;
