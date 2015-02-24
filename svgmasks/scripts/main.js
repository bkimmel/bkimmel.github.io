console.log('\'Allo \'Allo!');

/*
 * by Noel Delgado | @pixelia_me
 *
*/


var svgElement = document.querySelector('svg');
var maskedElement = document.querySelector('#mask-circle');

var svgPoint = svgElement.createSVGPoint();

function cursorPoint(e, svg) {
    svgPoint.x = e.clientX;
    svgPoint.y = e.clientY;

    return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
}

function update(svgCoords) {
    maskedElement.setAttribute('x', svgCoords.x);
    maskedElement.setAttribute('y', svgCoords.y);
    
}

window.addEventListener('mousemove', function(e) {
    update(cursorPoint(e, svgElement));
}, false);

window.addEventListener('touchmove', function(e) {
    e.preventDefault();

    var touch = e.targetTouches[0];

    if (touch) {
        update(cursorPoint(touch, svgElement));
    }
}, false);


