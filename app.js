
//import express as app from 'express';

const passport = require('passport');
const express = require('express');
const app = express();
//const ejs = require('ejs');
const session = require('express-session');
//const pass = require('./config/passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const configDB = require('./config/database.js');

mongoose.connect(configDB.url);


require('./config/passport')(passport);

app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({extended: false}));

var secret = 'SECRET';
app.use(session({ secret: secret,
                  saveUninitialized: true,
                resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.set('view engine', 'ejs');
require('./app/routes.js')(app, passport);

app.listen(8080);
console.log('Server started on port 8080');