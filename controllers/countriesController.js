/**
 * Created by stijnvanhulle on 26/11/15.
 */
var passport        = require('passport');
var pool            = require('../libs/mysql').getPool();
var md5             = require('md5');
var async           = require('async');

var commit          = require('./libs/commit');
var parser          = require('./libs/parser');

var getCountries=function(req,res){
    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: 'SELECT * FROM Countries',
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
};

var postCountry=function(req,res){
    var obj= parser(req.body);

    pool.getConnection(function(error, connection) {
        if (error) {

            res.json({success : false, error : error});
            return;
        }
        connection.query({
                sql: 'INSERT INTO Countries(Name,ShortName,EnglishName) VALUES(?,?,?) ',
                timeout: 40000 // 40s
            },
            [obj.Name, obj.ShortName, obj.EnglishName],
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


module.exports = (function(){

    //public api
    var publicAPI={
        getCountries:getCountries,
        postCountry:postCountry
    };

    return publicAPI;
})();