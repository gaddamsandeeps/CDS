/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    http = require('http'),    
    path = require('path'),
    d = require('domain').create();
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load Configurations
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//private modules
var cdsConfig = require('cds-config');
var log = require('cds-logger').logger("APP");

var auth = require('./config/middlewares/authorization');
var passport = require('./config/passport');

var app = express();
app.set("root", path.join(__dirname, ''));

//Initialize Express
require('./config/express')(app, passport);

//Initialize Routes
require('./config/routes').init(app, passport, auth);

d.on('error', function(err) {
	log.error("Caught with some error : " + err)
    console.log("Caught with some error : " + err);
})

//Start the app by listening on <port>
var port = cdsConfig.port;
app.set('port', port);




d.run(function() {
    http.createServer(app).listen(app.get('port'), function() {
    	log.debug(cdsConfig.appname + " " + cdsConfig.app.description);
    	log.debug('Express server listening on port ' + app.get('port'));

        console.log(cdsConfig.appname + " " + cdsConfig.app.description);
        console.log('Express server listening on port ' + app.get('port'));
    });
});

process.env.useMinifiedAssets = false;

//expose app
module.exports = app;
