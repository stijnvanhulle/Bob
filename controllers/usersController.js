/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql');
var md5             = require('md5');
var async           = require('async');

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');

var getUsers=function(req,res){
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT Users.ID as Users_ID, Firstname as Users_Firstname, Users.Lastname as Users_Lastname, Users.Email as Users_Email, Users.Cellphone as Users_Cellphone, Users.Online as Users_Online,' +
                '(Bobs_ID IS NOT NULL) AS IsBob, ' +
                'Bobs.ID as Bobs_ID, Bobs.BobsType_ID as Bobs_BobsType_ID, Bobs.LicensePlate as Bobs_LicensePlate, Bobs.Added as Bobs_Added, Bobs.Active as Bobs_Active FROM Users ' +
                'LEFT JOIN Bobs ON Users.Bobs_ID=Bobs.ID',
                timeout: 40000 // 40s
            },
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    var data=[];
                    for(var i=0;i<results.length;i++){
                        var user;
                        if(results[i].Users_ID==null){
                            user=null;
                        }else{
                            user={
                                ID: results[i].Users_ID,
                                Firstname: results[i].Users_Firstname,
                                Lastname: results[i].Users_Lastname,
                                Email: results[i].Users_Email,
                                Cellphone: results[i].Users_Cellphone,
                                IsBob: results[i].IsBob
                            };
                        }
                        var item={
                            User:user,
                            Bob:{
                                ID: results[i].Bobs_ID,
                                BobsType_ID: results[i].Bobs_BobsType_ID,
                                LicensePlate: results[i].Bobs_LicensePlate,
                                Added: results[i].Bobs_Added,
                                Active: results[i].Bobs_Active,
                                PricePerKm:results[i].Bobs_PricePerKm,
                                Autotype_ID:results[i].Bobs_Autotype_ID
                            },
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

var getUsersOnline=function(req,res){
    pool.getConnection(function(error, connection) {
        connection.query({
                sql: 'SELECT Users.ID as Users_ID, Firstname as Users_Firstname, Users.Lastname as Users_Lastname, Users.Email as Users_Email, Users.Cellphone as Users_Cellphone, Users.Online as Users_Online,' +
                '(Bobs_ID IS NOT NULL) AS IsBob, ' +
                'Bobs.ID as Bobs_ID, Bobs.BobsType_ID as Bobs_BobsType_ID, Bobs.LicensePlate as Bobs_LicensePlate, Bobs.Added as Bobs_Added, Bobs.Active as Bobs_Active FROM Users ' +
                'LEFT JOIN Bobs ON Users.Bobs_ID=Bobs.ID ' +
                'WHERE Users.Online=true',
                timeout: 40000 // 40s
            },
            function (error, results, fields) {
                connection.release();
                if (error){
                    res.json({success:false});
                } else{
                    var data=[];
                    for(var i=0;i<results.length;i++){
                        var user;
                        if(results[i].Users_ID==null){
                            user=null;
                        }else{
                            user={
                                ID: results[i].Users_ID,
                                Firstname: results[i].Users_Firstname,
                                Lastname: results[i].Users_Lastname,
                                Email: results[i].Users_Email,
                                Cellphone: results[i].Users_Cellphone,
                                IsBob: results[i].IsBob
                            };
                        }
                        var item={
                            User:user,
                            Bob:{
                                ID: results[i].Bobs_ID,
                                BobsType_ID: results[i].Bobs_BobsType_ID,
                                LicensePlate: results[i].Bobs_LicensePlate,
                                Added: results[i].Bobs_Added,
                                Active: results[i].Bobs_Active,
                                PricePerKm:results[i].Bobs_PricePerKm,
                                Autotype_ID:results[i].Bobs_Autotype_ID
                            },
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



//custom




module.exports = (function(){

    //public api
    var publicAPI={
        getUsers:getUsers,
        getUsersOnline:getUsersOnline

    };

    return publicAPI;
})();