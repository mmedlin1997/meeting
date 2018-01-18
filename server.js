var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); // ODM library for mongodb
var app = express();

// Connect to database
mongoose.connect('mongodb://localhost:27017/meetingdb', {useMongoClient: true});
mongoose.Promise = global.Promise;

// Verify DB connection
var db = mongoose.connection;
db.on('connected', function(){
	console.log('MongoDB connected on port ' + 27017)
	
	// Listen to server
  app.set('port', process.env.PORT || 7001)
  app.listen(app.get('port'), function(){
    console.log('MeetingApp listening on port ' + app.get('port'))
  })
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // delivers index.html to browser

// Use backend router (api)
var api = require('./routes/api.js');
app.use('/', api);

module.exports = app;