console.log('\'Allo \'Allo!');

console.log(!!navigator.serviceWorker.register);

var mysw = navigator.serviceWorker.register('/workerb.js', {
  scope: '/'
}).then(function(reg) {
  console.log('◕‿◕', reg);
}, function(err) {
  console.log('ಠ_ಠ', err);
});