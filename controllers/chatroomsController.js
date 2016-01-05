/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql').getPool();
var md5             = require('md5');
var async           = require('async');

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');

var getChatrooms=function(req,res){
    var user_ID= req.user[0].ID;
    var sql="";

    if(user_ID!=null){
        sql='SELECT * FROM Bob.ChatRooms ' +
            'WHERE Users_ID=? AND Active=1';
    }else{
        res.json({success:false});
    }


    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error.toString()});
            return;
        }

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
        if (error) {

            res.json({success : false, error : error.toString()});
            return;
        }
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
                    res.json({success:true,newID:results.insertId});

                }
            }
        );
    });
};

var postChatComment=function(req,res){
    var obj= parser(req.body);

    var chatRooms_ID =parser(obj.ChatRooms_ID);
    var comment= parser(obj.Comment);
    //var users_ID= parser(obj.Users_ID);

    var user_ID= req.user[0].ID;
    var sql="";

    if(user_ID!=null){
        sql='INSERT INTO ChatComments(ChatRooms_ID,Comment, Users_ID) ' +
            'VALUES(?,?,?)';
    }else{
        res.json({success:false});
    }

    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error.toString()});
            return;
        }
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            [chatRooms_ID,comment,user_ID],
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
        sql='SELECT ChatRooms.ID as ChatRooms_ID, ChatRooms.Users_ID as ChatRooms_Users_ID,ChatRooms.Bobs_ID as ChatRooms_Bobs_ID, ChatRooms.Added as ChatRooms_Added, ChatRooms.Active as ChatRooms_Active, ChatComments.ID,ChatComments.Comment as Comment,ChatComments.Added, ChatComments.Users_ID as FromUser_ID FROM ChatComments ' +
            'INNER JOIN Users ON Users.ID= ChatComments.Users_ID ' +
            'RIGHT JOIN ChatRooms ON ChatRooms.ID=ChatComments.ChatRooms_ID ' +
            'WHERE ChatRooms.ID=? ' +
            'ORDER BY ChatComments.Added ASC';
    }else{
        res.json({success:false});
    }

    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: sql,
                timeout: 40000 // 40s
            },
            [id],
            function (error, results, fields) {
                connection.release();
                if (error){
                    console.log(error);
                    res.json({success:false});
                } else{
                    if(results[0]!=null){
                        var data={
                            ChatRoom:{
                                ID: results[0].ChatRooms_ID,
                                Users_ID: results[0].ChatRooms_Users_ID,
                                Bobs_ID: results[0].ChatRooms_Bobs_ID,
                                Added: results[0].ChatRooms_Added,
                                Active:  results[0].ChatRooms_Active
                            }
                        };
                        var chatComments=[];
                        for(var i=0;i<results.length;i++){
                            var item= {
                                ID: results[i].ID,
                                Comment: results[i].Comment,
                                Added: results[i].Added,
                                FromUser_ID: results[i].FromUser_ID

                            };
                            chatComments.push(item);
                        }
                        if(chatComments[0].ID==null){
                            data.ChatComments=null;
                        }else{
                            data.ChatComments=chatComments;
                        }

                        res.json(data);
                    }else{
                        res.json({success:false});
                    }

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
        getChatroomByID:getChatroomByID,
        postChatComment:postChatComment
    };

    return publicAPI;
})();