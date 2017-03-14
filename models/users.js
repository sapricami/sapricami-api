var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminUser = new Schema({
        email: {type:String, index:{unique:true}},
        password: String,
        firstname: String,
        lastname: String,
        dateofbirth: String,
        about: String,
        photofile: String,
    });
var adminUser = mongoose.model('users', adminUser);
module.exports=adminUser;