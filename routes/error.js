var express = require('express');
var passport= require('passport');
var app     = express();
var router = express.Router();


router.get('/', function(req, res){
    res.render('views/error');
});

module.exports = router;
