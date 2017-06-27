/**
 * Created by momax on 2017/6/26.
 */

;(function () {
    $.fn.yz_slide = function (options) {
        var settings = $.extend({
            "direction": "left",
            "speed": 1000,
            "method": "slide",
            "slide_ele": "ul",
            "btn_ele": "ol",
            "s_items": "li",
            "b_items": "li",
            "left_btn": ".yyz-left",
            "right_btn": ".yyz-right"
        }, options);

        var nums = 1;
        var timer;
        var item = this.find(settings.slide_ele);
        var first = item.find(settings.s_items).first().clone();
        var last = item.find(settings.s_items).last().clone();
        item.append(first);
        item.prepend(last);

        var itemlen = item.find(settings.s_items).length;
        var btnlen = this.find(settings.btn_ele).find(settings.b_items).length;
        var width = item.find(settings.s_items).width();
        var l_btn = this.find(settings.left_btn);
        var r_btn = this.find(settings.right_btn);
        var btn_list = this.find(settings.btn_ele).find(settings.b_items);


        function btnChange(index) {
            var index = index - 1;
            btn_list.eq(index).addClass('yyz-active')
                .siblings()
                .removeClass('yyz-active');
        }


        function autoSlide(direct) {

            var data = {};
            // nums += 1;
            data["margin-" + direct] = -nums * width;

            // console.log(data);
            item.animate(data, settings.speed, function () {
                if (nums > btnlen) {
                    nums = 1;
                    item.css("margin-left", -nums * width);
                    btnChange(nums);
                } else if (nums === 0) {
                    // item.css("margin-left",);
                    nums = btnlen;
                    item.css("margin-left", -nums * width);
                    btnChange(nums);
                }

            });
            btnChange(nums);
        }

        if (settings.method === "slide") {

            item.css("margin-left", -nums * width);
            timer = setInterval(function () {
                r_btn.trigger('click');
            }, 3000);

            l_btn.click(function () {
                if (!item.is(':animated')) {

                    nums -= 1;
                    autoSlide(settings.direction);
                }
            });
            r_btn.click(function () {
                if (!item.is(':animated')) {

                    nums += 1;
                    autoSlide(settings.direction);
                }
            });

            btn_list.click(function () {
                if (!item.is(':animated')) {

                    nums = $(this).index() + 1;
                    autoSlide(settings.direction);
                }
            });

            this.hover(function () {
                clearInterval(timer);
            }, function () {
                timer = setInterval(function () {
                    r_btn.trigger('click');
                }, 3000);
            });


        }


    };

})(jQuery);

$('.yyz-slider').yz_slide();


