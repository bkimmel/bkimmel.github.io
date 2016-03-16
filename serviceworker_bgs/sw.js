self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('sync', function(event) {
  var request = indexedDB.open("MyTestDatabase",10);
  request.onsuccess = function(event) {
    var db = event.target.result;
    var scanner = db.transaction(['pageloads']).objectStore('pageloads').openCursor();
    scanner.onsuccess = function(evt){
        var cursor = evt.target.result;
        self.registration.showNotification(JSON.stringify(cursor.value));
    }
  }
});
