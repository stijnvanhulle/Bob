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
    var sql='SELECT Friends.Users_ID as User1_ID, ' +
        'User1.Firstname as User1_Firstname,User1.Lastname as User1_Lastname,User1.Email as User1_Email,User1.Cellphone as User1_Cellphone,User1.Bobs_ID as User1_Bobs_ID,User1.FacebookID as User1_FacebookID,User1.Added as User1_Added,User1.Online as User1_Online, ' +
        'Friends.Friends_ID as User2_ID, Friends.Accepted, Friends.Added, ' +
        'User2.Firstname as User2_Firstname,User2.Lastname as User2_Lastname,User2.Email as User2_Email,User2.Cellphone as User2_Cellphone,User2.Bobs_ID as User2_Bobs_ID,User2.FacebookID as User2_FacebookID,User2.Added as User2_Added,User2.Online as User2_Online ' +
        'FROM Friends ' +
        'INNER JOIN Users as User1 ON Friends.Users_ID=User1.ID ' +
        'INNER JOIN Users as User2 ON Friends.Friends_ID=User2.ID ' +
        'WHERE User1.ID=? ';

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
                        var data=[];
                        for(var i=0;i<results.length;i++){
                            var item={
                                User1:{
                                    ID: results[i].User1_ID,
                                    Firstname: results[i].User1_Firstname,
                                    Lastname: results[i].User1_Lastname,
                                    Email: results[i].User1_Email,
                                    Cellphone: results[i].User1_Cellphone,
                                    Bobs_ID: results[i].User1_Bobs_ID,
                                    FacebookID: results[i].User1_FacebookID,
                                    Added: results[i].User1_Added,
                                    Online: results[i].User1_Online
                                },
                                User2:{
                                    ID: results[i].User2_ID,
                                    Firstname: results[i].User2_Firstname,
                                    Lastname: results[i].User2_Lastname,
                                    Email: results[i].User2_Email,
                                    Cellphone: results[i].User2_Cellphone,
                                    Bobs_ID: results[i].User2_Bobs_ID,
                                    FacebookID: results[i].User2_FacebookID,
                                    Added: results[i].User2_Added,
                                    Online: results[i].User2_Online
                                },
                                Added: results[i].Added,
                                Accepted: results[i].Accepted
                            };
                            data.push(item);
                        }
                        res.json(data);
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