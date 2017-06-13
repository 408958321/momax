/**
 * Created by momax on 2017/5/17.
 * 头部功能
 */



    $('.menu-title>i').click(function(){
        $(this).parent().parent().toggleClass('unfold-state');
        $(this).parent().parent().children('.menu-list').toggle(300);
        return false;
    });

    $('.menu-content').click(function(){
        // return false;
    })


    // var is_menu = false;

    // function menu_action(){
    //     if(is_menu){
    //         $('.menu-container').animate({'left':-329},300);
    //         is_menu = false;
    //     }
    // }

    $('.menu').hover(function(){

        // $('.active').removeClass('active');
        $(this).addClass('active');
        $('.menu-container').fadeIn();


    }
    );

    $('.menu-container').hover(function(){

    },function(){
        $(this).fadeOut();
        $('.menu').removeClass('active');
})


    $('.user-control>li').hover(function(){
        var c_class = ($(this).attr('class').split('-'))[1];

        $(this).addClass('active')
            .siblings()
            .removeClass('active');
        $(this).find('.'+c_class+'-box').fadeIn();
    },function(){
        $(this).removeClass('active');
        var c_class = ($(this).attr('class').split('-'))[1];
        $(this).find('.'+c_class+'-box').css('display','none');
    });

    $('#search').focus(function(){

       // $(this).parents('.user-search').addClass('active');
    });

    $('.login-bar').hover(function(){

        $(this).addClass('active').find('.login-box').fadeIn();

    },function(){
        $(this).removeClass('active').find('.login-box').fadeOut();
    });

    //侧边栏点击事件



    $('.toggle-bar li').click(function(){

        var time = new Date();
        var hours = time.getHours();
        var minute = time.getMinutes();
        $('#datetimepicker3').val('今天');
        if(minute < 10) {
            minute = '0'+minute;
        }

        $('#datetimepicker1').val(hours+':'+minute);


        $('.active').removeClass('active');
        var current_class = (($(this).attr('class')).split(" "))[0];
        var is_dbclick = $(this).hasClass('active-bar');

        if(is_dbclick){
            $('.'+current_class+'-box').animate({'right':-364},300);
            $('.active-bar').removeClass('active-bar');
            $('.active-tog').removeClass('active-tog');
            $('.video-container').animate({'margin-right':78},300,function(){
                try {
                    re_progress();
                }catch (e){

                }
            });


        }else{
            $('.pannel-box').css('right',-364)
                .filter('.'+current_class+'-box')
                .animate({'right':78},300);

            $(this).addClass('active-bar')
                .siblings()
                .removeClass('active-bar').parent().parent().addClass('active-tog');

            $('.video-container').animate({'margin-right':424},300,function(){

                try{

                    re_progress();
                }catch(e){

                }

            });

        }

        return false;
    });
    $('.toggle-bar').click(function(){
        return false;
    });




//字数提示

$('.load-img').click(function(){
    $(this).parent().find('.question-img').trigger('click');

});

$('.text-area').keyup(function(){
   var len;
   len = 300 - $(this).val().length;

   if(len <=0 ) len = 0;

   $(this).parent().find('.word-num').children('b').text(len);

});

$('.tea-box').click(function(){
    $('.choose-state').removeClass('choose-state');
    $(this).addClass('choose-state');
});


$('.note-state i').click(function(){
    $(this).toggleClass('not-choose');
    if($(this).hasClass('not-choose')){
        $(this).attr('value',0);
    }else{
        $(this).attr('value',1);
    }
});

//面板提交按钮

$('.question-btn').click(function(){
    var pannel_type = $(this).parent().find('.pannel-name').text();
    var text_val = $(this).parent().find('.text-area').serialize();
    var img_val = $(this).parent().find('.question-img').serialize();
    var tea_val = $(this).parent().find('.choose-state').attr('value');
    var is_record = $(this).parent().find('.note-state').children('i').attr('value');
    var day = $(this).parent().find('.date-input').val();
    if(day == '今天'){
       var date = new Date();
       $(this).parent().find('.date-input').val(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate())
    }
    day = $(this).parent().find('.time-input').serialize();
    var time = $(this).parent().find('.date-input').serialize();



    var data = {
        "pannel_type":pannel_type,
        "content":text_val,
        "image":img_val,
        "is_teacher":tea_val,
        "time":time + " "+ day,
        "is_record":is_record
    };


    console.log(data);
});

//進度條初始化

$("[data-value]").each(function(){
    var p_width = $(this).parent().width();
    var percent = $(this).attr('data-value');
    var t_width = percent*0.1*p_width;

    $(this).width(t_width);
});

//消息數量初始化

var me_nums = $('.message-box li').length;
$('.message-num').text(me_nums);


//搜索框
$('#search').keyup(function(e){
    if(e.keyCode == 13 ){
        console.log($(this).val());
    }

})


