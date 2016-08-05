console.log('hi');

function swapImage() {
    var current = document.querySelector('.plantinfo image.in');
    var next = document.querySelectorAll('.plantinfo image')[0];
    var parent = next.parentElement; 
    parent.removeChild(next);
    parent.appendChild(next);
    setTimeout(function(){ next.classList.add('in'); }, 100);
    setTimeout(function(){ current.classList.remove('in') }, 400);
}

setInterval(swapImage, 12000);