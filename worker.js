// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear

//Shift+F5 in Chrome to reload
console.log("SW startup");

var globalvar = 0;
//globalvar stays in scope through the life of the worker

var installran = "no";

self.addEventListener('install', function(event) {
  console.log("SW installed");
  //this will only run if the browser has no serviceworkers for this url?
  installran = "yes";
});

self.addEventListener('activate', function(event) {
  console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
  console.log("Globalvar:" + globalvar++);
  console.log("install ran?: " + installran);
  event.respondWith(new Response("Hello world!" + Math.random()));
});