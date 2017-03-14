var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Page = new Schema({
	    title: String,
	    seo_title: String,
	    seo_description: String,
	    seo_keywords: String,
	    url: {type:String, index:{unique:true}},
	    content: String    
	});
var Page = mongoose.model('Page', Page);
module.exports=Page;