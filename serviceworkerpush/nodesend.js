//url
let endpoint = '';
const https = require('https');

let _transmit = 'hello world';

var post_options = {
  host: 'android.googleapis.com', 
  path: '', 
  method: 'POST',
  port: 443,	  
  headers: {
	  'Content-Type': 'application/json; charset=utf-8',
	  'Data-Type': 'json',
	  'Content-Length': Buffer.byteLength(_transmit, 'utf8')
  } 
};

var post_req = https.request(post_options, function(res) {
	var chunkCollector = "";
	res.setEncoding('utf8'); 
	res.on('data', function (chunk) {
	  console.log('data:' + chunk);
	  chunkCollector = chunkCollector + chunk;
	});
	res.on('end', function () {
		console.log('end::');
		console.log(chunkCollector);
	});
	res.on('error', function () {
		console.log('error:');
	});
});

post_req.on('error', function(e) {
	console.log('problem with request: ' + e.message);
});

// post the data 
post_req.write(_transmit); 
post_req.end();
