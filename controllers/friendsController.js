/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql');
var md5             = require('md5');
var async           = require('async');

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');

var getFriends=function(req,res){
    var user_ID= req.user[0].ID;
    var sql='SELECT Friends.Users_ID as Users1_ID,' +
        'Users1.Firstname as Users1_Firstname,Users1.Lastname as Users1_Lastname,Users1.Email as Users1_Email,Users1.Cellphone as Users1_Cellphone,Users1.Bobs_ID as Users1_Bobs_ID,Users1.FacebookID as Users1_FacebookID,Users1.Added as Users1_Added,Users1.Online as Users1_Online,' +
        'Friends.Friends_ID as Users2_ID, Friends.Accepted, Friends.Added, ' +
        'Users2.Firstname as Users2_Firstname,Users2.Lastname as Users2_Lastname,Users2.Email as Users2_Email,Users2.Cellphone as Users2_Cellphone,Users2.Bobs_ID as Users2_Bobs_ID,Users2.FacebookID as Users2_FacebookID,Users2.Added as Users2_Added,Users2.Online as Users2_Online ' +
        'FROM Friends ' +
        'INNER JOIN Users as Users1 ON Friends.Users_ID=Users1.ID ' +
        'INNER JOIN Users as Users2 ON Friends.Friends_ID=Users2.ID ' +
        'WHERE Users1.ID=? ';

    pool.getConnection(function(error, connection) {
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            [user_ID],
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
};


module.exports = (function(){

    //public api
    var publicAPI={
        getFriends:getFriends

    };

    return publicAPI;
})();