console.log('\'Allo \'Allo!');

console.log(!!navigator.serviceWorker.register);

navigator.serviceWorker.register('/scripts/worker.js', {
  scope: '/'
}).then(function(reg) {
  console.log('◕‿◕', reg);
}, function(err) {
  console.log('ಠ_ಠ', err);
});