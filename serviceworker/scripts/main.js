console.log('\'Allo \'Allo!');

console.log(!!navigator.serviceWorker.register);

document.querySelector('button').addEventListener('click', function(e){
	navigator.serviceWorker.controller.postMessage('hello serviceworker')
});

var myswreg;
navigator.serviceWorker.register('/serviceworker/worker.js', {
  scope: '/serviceworker/'
}).then(function(reg) {
  console.log('◕‿◕', reg);
}, function(err) {
  console.log('ಠ_ಠ', err);
});