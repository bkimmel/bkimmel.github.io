var selectedindex = 0;
var works = {
    title: 'Not That We Would',
    client: 'McCormick Food',
    year: '2012',
    media: 'Print, Radio',
    blurb: 'Cake cheesecake gummies dessert liquorice gingerbread marzipan sesame snaps tootsie roll. Bear claw chocolate powder pie. Muffin chocolate tart powder bonbon gummi bears chocolate bar gummies muffin. Sweet roll pie muffin fruitcake chocolate gingerbread wafer. Icing cookie sesame snaps lollipop chocolate cake marshmallow. Jelly-o croissant jujubes chupa chups candy canes jujubes sweet bear claw.',
    frames: [
        '<iframe style="height: 20vh;" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/141090095&amp;color=46666a&amp;auto_play=true&amp;hide_related=false&amp;show_artwork=false"></iframe>',
        '<iframe style="height: 40vh;" frameborder="0" src="http://player.vimeo.com/video/68606971" name="1429337049613" class="cboxIframe" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>'
    ]
}

function showcontentbox(works) {
    var contboxtemplate = $('#conttemp').html();
    var compiledtemplate = _.template(contboxtemplate);
    var renderedtemplate = compiledtemplate(works);
    $('body').append(renderedtemplate);
    var $workbox = $('.workbox');
    $workbox.find('ul li').first().addClass('selected');
    selectedindex = 0;

    $workbox.data('base', works);


    $workbox.find('ul li').on('click', function(){
        //console.log( $(this).data('n') );
        var thisidx = $(this).data('n');
        if(thisidx === selectedindex) {
            return 0;
        }
        selectedindex = thisidx;
        $workbox.find('iframe').replaceWith( works.frames[thisidx] );
        $('.selected').removeClass('selected');
        $workbox.find('ul li:eq(' + thisidx + ')').addClass('selected');
    });

    setTimeout(function(){ $workbox.find('h2,h3.spin1').addClass('rotatein'); }, 100);
    setTimeout(function(){ $workbox.find('h3.spin2').addClass('rotatein'); }, 200);
    setTimeout(function(){ $workbox.find('h3.spin3').addClass('rotatein'); }, 300);
}

showcontentbox(works);
