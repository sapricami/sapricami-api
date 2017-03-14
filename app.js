var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var api = require('./routes/api');
var index = require('./routes/index');
var admin = require('./routes/admin');

var app = express();

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/angcms');
var server_options = {server: { socketOptions: { autoReconnect: true, socketTimeoutMS:120000, connectTimeoutMS:120000, keepAlive: 60 }}};
mongoose.connect('mongodb://root:2582096@ds054308.mlab.com:54308/sapricami_ang_cms', server_options,  function(err) {if(err){console.log(' *DB Connection Error '+err+' *')}else{console.log(' *DB Connected*')}});
var db = mongoose.connection;

app.set('env', 'development');// optional

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*session*/
var sess = {
  secret: 'keyboard cat',
  cookie: {}
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));

//app.use(cookieParser());
//app.use(express.cookieParser('secret'));
app.use('/assets',express.static('assets'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/admin', admin);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
