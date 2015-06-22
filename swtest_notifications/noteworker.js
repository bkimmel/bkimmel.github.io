self.addEventListener('install', function(event) {
  console.log("SW Alpha installed");
  //this will only run if the browser has not seen this version of the SW yet
  self.registration.showNotification('Test Notification', {  
	  body: 'testbody',  
	  icon: 'https://www.google.com/logos/doodles/2015/fathers-day-2015-multiple-countries-5678804118798336-res.png',  
	  tag: 'test-tag' 
	});  
});


      