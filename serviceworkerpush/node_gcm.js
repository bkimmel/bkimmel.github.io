var https = require('https');
var fs = require('fs');

var authkey = fs.readFileSync('C:\\node\\gcmauth.txt', 'utf-8');

//console.log(authkey);

function sendToIDs(regids, cb) {
	if( !Array.prototype.isPrototypeOf([regids]) ) {
		return false;
	}
	
	var _transmit = JSON.stringify({
		registration_ids: regids
	});
	
	var post_options = {
	  host: 'android.googleapis.com', 
      path: '/gcm/send', 
      method: 'POST',
	  port: 443,	  
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
		  'Data-Type': 'json',
		  'Authorization': authkey,
          'Content-Length': Buffer.byteLength(_transmit, 'utf8')
      } 
	};
	

	var post_req = https.request(post_options, function(res) {
		var chunkCollector = "";
		res.setEncoding('utf8'); 
		res.on('data', function (chunk) {
		  //console.log('data:' + chunk);
		  chunkCollector = chunkCollector + chunk;
		});
		res.on('end', function () {
			//jsonify response
			try {
				var resJSON = JSON.parse(chunkCollector);
			}
			catch(e) {
				cb(new Error('JSON Response Could Not Be Parsed'), e);
				return;
			}
			cb(undefined, resJSON);
		});
		res.on('error', function () {
			console.log('error:');
			cb(new Error('Connection Problem to: ' + post_options.host));
		});
	});
	
	post_req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
		cb('problem with request: ' + e.message, null);
	});

	// post the data 
	post_req.write(_transmit); 
	post_req.end();
}

sendToIDs(['APA91bGLhTPNprOR7ok3HTqoqeklVxO-4FRlLRv667tiM0sgwzTDH7LqmIVd6WxQUgoOvW5UrXfQfuqiQf0udZny4Zy8XKLM1XMlaURywqkhfxrskkbn2Cn6Pz3VB5BYFoPPQoHM0pE1mOye6C1QbpyUGWDXIt5SmGFPXHobaoKj_anDPZrumF8'],
  console.log(JSON.stringify(resp));
});
