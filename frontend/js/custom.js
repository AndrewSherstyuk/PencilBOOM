"use strict";

(() => {
    $(document).ready(() => {
        var $fixedItems = $('.fixed-items')
        , $hamburger = $('.hamburger')
        , $hamburgerSpan = $('.hamburger span')
        , $exhibitions = $('.exhibitions')
        , $nav = $('nav')
        , $staticItems = $('.static-items')
        , $gifts = $('.gifts')
        , styleClasses = {
            "hamburger": {
                "hover": "m-hamberger-hover",
                "click": "open"
            },
            "exhibitions": "m-exebitions-hover",
            "gifts": "m-gifts-hover"
        }
        , choosenConfig = {
            "disable_search": true
        }
        , $fish_1_wrapper = $('#fish_1_wrapper')
        , $border_1 = $("#border_1")
        , $border_1_offset = null
        , $windowOuterWidth = $(window).outerWidth()
        , $fish_1_wrapperCss = null;

        $border_1_offset = $border_1.offset();
        $fish_1_wrapperCss = {
            "top": $border_1_offset.top + ($border_1.outerHeight() - $fish_1_wrapper.height()) / 2 + 'px',
            "left": $windowOuterWidth - $border_1_offset.left + 16 + 'px',
            "width": $windowOuterWidth - $border_1_offset.left + 'px'
        };

        $nav.css('height', `calc(${$(window).outerHeight()}px - 106px)`);
        $hamburger.on('click', () => {
            $hamburger.toggleClass(styleClasses.hamburger.click);
            $nav.toggleClass(styleClasses.hamburger.click);
        });
        $hamburger.hover(
            () => { $fixedItems.addClass(styleClasses.hamburger.hover); }
            , () => { $fixedItems.removeClass(styleClasses.hamburger.hover); }
        );
        $exhibitions.hover(
            () => { $staticItems.addClass(styleClasses.exhibitions); }
            , () => { $staticItems.removeClass(styleClasses.exhibitions); }
        );
        $gifts.hover(
            () => { $staticItems.addClass(styleClasses.gifts); }
            , () => { $staticItems.removeClass(styleClasses.gifts); }
        );

        $('#filter-genre, #filter-age, #filter-gifts')
            .chosen(choosenConfig)
            .on('change', function(evt, params) {
                $('#filter-genre').chosen('chosen:hiding_dropdown');
            });
        // $("#filter-genre li, #filter-age li, #filter-gifts li").trigger('chosen:close');

        $fish_1_wrapper.css($fish_1_wrapperCss);
        fish_1("#fish_1_wrapper");
    });

    function fish_1(selector) {
        var verticalBorderWidth = 20
        , border_1_width = $('#border_1').outerWidth()
        , $fish_1 = $('#fish_1')
        , fish_1_width = null
        , stopPoint = null
        , points = null
        , animationDuration = 10000
        , pauseTimeAnimation = 5000
        , easingType = {
            "swing": 'swing',
            "linear": 'linear'
        };

        fish_1_width = $fish_1.outerWidth();
        stopPoint = ((border_1_width - fish_1_width) / 2  - verticalBorderWidth) * -1;
        points = {
            "start": "-100%",
            "stop": stopPoint + 'px',
            "out": fish_1_width + 'px'
        };

        $fish_1.animate(
            { "right": points.stop },
            {
                "duration": animationDuration,
                "easing": easingType.swing,
                "complete": function() {
                    setTimeout(function() {
                        $fish_1.animate(
                            { 'right': points.out },
                            {
                                "duration": animationDuration,
                                "easing": easingType.linear,
                                "complete": function() {
                                    $fish_1.css( {'right': points.start } );
                                    setTimeout(function() {
                                        goldfish(selector);
                                    }, 1);
                                },
                            }
                        );
                    }, pauseTimeAnimation);
                }
            }
        );
    }
})();
