var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminUser = new Schema({
        email: {type:String, index:{unique:true}},
        password: String
    });
var adminUser = mongoose.model('adminUser', adminUser);
module.exports=adminUser;