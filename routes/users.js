var express = require('express');
var router = express.Router();

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');




router.get('/', function(req, res, next) {
  res.render('user.jade');
});
router.get('/google', function(req, res, next){
	res.render('ejemploAPI.jade');
});

module.exports = router;