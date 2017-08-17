
//import express as app from 'express';

const passport = require('passport');
const express = require('express');
const app = express();
const ejs = require('ejs');
const session = require('express-session');
const pass = require('./config/passport');


var secret = 'SECRET';
app.use(session({ secret: secret }));
app.use(passport.initialize());
app.use(passport.session());





app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('login');
});

//Google Authentication
app.get('/auth/google',
  passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']  }));

 //GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('Authentication successful');
    res.redirect('/success');
  });
app.get('/success', function(req, res){
  //req.session.passport.user;
  //data = JSON.stringify(req.session.passport.user);
  res.render('success', {profile:req.session.passport.user});
  //res.render('success')

  console.log('Authentication successful');
});


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/success',
                                      failureRedirect: '/login' }));

  app.get('/success', function(req, res){
  res.render('success');
});

///Twitter Authentication
// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/success',
                                     failureRedirect: '/login' }));

app.listen(8080);
console.log('Server started on port 8080');
