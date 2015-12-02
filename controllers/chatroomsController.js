/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql');
var md5             = require('md5');
var async           = require('async');

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');

var getChatrooms=function(req,res){
    var user_ID= req.user[0].ID;
    var sql="";

    if(user_ID!=null){
        sql='SELECT ID,Bobs_ID, Added FROM Bob.ChatRooms ' +
            'WHERE Users_ID=? AND Active=1';
    }else{
        res.json({success:false});
    }


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

var postChatroom=function(req,res){
    var obj= parser(req.body);


    var user_ID= req.user[0].ID;
    var sql="";

    if(user_ID!=null){
        sql='INSERT INTO ChatRooms(Users_ID,Bobs_ID) ' +
            'VALUES(?,?)';
    }else{
        res.json({success:false});
    }

    pool.getConnection(function(error, connection) {
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            [user_ID,obj.Bobs_ID],
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
};

var getChatroomByID=function(req,res){
    var id=req.params.id;
    var sql="";

    if(id!=null){
        sql='SELECT ChatComments.ID,ChatComments.ChatRooms_ID,ChatComments.Comment,ChatComments.Added, ChatComments.Users_ID, Users.Firstname as Users_Firstname, Users.Lastname as Users_Lastname, Users.Email as Users_Email, Users.Cellphone as Users_Cellphone FROM ChatComments '+
            'INNER JOIN Users ON Users.ID= ChatComments.Users_ID ' +
            'WHERE ChatComments.ChatRooms_ID=? ' +
            'ORDER BY ChatComments.Added DESC';
    }else{
        res.json({success:false});
    }

    pool.getConnection(function(error, connection) {
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            [id],
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    res.json(results[0]);
                }
            }
        );
    });
};

module.exports = (function(){

    //public api
    var publicAPI={
        getChatrooms:getChatrooms,
        postChatroom:postChatroom,
        getChatroomByID:getChatroomByID
    };

    return publicAPI;
})();