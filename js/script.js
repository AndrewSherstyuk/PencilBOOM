"use strict";

(function () {
    $(document).ready(function () {
        var $fixedItems = $('.fixed-items'),
            $hamburger = $('.hamburger'),
            $hamburgerSpan = $('.hamburger span'),
            $exhibitions = $('.exhibitions'),
            $nav = $('nav'),
            $staticItems = $('.static-items'),
            $gifts = $('.gifts'),
            styleClasses = {
                "hamburger": {
                    "hover": "m-hamberger-hover",
                    "click": "open"
                },
                "exhibitions": "m-exebitions-hover",
                "gifts": "m-gifts-hover"
            },
            $aColorBox = $('a.colorbox'),
            aColorBoxConfig = {
                "maxWidth": "90%",
                "maxHeight": "90%",
                "rel": "colorbox",
                "retinaImage": true
            },
            choosenConfig = {
                "disable_search": true
            },
            $fish_1_wrapper = $('#fish_1_wrapper'),
            $border_1 = $("#border_1"),
            $border_1_offset = null,
            $windowOuterWidth = $(window).outerWidth(),
            $fish_1_wrapperCss = null;

        $border_1_offset = $border_1.offset();
        $fish_1_wrapperCss = {
            "top": $border_1_offset.top + ($border_1.outerHeight() - $fish_1_wrapper.height()) / 2 + 'px',
            "left": $windowOuterWidth - $border_1_offset.left + 16 + 'px',
            "width": $windowOuterWidth - $border_1_offset.left + 'px'
        };

        $nav.css('height', 'calc(' + $(window).outerHeight() + 'px - 106px)');
        $hamburger.on('click', function () {
            $hamburger.toggleClass(styleClasses.hamburger.click);
            $nav.toggleClass(styleClasses.hamburger.click);
        });
        $hamburger.hover(function () {
            $fixedItems.addClass(styleClasses.hamburger.hover);
        }, function () {
            $fixedItems.removeClass(styleClasses.hamburger.hover);
        });
        $exhibitions.hover(function () {
            $staticItems.addClass(styleClasses.exhibitions);
        }, function () {
            $staticItems.removeClass(styleClasses.exhibitions);
        });
        $gifts.hover(function () {
            $staticItems.addClass(styleClasses.gifts);
        }, function () {
            $staticItems.removeClass(styleClasses.gifts);
        });

        $aColorBox.colorbox(aColorBoxConfig);

        $("#filter-genre, #filter-age, #filter-gifts").chosen(choosenConfig);

        $fish_1_wrapper.css($fish_1_wrapperCss);
        fish_1("#fish_1_wrapper");
    });
})();

window.onload=function() {
    doubleFishLeft("#fish_1_1", "#grid_img-7", "#grid_img-13");
    doubleFishRight("#fish_2", "#fish_2_2", "#grid_img-6");
    doubleFishRight("#fish_3", "#fish_3_3", "#grid_img-19");
    doubleFishLeft("#fish_4", "#fish_4_4", "#grid_img-21", "#grid_img-22");
    doubleFishRight("#fish_5", "#fish_5_5", "#grid_img-29");
    doubleFishRight("#fish_6", "#fish_6_6", "#grid_img-45");
    doubleFishLeft("#fish_7", "#fish_7_7", "#grid_img-47", "#grid_img-53");
    doubleFishRight("#fish_8", "#fish_8_8", "#grid_img-63");
    doubleFishRight("#fish_9", "#fish_9_9", "#grid_img-38");
    doubleFishLeft("#fish_10", "#fish_10_10", "#grid_img-66", "#grid_img-68");
    doubleBigFishLeft("#dolphin", "#dolphin2");
    doubleBigFishRight("#submarine", "#submarine2");
};

