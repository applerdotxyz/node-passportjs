var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});
module.exports = mongoose.model('User', userSchema);
