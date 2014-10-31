// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear

//Shift+F5 in Chrome to reload
console.log("SW startup");

var globalvar = 0;
//globalvar stays in scope through the life of the worker

var installran = "no";

function Prom() {
    var ret = this;
    var p = new Promise(function(resolve, reject){
        ret.res = resolve;
        ret.rej = reject;
    });
    this.promise = p;
}

function someothercrazyfunction(res) {
  var rand = Math.random() * 2000 + 2000;
  setTimeout(function(){ res('waited ' + rand + ' ms!!'); }, rand)
}

self.addEventListener('install', function(event) {
  console.log("SW installed");
  //this will only run if the browser has not seen this version of the SW yet
  installran = "yes";
});

self.addEventListener('activate', function(event) {
  console.log("SW activated");
  //this will run when the old version is disposed of and this one is ready to rock
  var pr = new Prom();
  event.waitUntil(pr.promise.then(function(v){ console.log('stuff done at activation - resolved with:' + v); }));
  someothercrazyfunction(pr.res);
});

self.addEventListener('fetch', function(event) {
  console.log("Globalvar:" + globalvar++);
  console.log("install ran?: " + installran);
  console.log("Fetch For::" + event.request.url);
  var rando = Math.random() * 10;
  if( event.request.url === 'https://bkimmel.github.io/') {
    console.log("HTML Fetch::" + event.request.url);
    //event.respondWith(rando < 3 ? fetch("/otherindex.html") : rando < 7 ? new Response("Hello world!" + Math.random()) : fetch(event.request) );
    fetch(event.request)
      .then(function(v){ event.respondWith(v); })
      .catch(function(err){ event.respondWith('Bruce is a bitch!!!'); })
  }
});