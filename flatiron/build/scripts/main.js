console.timeStamp('main js thread'); 

function lgo() {
    var _start = Date.now();
    var elrect = document.querySelector('#maskrect');
    var brect = document.querySelector('#bordrect');
    
    document.querySelector('#logoname').classList.add('in');
    document.querySelector('#logodn').classList.add('in');

    function updatelogo() {
        var _now = Date.now();
        var _pct = (_now - _start) / 2000;
        _pct = _pct >= 1 ? 1 : _pct;
        //var _color = ~~( 204 - (_pct * 204) );
        
        var _color = ~~( ( Math.sin(_pct * (Math.PI/2)) * 220) );
        _color = _color < 50 ? 50 : _color;

//         var _angle = ~~( 45 - (_pct * 3 * 45) );
//         _angle = _angle < 0 ? 0 : _angle;
        //console.log('rgb(' + [_color,_color,_color].join().toString() + ')');
        brect.setAttribute('fill', 'rgba(' + [_color,_color,_color].join().toString() + ',1)');
//         elrect.style.transform = 'rotateZ(' + _angle + 'deg)';

        return _pct == 1 ? 1 : requestAnimationFrame(updatelogo);
    }
    requestAnimationFrame(updatelogo);
}

function stopup() {
    var elup = document.querySelector('#logoup');

    elup.style.opacity = 1;
}

//document.querySelector('#logoname').classList.add('in');
setTimeout(lgo, 1100);

function flipcta() {
    
    $('.cta').addClass('in');
    $('.flip').addClass('in');
    setTimeout(function(){ $('.emin').addClass('in'); }, 333)

}

$(document).on('click', 'input.emin', flipcta);

var $p = document.querySelectorAll('p[data-title]');
var $det = document.getElementById('topdetail');
function cyclecopy(n) {
    n = n || 1;
    var idx = n % $p.length;
    $det.style.opacity = 0;
    $det.style.transform = 'scale(.95)';
    var txt = $p[idx].innerHTML;
    var title = $($p[idx]).data('title');
    cycletitle(title);
    function backin() {
        $det.style.opacity = 1;
        $det.style.transform = 'scale(1)';
        $det.innerHTML = txt;
    }
    setTimeout(backin, 1333);
}

var $title = document.querySelector('.toptitle');
function cycletitle(title) {
    $title.classList.add('out');
    function titlein() {
        $title.innerText = title;
        $title.classList.remove('out');
    }
    setTimeout(titlein, 700);
}

var cycle = 1;
var throttlecopy = _.throttle(function(){
    cyclecopy(cycle++);
    throttlecopy.cancel();
}, 3500, {trailing: false});
window.addEventListener('scroll', throttlecopy);

var workdeg = 0;
function rotateworkto(x) {
    $('.cycle g').attr('transform', 'translate(50, 50) rotate(' + x + ') translate(-50, -50)');
    $('#vmask rect').attr('transform', 'translate(50, 50) rotate(-' + x + ') translate(-50, -50)');
    workdeg = x;
}

function animatework() {
    var wkdeg = workdeg;
    var tgt = wkdeg + 90;
    var start = Date.now();
    var end = 1000;

    function _a(){
        var pct = (Date.now() - start) / end;
        var place = Math.sin((Math.PI * pct)/2) * 90;
        place += wkdeg;
        if(pct < 1) {
            requestAnimationFrame(rotateworkto.bind(this, place));
            requestAnimationFrame(_a);
        }
        else {
            requestAnimationFrame(rotateworkto.bind(this, tgt));
            var idx = (tgt % 360)/90;
            var copy = ['ABC','DEF','GHI','JKL'][idx];
            $('.wkcopy:eq(1)').text('Flatiron did for ' + copy);
        }
    }
    requestAnimationFrame(_a);
}

$(document).on('click', 'div.mid', animatework);

$(document).on('click', '.learnmore', function(){
    window.location.href = '/assets/flatiron.pdf';
})




//append under-the-fold html
var backoff = 1;
function initrun() {
    $.get('pc_home.html')
        .done(function(data){
           var uf = $('.postcritical');
           var _p = uf.parent();
           uf
            .detach()
            .html(data)
            .appendTo(_p); 
           $(document).trigger('postcritical');
        })
        .fail(function(){
            (backoff < 20) && setTimeout(function(){ backoff++; initrun(); }, backoff * 1000);
        });
}
initrun();
