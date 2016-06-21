var express = require('express');
var router = express.Router();

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config');

/*
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: config.google.client.id,
  clientSecret: config.google.client.secret,
  callbackURL: config.google.client.callbackUrl
},
function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function() {
    console.log(profile);

    // To keep the example simple, the user's Google profile is returned to
    // represent the logged-in user.  In a typical routerlication, you would want
    // to associate the Google account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}
));
// configure Express
router.use(morgan(':method :url :response-time'));
router.use(cookieParser());
router.set('json spaces', 2);
// parse routerlication/x-www-form-urlencoded
router.use(bodyParser.urlencoded({
  extended: false
}));
// parse routerlication/json
router.use(bodyParser.json());
router.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
router.use(passport.initialize());
router.use(passport.session());

router.get('/', function(req, res) {
  if (!req.user) {
    res.redirect('/auth/google');
  }
  else {
    res.json(req.user);
  }
});

// GET /auth/google
//   Use passport.authenticate() as router middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this routerlication at /auth/google/callback
router.get('/auth/google',
passport.authenticate('google', {
  scope: [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
  ]
}),
function(req, res) {
  // The request will be redirected to Google for authentication, so this
  // function will not be called.
});

// GET /auth/google/callback
//   Use passport.authenticate() as router middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary router function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback',
passport.authenticate('google', {
  failureRedirect: '/login'
}),
function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.listen(process.env.PORT || 3000);

// Simple router middleware to ensure user is authenticated.
//   Use this router middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
*/
//Antiguo mas abajo



router.get('/', function(req, res, next) {
  res.render('user.jade');
});
router.get('/google', function(req, res, next){
	res.render('ejemploAPI.jade');
});

module.exports = router;