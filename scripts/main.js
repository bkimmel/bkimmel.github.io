console.log('\'Allo \'Allo!');

console.log(!!navigator.serviceWorker.register);

navigator.serviceWorker.register('/scripts/worker.js', {
  scope: '//C:/Users/kimmel_admin/Documents/DevTools/serviceworker/'
}).then(function(reg) {
  console.log('◕‿◕', reg);
}, function(err) {
  console.log('ಠ_ಠ', err);
});