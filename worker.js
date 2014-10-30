// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear

//Shift+F5 in Chrome to reload
console.log("SW startup");

var globalvar = 0;

self.addEventListener('install', function(event) {
  console.log("SW installed");
});

self.addEventListener('activate', function(event) {
  console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
  console.log("Globalvar:" + globalvar++);
  event.respondWith(new Response("Hello world!" + Math.random()));
});