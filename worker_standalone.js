self.addEventListener('install', function(event) {
  console.log('Skipping wait');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
  console.log("Fetch For::" + event.request.url);
  if( event.request.url === 'https://bkimmel.github.io/ispwa') {
	  return event.respondWith(new Response('true'))
  }
});