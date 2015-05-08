console.log('Collector started...');
console.log('in: ' + process.cwd());
console.log('with: ' + process.argv.slice(2));

var connect = require('connect');
var _ = require('lodash');
var fs = require('fs');
var events = require('events');
var http = require('http');
var https = require('https');
var httpevents = new events.EventEmitter();
var urlobj = require('url').parse;

var pagehtml = fs.readFileSync('page.html');

function storePushSubscription(pushsubdata, cb_storePushSubscription) {
	var stringdata = Object.prototype.isPrototypeOf(pushsubdata) ? JSON.stringify(pushsubdata) : pushsubdata.toString();
	stringdata = stringdata.replace('###','');
	fs.appendFile('ids.txt', '###' + stringdata, function(err, res){
		cb_storePushSubscription(err, res);
	});
}

function getNextPushMessage(cb_getNextPushMessage) {
	fs.readFile('message.json', function(err, res){
		if(err) {
			cb_getNextPushMessage(err);
			return;
		}
		cb_getNextPushMessage( null, res );
	});
}	

httpevents.on('request', function(req, res){
	var url = urlobj(req.url, true);
	if(url.pathname == '/') {
		res.end(pagehtml);
	}
	else if(url.pathname.match(/^\/submitpush/i)) {
		//res.end('Received...' + JSON.stringify(url));
		storePushSubscription( (url.query || {}), function(err){
			if(err) {
				res.statusCode = 404;
				res.end('Error...');
			}
			else {
				res.end('Success...');
			}
		});
	}
	else if(url.pathname.match(/^\/getmessage/i)) {
		getNextPushMessage(function(err, jsontxt){
			if(err) {
				res.statusCode = 404;
				res.end('{"error": "reading message"}');
				return;
			}
			res.writeHead(200, {
				'Content-Length': jsontxt.length,
				'Content-Type': 'text/json'
			});
			res.end(jsontxt);
		});
	}
	else if(url.pathname.match(/^\/worker/i)) {
		fs.readFile('workerb.js', {encoding: 'utf-8'}, function(err, jsfile){
			if(err) {
				res.statusCode = 404;
				res.end('{"error": "reading worker"}');
				return;
			}
			res.writeHead(200, {
				'Content-Length': Buffer.byteLength(jsfile.toString(), 'utf-8'),
				'Content-Type': 'text/javascript'
			});
			res.end(jsfile);
			return;
		});
	}
	else {
		res.statusCode = 404;
		res.end('Error...');
	}
});

var allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Cache-Control,X-Requested-With');

	// intercept OPTIONS method
    if ('OPTIONS' == req.method) {
	  console.log('OPTIONS request');
	  res.writeHead(200);
	  res.end();
    }
    else {
      next();
    }
}

var server = connect()
 .use(allowCrossDomain)
 .use(function(req, res, next) {
	httpevents.emit("request", req, res);
 });

 var options = {
    key:    fs.readFileSync('server.key'),
    cert:   fs.readFileSync('server.crt'),
	ca:     fs.readFileSync('server.csr')
};
 
//var httpserver = http.createServer(server);
var httpserver = https.createServer(options, server);
 
httpserver.listen(443);
console.log('Listening on port 443.');
