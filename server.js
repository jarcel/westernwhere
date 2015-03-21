// modules =================================================
var express        	= require('express'),
	app            	= express(),
	bodyParser     	= require('body-parser'),
	favicon 		= require('serve-favicon'),
	methodOverride 	= require('method-override'),
	chimp 			= require('./app/chimp');

// configuration ===========================================
// config files

var port = process.env.PORT || 8080; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================

app.post('/subscribe', chimp.subscribe);

app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
});

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app