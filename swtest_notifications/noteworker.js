var timeup, res;
var prom = new Promise(function(_res, rej){
	res = _res;
});
timeup = setTimeout(function(){ res(); res = function(){}; }, 10000);

self.addEventListener('message', function handlemessage(ev){
	console.log('MESSAGE FROM WINDOW: ' + m);
	clearTimeout(timeup);
	timeup = setTimeout(function(){ res(); res = function(){}; }, 10000);
});

self.addEventListener('install', function(event) {
  console.log("SW Alpha installed");
  //this will only run if the browser has not seen this version of the SW yet
  event.waitUntil(prom);
});

self.addEventListener('activate', function(event){
	self.registration.showNotification('Chrome Exclusive - Additional 10% Off!', {  
	  body: 'We lowered the price or something....',  
	  icon: 'https://rosettastone.okta.com/bc/image/fileStoreRecord?id=fs02cu04ljBTIJDKMMSC',  
	  tag: 'test-tag' 
	});  
});


      