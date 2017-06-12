//where pushsub is the JSON.stringify of the PushSubscription object
//..and vapidkeys is the result of running web-push generate-vapid-keys --json >
let webpush = require('web-push');

const payload = 'test';
 
const options = {
  vapidDetails: {
    subject: 'mailto:brentkimmel@brentkimmel.com',
    publicKey: vapidkeys.publicKey,
    privateKey: vapidkeys.privateKey
  },
  TTL: 60 * 60 * 24 * 14 /*days*/
}
 
webpush.sendNotification(
  pushsub,
  payload,
  options
).then(function(err, res){
	console.log('then::');
	console.log(err);
	console.log(res);
}).catch(function(err, res){
	console.log('catch::');
	console.log(err);
	console.log(res);
})
