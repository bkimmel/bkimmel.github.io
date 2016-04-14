self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('sync', function(syncevent) {
  console.info('sync activated');
  syncevent.waitUntil(new Promise(function(res, rej){
    var request = indexedDB.open("MyTestDatabaseb",12);
    console.info('sync waiting');
    request.onsuccess = function(event) {
      var db = event.target.result;
      var scanner = db.transaction(['pageloads']).objectStore('pageloads').openCursor();
      scanner.onsuccess = function(evt){
          var cursor = evt.target.result;
          console.info('scan success');
          self.registration.showNotification(Number(new Date()) - Number((new Date()).setTime(+cursor.value.current_time)));
		  
          res();
          /*var i = setInterval(function(){
            var elapsed = new Date() - (new Date()).setTime( cursor.value );
            if(elapsed >= 20000) {
              self.registration.showNotification('20 seconds');
              i = null;
              res('done');
            }
          }, 10000);
          */
      }
    }
  }))
});
