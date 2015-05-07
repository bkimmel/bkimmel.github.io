console.log('Started Push Worker');
self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);
 
  var title = 'Woooooo!';  
  var body = 'It\'s a secret to everybody.';  
  var icon = 'http://tbo.com/storyimage/TB/20140101/ARTICLE/140109943/EP/1/1/EP-140109943.jpg';  
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
});