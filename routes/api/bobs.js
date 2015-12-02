var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var jsonParser      = bodyParser.json({ type: 'application/json' } );
var controller      = require('../../controllers/bobsController');
var access          = require('../../controllers/authController').access;

//users
router.get('/', access,controller.getBobs);

module.exports = router;
