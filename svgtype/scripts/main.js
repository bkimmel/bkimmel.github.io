console.log('\'Allo \'Allo!');

document.getElementById('scrgrad').addEventListener('hover', function(){
  console.log('hover');
  var gradstop = document.getElementById('myRadialGradient4').querySelector('stop');
  var _start = Date.now(), dur = 1000;
  function stepgrad() {
    if (Date.now() - _start >= dur) {
      return gradstop.setAttribute(null, 'offset', '50%');
    }
    var pct = ( ( ( Date.now() - _start ) / dur ) * 50 ) + '%';
    requestAnimationFrame(function(){
      gradstop.setAttribute(null, 'offset', '50%');
      stepgrad();
    });
  }
  stepgrad();
});