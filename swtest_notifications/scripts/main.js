console.log('Main: ');


navigator.serviceWorker.register('/swtest_notifications/noteworker.js', {
  scope: '/swtest_notifications/'
}).then(function(reg) {
  console.log('◕‿◕%O', reg);
}, function(err) {
  console.log('ಠ_ಠ', err);
});