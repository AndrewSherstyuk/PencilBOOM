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
            $aColorBox = $('a.colorbox'),
            aColorBoxConfig = {
                "maxWidth": "90%",
                "maxHeight": "90%",
                "rel": "colorbox",
                "retinaImage": true
            },
            headerHoverClasses = {
                "hamburger": "m-hamberger-hover",
                "exhibitions": "m-exebitions-hover",
                "gifts": "m-gifts-hover"
            };

        $hamburger.hover(
            function () { $fixedItems.addClass(headerHoverClasses.hamburger); }
            , function () { $fixedItems.removeClass(headerHoverClasses.hamburger); }
        );

        $exhibitions.hover(
            function () { $nav.addClass(headerHoverClasses.exhibitions); }
            , function () { $nav.removeClass(headerHoverClasses.exhibitions); }
        );

        $gifts.hover(
            function () { $staticItems.addClass(headerHoverClasses.gifts); }
            , function () { $staticItems.removeClass(headerHoverClasses.gifts); }
        );

        $aColorBox.colorbox(aColorBoxConfig);
    });
})();

window.onload=function() {
    doubleFishLeft("#fish_1", "#fish_1_1", "#grid_img-7", "#grid_img-13");
    doubleFishRight("#fish_2", "#fish_2_2", "#grid_img-6");
    doubleFishRight("#fish_3", "#fish_3_3", "#grid_img-19");
    doubleFishLeft("#fish_4", "#fish_4_4", "#grid_img-21", "#grid_img-22");
    doubleFishRight("#fish_5", "#fish_5_5", "#grid_img-29");
    doubleFishRight("#fish_6", "#fish_6_6", "#grid_img-45");
    doubleFishLeft("#fish_7", "#fish_7_7", "#grid_img-47", "#grid_img-53");
    doubleFishRight("#fish_8", "#fish_8_8", "#grid_img-63");
    doubleFishRight("#fish_9", "#fish_9_9", "#grid_img-38");
    doubleFishLeft("#fish_10", "#fish_10_10", "#grid_img-66", "#grid_img-68");
    goldfish("#border_goldfish");
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
function goldfish(stopPoint) {
    // element = document.querySelector(stopPoint);
    // var stoppoint = element.getBoundingClientRect().left;
    // stoppoint = stoppoint + 50 + 'px';
    $("#goldfish").animate({
        left: '55px'
    }, 
    {
    duration: 10000,
    easing: "swing",
    complete : function() {
         
            setTimeout(function() {

                    $("#goldfish").animate({
                                left: "100%"
                        }, 
                        {
                            duration: 10000,
                            easing: "linear",
                            complete : function() {
                                $(this).css({left: -352 });
                                

                                setTimeout(function() {
                                goldfish(stopPoint);
                            }, 1)
                            },
                        });

             }, 5000)
    },
    });
};
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
function fish_move(to, persent, to2, value) {

    $("#fish_1").animate({
            to: persent
    }, 
    {
    duration: 9000,
    easing: "swing",
    complete : function() {
         
            setTimeout(function() {

                    $("#fish_1").animate({
                                left: "100%"
                        }, 
                        {
                            duration: 5000,
                            easing: "linear",
                            complete : function() {
                                $(this).css({to2: value });
                                

                                setTimeout(function() {
                                fish_1();
                            }, 1)
                            },
                        });

             }, 5000)
    },
    });
};
