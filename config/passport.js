var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var habitat = require('habitat');
//var User       = require('../models/users');

habitat.load('.env.dev');



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      //User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //  return done(err, user);
      //});
      return done(null, profile);
  }
));

//Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/fb/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate(..., function(err, user) {
      //if (err) { return done(err); }

    //});
    done(null, user);
  }
));


//Twitter Strategy
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://www.appler.xyz/auth/tw/callback"
  },
  function(token, tokenSecret, profile, done) {
    //User.findOrCreate(..., function(err, user) {
      //if (err) { return done(err); }
      //done(null, user);
    //});
    done(null, user);
  }
));
