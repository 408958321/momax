var _doc_width = 0;
var _doc_height = 0;

var _video_height = 0;


var is_resize = true;


function set_size() {

    _doc_width = $(window).width();
    _doc_height = $(window).height();


    _video_height = _doc_height - 64 - 70 - 128;


    if(_video_height<312){
        _viedo_height=312
    }

    $('.video-content').css({'height':_video_height});

    set_video();
}

function set_video() {
    $('.video').css({'height':_video_height});
}

$(window).load(function() {

    set_size();
    var height=$('.player-container').height();
    // var width = $()
    $('.menu-container').css('height',height);
    $('.menu-content').css('height',height);
    $('.pannel-box').css('height',height);
    // $('.player-ended').css('height',height);
    set_volume(36,31);
    volume(0.5);
    setTimeout(timeformat,50);




});


$(window).on('resize',function(){

    if(is_resize){
        clearInterval(timer3);
        set_size();
        var height=$('.player-container').height();
        $('.menu-container').css('height',height);
        $('.menu-content').css('height',height);
        $('.pannel-box').css('height',height);
        $('.full-box').css('opacity',1);
        $('body').css('cursor','inherit');
        re_progress();
        if(is_fullscreen){
            is_fullscreen = false;
            $('.video').off('mouseover');
            $('.video').off('mousemove');
            $('.video').off('mouseout');
        }
    }
});

// 轮播



