'use strict';

var express  = require('express'),
		app      = express(),
		morgan = require('morgan'),
		bodyParser = require('body-parser'),
		methodOverride = require('method-override'),
		httpProxy = require('http-proxy'),
		path = require('path'),
		url = require('url'); 

var apiProxy = undefined;

var target = '';

var proxyRouter = express.Router();
/*
* Expects that the user sends an objectlike this:
	{
		url: 'https://cc.vlabs.test'
	}
*/
proxyRouter.post('/registerUrl', function(req, res) {
	//console.log(req);
	if (!req.body || !req.body.url) return res.sendStatus(400);
	target = req.body.url;
	let hostname = url.parse(target).hostname;
	console.log('Recondifure host to : ' + hostname);
	apiProxy = httpProxy.createProxyServer({
    	secure: false,
    	headers: {
      		host: hostname
    	}
});
  
  apiProxy.on('proxyReq', function(proxyReq, req, res, options) {
	  console.log('---------- proxyReq -------------');
	  console.log(req.headers);
	  console.log(req.method);
	  console.log(req.url);
	  console.log(req.body);
	  if(req.body) {
	    let bodyData = JSON.stringify(req.body);
	    proxyReq.setHeader('Content-Type', 'application/json');
	    proxyReq.setHeader('Content-Lenght', Buffer.byteLength(bodyData));
	    proxyReq.write(bodyData);
	  }
  });

  apiProxy.on('proxyRes', function(proxyRes, req, res, options) {
  	console.log('---------- proxyRes -------------');
  	console.log(JSON.stringify(proxyRes.headers, true, 2));
  	console.log(JSON.stringify(proxyRes.url, true, 2));
  	console.log(JSON.stringify(proxyRes.body, true, 2));
  });
  
  
  apiProxy.on('error', function (err, req, res) {
  	console.log('error:');
  	console.log(err);
  });
	return res.sendStatus(200);
});

app.use(morgan('dev')); 
app.use(express.static(__dirname + '/app'));   
app.use(bodyParser.urlencoded({'extended':'true'}));           
app.use(bodyParser.json());                                   
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());   
//app.use('/bower_components',  express.static( path.join(__dirname, '/bower_components')));
app.use('/node_modules',  express.static( path.join(__dirname, '/node_modules')));
app.use('/proxy', proxyRouter);
app.all('/api/*', function(req, res) {

	if ( target != '') {
  	apiProxy.web(req, res, { target: target});
  } else {
  	return res.sendStatus(400);
  }
});                                       

app.listen(8888);
console.log("App listening on port 8888");
