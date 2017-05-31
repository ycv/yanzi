(function ($) {
    var ms = {
        init: function (obj, args) {
            return (function () {
                ms.fillHtml(obj, args);
                ms.bindEvent(obj, args);
            })();
        },
        //填充html
        fillHtml: function (obj, args) {
            return (function () {
                var layerHtml = "";
                if (args.Shade == true) {
                    layerHtml += '<div class="share_layer_shade"></div>';
                }
                layerHtml += '<div class="share_layer_box" id="layer_' + args.Content + '">';
                layerHtml += '<h3><b class="text">' + args.Title + '</b><a class="close"></a></h3>';
                layerHtml += '<div class="layer_content">';
                layerHtml += '<div id="' + args.Content + '"><ul>';
                layerHtml += '<li onclick="setsex(1)">女<li>';
                layerHtml += '<li onclick="setsex(0)">男</li>';
                layerHtml += '</ul></div></div></div>';
                $('body').prepend(layerHtml);
            })();
        },
        //绑定事件
        bindEvent: function (obj, args) {
            return (function () {
                var $shareLayerBox = $('.share_layer_box');
                var $shareLayerShade = $('.share_layer_shade');
                var $ShareLi = $('#Share li');
                if (args.Event == "unload") {
                    $('#layer_' + args.Content).animate({
                        opacity: 'show',
                        marginTop: '-30%'
                    }, "slow", function () {
                        $($shareLayerShade).show();
                    });
                } else {
                    $(obj).on(args.Event, function () {
                        $('#layer_' + args.Content).animate({
                            opacity: 'show',
                            marginTop: '0'
                        }, "slow", function () {
                            $($shareLayerShade).show();
                        });
                    });
                }
                $($ShareLi).each(function () {
                    $(this).hover(function () {
                        $(this).find('a').animate({marginTop: 2}, 'easeInOutExpo');
                        $(this).find('span').animate({opacity: 0.2}, 'easeInOutExpo');
                    }, function () {
                        $(this).find('a').animate({marginTop: 12}, 'easeInOutExpo');
                        $(this).find('span').animate({opacity: 1}, 'easeInOutExpo');
                    });
                });

                $('.share_layer_box .close').on('click', function () {
                    $($shareLayerBox).animate({
                        opacity: 'hide',
                        marginTop: '-30%'
                    }, "slow", function () {
                        $($shareLayerShade).hide();
                    });
                });


            })();
        }
    };
    $.fn.shareConfig = function (options) {
        var args = $.extend({
            Shade: true,
            Event: "click",
            Content: "Share",
            Title: "选择性别"
        }, options);
        ms.init(this, args);
    };
})(jQuery);

   
