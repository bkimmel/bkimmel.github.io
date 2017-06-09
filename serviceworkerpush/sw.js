console.log('Started Push Worker');
self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);
 
  var title = 'Static Title';  
  var body = 'Static Body';  
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,
      tag: tag  
    });  
  );  
});