self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('sync', function(syncevent) {
  syncevent.waitUntil(new Promise(function(res, rej){
    var request = indexedDB.open("MyTestDatabase",11);
    request.onsuccess = function(event) {
      var db = event.target.result;
      var scanner = db.transaction(['pageloads']).objectStore('pageloads').openCursor();
      scanner.onsuccess = function(evt){
          var cursor = evt.target.result;
          //self.registration.showNotification(JSON.stringify(cursor.value));
          var i = setInterval(function(){
            var elapsed = new Date() - (new Date()).setTime( cursor.value );
            if(elapsed >= 20000) {
              self.registration.showNotification('20 seconds');
              i = null;
              res('done');
            }
          }, 10000);
      }
    }
  }))
});
