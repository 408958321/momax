/**
 * Created by MoMax on 2017/5/4.
 */
var video=$('.video')[0];
var _is_click = false;
var _is_play=false;
var _is_volume=false;

var total_width = $(".total-bar").width();
var volume_width = $(".volume-box").width();

var timer;
var is_fullscreen = false;
//hover效果
$('.swipe_btn').hide();
$('.video-container').hover(function(){
    $('.total-bar').animate({'height':8+'px'},100);
    $('.swipe_btn').show();
},function(){
    $('.swipe_btn').hide();
    $('.total-bar').animate({'height':4+'px'},100);
});

$('.speed').hover(function(){
    $('.speed ul').show();
},function(){
    $('.speed ul').hide();
});

//设置播放速度
$('.speed ul li').click(function(){
    var text=$(this).text();
    $('.speed span').html(text);
    $('.speed ul').hide();
    var speed=parseFloat(text);
    video.playbackRate=speed;
});

//播放暂停功能
$('.play').click(function(){
    // console.log(_is_play)
    if( _is_play == false){
        play();
        $(this).css({"background-position":"-165px 0",'margin-top':"4px"});
        _is_play = true;
        timer = setInterval(set_process,1000);


    }else{
        pause();
        $(this).css({"background-position":"-165px -28px","margin-top":"8px"});
        _is_play = false;
        clearInterval(timer);
    }

});

$('.video-content').click(function(){
    $('.play').trigger('click');
});

//下一个视频
$('.next').click(function(){
    var len = $('.menu-list a').attr('href');
    console.log(len);
});


//设置进度条
function progress(e){
    var width;
    var time;
    var left = e.pageX-14;

    if(left <= 0)
    {
        left = -7;
        time=0;
        width=0;
    }else if(left > total_width)
    {
        left = total_width - 7;
        width=total_width;
        time=get_total_second();
    }else{
        width = left+7;
        time=get_total_second()*width/total_width;

    }
    set_time(time);
    set_process(width,left);

    // currentTime();
}
//重新设置进度条
function re_progress(){
    total_width = $(".total-bar").width();
    var width = total_width * get_current_time()/get_total_second();
    var left =width -7
    $('.swipe_btn').css("left",left);
    $('.current-bar').width(width);
    $('.video-content').css('min-width','100%');
    $('.video').css('min-width','100%');
    console.log(total_width);
}


$(".total-bar").click(function (e) {
    progress(e);
});

$('.volume-box').click(function(e){
    vol_progress(e);
})

$('.swipe_btn').mousedown(function () {
    _is_click = true;
});

$('.volume-control').mousedown(function(){
    _is_volume = true;
});



$(document).mouseup(function () {
    _is_click = false;
    _is_volume = false;
});

$(document).mousemove(function(e){

    if(_is_click == true)
    {
        progress(e);
    }else if(_is_volume == true){
        vol_progress(e);
    }
});
$(document).keydown(function(key){

    if(key.keyCode=="32"){
        //当表单元素获得焦点时，阻止播放事件


        if($(':focus').length == 0){
                $('.play').trigger('click');
                return false;
        }

    }

});

//重播按钮事件

$('.replay').click(function(){
    $('.player-ended').fadeOut(1000,function(){
        set_time(0);
        set_process(0,-7);
        currentTime();
        $('.play').trigger('click');
        $('.ended-left').find('span').text(5);
        $('.ended-left').find('.left').css({
            'transform':'rotate(0deg)',
            '-moz-transform': 'rotate(0deg)',
            '-ms-transform': 'rotate(0deg)',
            '-webkit-transform': 'rotate(0deg)'
        });
        $('.ended-left').find('.right').css({
            'transform':'rotate(0deg)',
            '-moz-transform': 'rotate(0deg)',
            '-ms-transform': 'rotate(0deg)',
            '-webkit-transform': 'rotate(0deg)'
        });
    });

});

//倒计时效果
function circle_pro(){
    var timer_pro;
    var n = parseInt($('.ended-left').find('span').text());

    var i = 0;

    timer_pro=setInterval(function(){

        i++;
        if(i% 20== 0){
            $('.ended-left').find('span').text(--n);
        }
        if(i >=100) {
            clearInterval(timer_pro);
        }

        var num = i*3.6;
        if(num<=180){
            $('.ended-left').find('.left').css({
                'transform':'rotate('+num+'deg)',
                '-moz-transform': 'rotate('+num+'deg)',
                '-ms-transform': 'rotate('+num+'deg)',
                '-webkit-transform': 'rotate('+num+'deg)'
            });
        }else{
            $('.ended-left').find('.left').css({
                'transform':'rotate(180deg)',
                '-moz-transform': 'rotate(180deg)',
                '-ms-transform': 'rotate(180deg)',
                '-webkit-transform': 'rotate(180deg)'
            });
            $('.ended-left').find('.right').css({
                'transform':'rotate('+(num-180)+'deg)',
                '-moz-transform': 'rotate('+(num-180)+'deg)',
                '-ms-transform': 'rotate('+(num-180)+'deg)',
                '-webkit-transform': 'rotate('+(num-180)+'deg)'
            });

        }
    },50);
}

function vol_progress(e){
    var offset = parseInt($('.volume-box').offset().left);
    var width;
    var left;
    var vol;
    left = e.pageX - offset;

    if(left <= -5){
        left = -5;
        width = 0;
        vol = 0;
    }else if(left >= volume_width){
        left = volume_width - 5;
        width = volume_width;
        vol = 1;
    }else{
        width = left + 5;
        vol = (1 * width / volume_width).toFixed(2);

    }
    set_volume(width,left);
    volume(vol);

}

//video API
//播放视频
function play(){
    video.play();
}

