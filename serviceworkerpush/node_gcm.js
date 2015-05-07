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


sendToIDs(['APA91bGOW9R6hjQNxWPTfOWZXda2IgT0jok5cdlV12uwp5WwL1hRaGRDq3hKZFUkAO8YjhdGnPX9RMPawghs0sJ7CVs8Ji0jt7aCc5jm79fEvSnESIuPm_MFahgdWhWxmaOq6SWYjwsaJvYPXuQ8vI4wIqn_803quv09cpsrp7kBRL3t5NXZoFM','APA91bHoOXgcYEVYPTGLoZakPqt0P1JCX6N82ie59spEdtgUXlCrijraigySK-rGr-GxUB4jG5KfQIArMlOI_I0JiDDbrdcWYe3PagZXCXM8eFJCtLxh0FYBP7_i005UHVi6LUvByEkhc69qvB5hdHtX_U_i-7CQJGwEJTy6iYGNHPTcq1DDNCg','APA91bHIKFCrKIL3OVFk85mlxs715Q0VM8Aa851rUViLbB5_DdYqczXDc_RoTgeQKduYsaaXmd0fsK29V-CjDfpaOaFQuRGVUXSx20vesax-OBd_jjlVjvVtlMjP4fE5h3zu8-GW02drkQZ0vY2vg4ObocxgwXeOco3AePvetCEiogHujIx5VoY','APA91bFr7xm7za4zc8xHoGtLZbonv9Y-Bupb0MI7MHMxgsB7TdU1TZEKjz629lOpQetl5WebhigrgVW6z3oKVzexZOM478Jd5VpkS28rjizYk78sXkdJOcfTMkK9--dSIqwM05Dt3f4fptPQJQ6n-hsdth3YhVA9DdVrUyEWPTEjS_JUSw7pBX4',
'APA91bE1W7QIDKgmCJy7vWHSv9NscXRfN5tqssOTIrYG85e2rkQ9MhAhrriJlQlZKZwpioWxncFI00dDZUQGUlMEL53t5Ta5miFdkH1OBvNyg6ZM2ZkWS7NvnarxCZ5Ed8wT_76brFqQovLrgsU6jbHH57e6uVoNmuF4IuG1lWbrGgegPl2HMrM',
'APA91bGiBKgiyKGD_Wh8mpG3yC4czzv-oJ4F4_3YvbIpbdpTwvNv6GL7zBYl3m-75N1gXJutwVWl64udkB7F2szqXWEcb4UuRAIJy6tLH8f4vcSOIAhxUZlNB_wMGf45aVip1OvFexwT0yVCIVjPP2wRPYEsIOUmgmXq6GETfJ3Cfr4Oj7jcLq4'], 
function(err, resp) {
  console.log( JSON.stringify(resp) );
});

