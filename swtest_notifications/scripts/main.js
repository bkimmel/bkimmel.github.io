console.log('Main: ');

function resetTimer() {
	navigator.serviceWorker.controller.postMessage('hello serviceworker')
}

navigator.serviceWorker.register('/swtest_notifications/noteworker.js', {
  scope: '/swtest_notifications/'
}).then(function(reg) {
  console.log('◕‿◕%O', reg);
  setInterval(resetTimer, 8000);
}, function(err) {
  console.log('ಠ_ಠ', err);
});