//暂停视频
function pause(){
    video.pause();
}

//得到视频总时间
function get_total_second(){
    return video.duration;
}

//得到视频当前时间
function get_current_time(){

    return video.currentTime;
}

//设置视频播放时间
function set_time(second){
    if(second >= get_total_second())
    {
        second = get_total_second();
    }
    video.currentTime=second;
}

//设置进度条
function set_process(width,left){
    if(ended()){
        clearInterval(timer);
        _is_play=true;
        $('.play').trigger('click');
        $('.player-ended').fadeIn(1000,function(){
            circle_pro();
        });

    }

    var width = width || total_width * get_current_time() / get_total_second();
    var left=left || width - 7;
    $('.swipe_btn').css("left",left);
    $('.current-bar').width(width);
    currentTime();

}


//设置时间以及定位
function set_volume(width,left){

    var width = width || volume_width * volume();
    var left = left || width-5;
    $('.volume-control').css('left',left);
    $('.volume-value').width(width);

}
//设置视频总时间
function timeformat(){
    var minute = parseInt(get_total_second()/60);
    var seconds = parseInt(get_total_second()%60);


    var total_time = pad_right((minute.toString()),2,"0") + ":" + pad_right((seconds.toString()),2,"0");


    console.log(1);
    $('.total-time').html(total_time);
}

function pad_right(str,len,ch) {
    if(str.length >= len)
    {
        return str;
    }

    for(var i =0; i < len - str.length; ++i)
    {
        str = ch + str;
    }
    return str;
}

//设置当前时间显示
function currentTime(){
    var minute = parseInt(get_current_time()/60);
    var seconds = parseInt(get_current_time()%60);
    var current_time = pad_right(minute.toString(),2,"0") + ":" + pad_right(seconds.toString(),2,"0");


    $('.current-time').html(current_time);
}
//视频播放结束
function ended(){
    return video.ended;
}

//设置volume
function volume(vol){
    if( vol > 1){
        vol = 1;
    }else if(vol <= 0.1){
        vol = 0;
    }
    video.volume = vol;
}

function launchFullscreen(element,callback)
{

    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.msRequestFullscreen){
        element.msRequestFullscreen();
    } else if(element.oRequestFullscreen){
        element.oRequestFullscreen();
    }
    else if(element.webkitRequestFullscreen)
    {
        element.webkitRequestFullScreen();
    }else{

        var docHtml  = document.documentElement;
        var docBody  = document.body;
        var videobox  = document.getElementById('video');
        var  cssText = 'width:100%;height:100%;overflow:hidden;';
        docHtml.style.cssText = cssText;
        docBody.style.cssText = cssText;
        videobox.style.cssText = cssText+';'+'margin:0px;padding:0px;';
        document.IsFullScreen = true;

    }
    callback();

}
//退出全屏
function exitFullscreen(callback)
{
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.oRequestFullscreen){
        document.oCancelFullScreen();
    }else if (document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    }else{
        var docHtml  = document.documentElement;
        var docBody  = document.body;
        var videobox  = document.getElementById('videobox');
        docHtml.style.cssText = "";
        docBody.style.cssText = "";
        videobox.style.cssText = "";
        document.IsFullScreen = false;
    }
    callback();
}


$('.fullscreen').click(function(){



        if(!is_fullscreen){
            is_resize = false;
            var timer;
            var timer2;
            var timer4;

             launchFullscreen(document.getElementById('player-container'),function(){
                    clearTimeout(timer);
                    timer = setTimeout(re_progress,1000);
             });

             timer4 = setTimeout(function(){
                 is_resize = true;
             },300);


            $('.video-content').css('height','100%');
            $('.video').css('height','100%');
            is_fullscreen = true ;
            mouse_event();
        }
        else {
            clearInterval(timer3);
            is_resize = true;
            is_fullscreen = false;
            exitFullscreen(function () {
                clearTimeout(timer2);
                timer2 = setTimeout(re_progress, 1000);
            });

            $('.video').off('mouseover');
            $('.video').off('mousemove');
            $('.video').off('mouseout');
            $('.full-box').css('opacity', 1);
            $('body').css('cursor', 'inherit');
        }

});

// function escEvent(){
//     is_fullscreen = false;
//     clearInterval(timer3);
//     $('.video').off('mouseover');
//     $('.video').off('mousemove');
//     $('.video').off('mouseout');
//     $('.full-box').css('opacity',1);
//     $('body').css('cursor','inherit');
//     re_progress();
// }

//浏览器退出全屏按键
// $(document).on('webkitfullscreenchange',function(){
//     if(!document.webkitIsFullScreen){
//         escEvent();
//
//     }
// });
// $(document).on('mozfullscreenchange',function(){
//
//     if(!document.mozFullScreen){
//
//         escEvent();
//     }
// });
// $(document).on('fullscreenchange',function(){
//
//    if(!document.mozFullScreen){
//
//        escEvent();
//    }
// });
// $(document).on('msfullscreenchange',function(){
//     if(!document.msIsFullScreen){
//         escEvent();
//     }
// });


var timer3;
function mouse_event(){

    var is_move = false;
    $('.video').on('mousemove',function(){
        is_move = true;

    });
    $('.video').on('mouseover',function(){
       timer3= setInterval(function(){
            if(!is_move){
                $('body').css('cursor','none');
                $('.full-box').css('opacity','0');
            }else{
                $('body').css('cursor','inherit');
                $('.full-box').css('opacity','.6');
                is_move = false;
            }
        },1000);

    });
    $('.video').on('mouseout',function(){
        clearInterval(timer3);
        $('.full-box').css('opacity',1);
        $('body').css('cursor','inherit');
    });
}



