var express = require('express');
var router = express.Router();
var path    = require("path");
var mongoose = require('mongoose');
var Page= require('../models/page.js');
var adminUser= require('../models/admin-users.js');
var bcrypt = require('bcrypt-nodejs');

function sessionCheck(request,response,next){
    if(request.session.adminuser) next();
        else response.redirect(301, '/admin/login');
}


/* GET users listing. */
router.get('/', sessionCheck, function(req, res, next) {
  	res.redirect(301, '/admin/dashboard');
});


router.get('/login', function(req, res, next) {
  res.render('admin/login');
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  adminUser.findOne({
    email: email
  }, function(err, data) {
    if (err | data === null) {
      return res.render('admin/login',{message: 'USER DONT EXISTS'});
    } else {
      var usr = data;
      if (email == usr.email && bcrypt.compareSync(password, usr.password)) {
        req.session.save(function(err) {
          req.session.adminuser = email;
          return res.redirect(301, '/admin/dashboard');
        });
      } else {
        return res.render('admin/login',{message: 'INVALID PASSWORD'});
      }
    }
  });
});

router.get('/logout', function(req, res, next) {
 	req.session.destroy(function() {
        return res.redirect(301, '/admin/login');
    });
});


/*DASHBOARD*/
router.get('/dashboard', sessionCheck, function(req, res, next) {
	var pagedata = {
		adminemail: req.session.adminuser
	};
		res.render('admin/dashboard',{pagedata: pagedata});
});
router.get('/pages', sessionCheck, function(req, res, next) {
	var pagedata = {
		adminemail: req.session.adminuser
	};
		res.render('admin/pages',{pagedata: pagedata});
});




module.exports = router;
