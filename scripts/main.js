console.log('\'Allo \'Allo!');

console.log(!!navigator.serviceWorker.register);

document.querySelector('button').addEventListener('click', function(e){
	navigator.serviceWorker.controller.postMessage('hello serviceworker')
});

var mysw = navigator.serviceWorker.register('/workerb.js', {
  scope: '/'
}).then(function(reg) {
  console.log('◕‿◕', reg);
}, function(err) {
  console.log('ಠ_ಠ', err);
});