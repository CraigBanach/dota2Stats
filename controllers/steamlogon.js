var session = require("express-session");
var passport = require("passport");
var SteamStrategy = require("passport-steam").Strategy;
var express = require("express");
var router = express.Router();
var users = require("../models/users");
var BigNumber = require("bignumber.js");

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.

passport.use(new SteamStrategy({
    returnURL: "https://dota2stats-cragsify.c9users.io/auth/steam/return",
    realm: "https://dota2stats-cragsify.c9users.io",
    apiKey: process.env.DOTA_2_KEY
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical routerlication, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

router.use(session({
    secret: 'your secret',
    name: 'dota 2 stats',
    resave: true,
    saveUninitialized: true}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
router.use(passport.initialize());
router.use(passport.session());
router.use(express.static(__dirname + '/../../public'));

router.get('/', function(req, res){
  res.render('index', { user: req.user });
});

/**
 * Cannot work out how to make this function common to both 
 * steamlogon.js & matchHistory.js, so for this instance am
 * violating DRY principles in order to have workign code.
 */
 
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
};

router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this routerlication at /auth/steam/return
router.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    users.searchForUser(new BigNumber(req.user._json.steamid), req.user._json.personaname).then(
      null,
      function (data) {
        data.entryExists ? users.updateUser(new BigNumber(data.steamID_32), data.username, 1) : users.addNewUser(data.steamID_32, data.username, 1);
      }
    ).then(
      res.redirect('https://dota2stats-cragsify.c9users.io/user/mystats')
    );
  });

module.exports = router;
