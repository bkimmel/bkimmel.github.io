console.log('\'Allo \'Allo!');
var gradstate = 0;
document.getElementById('scrgrad').addEventListener('click', function(){
  console.log('hover');
  gradstate = !!gradstate ? 0 : 50;
  var gradstop = document.getElementById('myRadialGradient4').querySelector('stop');
  var _start = Date.now(), dur = 1000;
  function stepgrad() {
    if (Date.now() - _start >= dur) {
      return gradstop.setAttribute(null, 'offset', gradstate + '%');
    }
    var pct = !!gradstate ? ( ( ( Date.now() - _start ) / dur ) * gradstate ) + '%' : ( gradstate - ( ( ( Date.now() - _start ) / dur ) * gradstate ) ) + '%';
    requestAnimationFrame(function(){
      gradstop.setAttribute(null, 'offset', pct);
      stepgrad();
    });
  }
  stepgrad();
});