function doubleFishRight(first_fish, second_fish, leftimage) {
    var elementGetBoundingClientRect = document.querySelector(leftimage).getBoundingClientRect()
        , stoppoint = elementGetBoundingClientRect.right + 10 + 'px'
        , first_point = document.querySelector(first_fish).style.left
        , first_point2 = document.querySelector(second_fish).style.left
        , last_point = elementGetBoundingClientRect.left + 'px';

    $(first_fish).animate(
        {
            "left": stoppoint
        }, 
        {
            "duration": 10000,
            "easing": "swing",
            "complete": function() {
                setTimeout(function() {
                    $(first_fish).animate(
                        {
                            "left": last_point,
                            "opacity": 0
                        }, 
                        {
                            "duration": 10000,
                            "easing": "linear",
                            "complete": function() {
                                $(this).css({
                                    "left": first_point,
                                    "opacity": 1
                                });
                                $(second_fish).animate(
                                    {
                                        "left": stoppoint
                                    }, 
                                    {
                                        "duration": 10000,
                                        "easing": "swing",
                                        "complete": function() {
                                            setTimeout(function() {
                                                $(second_fish).animate(
                                                    {
                                                        "left": last_point,
                                                        "opacity": 0
                                                    }, 
                                                    {
                                                        "duration": 10000,
                                                        "easing": "linear",
                                                        "complete": function() {
                                                            $(this).css({
                                                                "left": first_point2,
                                                                "opacity": 1
                                                            });
                                                            setTimeout(function() {
                                                                doubleFishRight(first_fish, second_fish, leftimage);
                                                            }, 1);
                                                        },
                                                    }
                                                );
                                            }, 5000)
                                        },
                                    }
                                );
                            },
                        }
                    );
                }, 5000);
            }
        }
    );
};
function doubleFishLeft(first_fish, second_fish, leftimage, rightimage) {   
    var element = document.querySelector(leftimage);
    var stoppoint = element.getBoundingClientRect().right;
    stoppoint = stoppoint + 10 + 'px';
     var element2 = document.querySelector(rightimage);
     var end_point = element2.getBoundingClientRect().left;
     end_point = end_point + 10;

    var first_point = document.querySelector(first_fish);
    first_point = first_point.style.left;
    var first_point2 = document.querySelector(second_fish);
    first_point2 = first_point2.style.left;

    $(first_fish).animate({
            left: stoppoint
    }, 
    {
    duration: 10000,
    easing: "swing",
    complete : function() {
        setTimeout(function() {
            $(first_fish).animate({
                    left: end_point,
                    opacity: "0"  
            }, 
            {
                duration: 10000,
                easing: "linear",
                complete : function() {
                    $(this).css({left: first_point, opacity: "1" });
                    $(second_fish).animate({
                            left: stoppoint
                    }, 
                    {
                        duration: 10000,
                        easing: "swing",
                        complete : function() {
                            setTimeout(function() {

                                        $(second_fish).animate({
                                            left: end_point,
                                            opacity: "0"   
                                        }, 
                                        {
                                            duration: 10000,
                                            easing: "linear",
                                            complete : function() {
                                                $(this).css({left: first_point2, opacity: "1" });
                                                

                                                setTimeout(function() {
                                                doubleFishLeft(first_fish, second_fish, leftimage, rightimage);
                                                }, 1)
                                            },
                                        });

                                 }, 5000)
                        },
                    });
                },
            });

     }, 5000)
    },
    });
};
function fish_1(selector) {
    var verticalBorderWidth = 20,
        border_1_width = $('#border_1').outerWidth(),
        $fish_1 = $('#fish_1'),
        fish_1_width = null,
        stopPoint = null,
        points = null,
        animationDuration = 10000,
        pauseTimeAnimation = 5000,
        easingType = {
        "swing": 'swing',
        "linear": 'linear'
    };

    fish_1_width = $fish_1.outerWidth();
    stopPoint = ((border_1_width - fish_1_width) / 2 - verticalBorderWidth) * -1;
    points = {
        "start": "-100%",
        "stop": stopPoint + 'px',
        "out": fish_1_width + 'px'
    };

    $fish_1.animate({ "right": points.stop }, {
        "duration": animationDuration,
        "easing": easingType.swing,
        "complete": function complete() {
            setTimeout(function () {
                $fish_1.animate({ 'right': points.out }, {
                    "duration": animationDuration,
                    "easing": easingType.linear,
                    "complete": function complete() {
                        $fish_1.css({ 'right': points.start });
                        setTimeout(function () {
                            fish_1(selector);
                        }, 1);
                    }
                });
            }, pauseTimeAnimation);
        }
    });
}
function doubleBigFishLeft(first_fish, second_fish) {
    stoppoint = $(first_fish).width();
    stoppoint = $(window).width()/2 - stoppoint/2 + "px";
    stoppoint2 = $(second_fish).width();
    stoppoint2 = $(window).width()/2 - stoppoint2 / 2 + "px";

    first_point = document.querySelector(first_fish);
    first_point = first_point.style.left;
    first_point2 = document.querySelector(second_fish);
    first_point2 = first_point2.style.left;

    $(first_fish).animate({
            left: stoppoint
    }, 
    {
    duration: 10000,
    easing: "swing",
    complete : function() {
        setTimeout(function() {
            $(first_fish).animate({
                    left: "100%"  
            }, 
            {
                duration: 10000,
                easing: "linear",
                complete : function() {
                    $(this).css({left: first_point });
                    $(second_fish).animate({
                            left: stoppoint2
                    }, 
                    {
                        duration: 10000,
                        easing: "swing",
                        complete : function() {
                            setTimeout(function() {

                                        $(second_fish).animate({
                                                left: "100%"
                                        }, 
                                        {
                                            duration: 10000,
                                            easing: "linear",
                                            complete : function() {
                                                $(this).css({left: first_point2 });
                                                

                                                setTimeout(function() {
                                                doubleBigFishLeft(first_fish, second_fish);
                                                }, 1)
                                            },
                                        });

                                 }, 5000)
                        },
                    });
                },
            });

     }, 5000)
    },
    });
};
function doubleBigFishRight(first_fish, second_fish) {
    stoppoint = $(first_fish).width();
    stoppoint = $(window).width()/2 - stoppoint/2 + "px";
    stoppoint2 = $(second_fish).width();
    stoppoint2 = $(window).width()/2 - stoppoint2 / 2 + "px";
    
    first_point = document.querySelector(first_fish);
    first_point = first_point.style.left;
    first_point2 = document.querySelector(second_fish);
    first_point2 = first_point2.style.left;

    last_point = -document.querySelector(first_fish).width + "px";
    last_point2 = -document.querySelector(second_fish).width + "px";
    $(first_fish).animate({
            left: stoppoint
    }, 
    {
    duration: 10000,
    easing: "swing",
    complete : function() {
        setTimeout(function() {
            $(first_fish).animate({
                    left: last_point
            }, 
            {
                duration: 10000,
                easing: "linear",
                complete : function() {
                    $(this).css({left: first_point});
                    $(second_fish).animate({
                            left: stoppoint2
                    }, 
                    {
                        duration: 10000,
                        easing: "swing",
                        complete : function() {
                            setTimeout(function() {

                                        $(second_fish).animate({
                                                left: last_point2
                                        }, 
                                        {
                                            duration: 10000,
                                            easing: "linear",
                                            complete : function() {
                                                $(this).css({left: first_point2});
                                                

                                                setTimeout(function() {
                                                doubleBigFishRight(first_fish, second_fish);
                                                }, 1)
                                            },
                                        });

                                 }, 5000)
                        },
                    });
                },
            });

     }, 5000)
    },
    });
};
