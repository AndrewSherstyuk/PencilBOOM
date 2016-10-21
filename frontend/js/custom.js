"use strict";

(() => {
    $(document).ready(() => {
        /* define */
        var $fixedItems = $('.fixed-items')
        , $hamburger = $('.hamburger')
        , $hamburgerSpan = $('.hamburger span')
        , $exhibitions = $('.exhibitions')
        , $nav = $('nav')
        , $staticItems = $('.static-items')
        , $gifts = $('.gifts')
        , $languages = $('.languages')
        , $hamburgerWrapper = $('.hamburger-wrapper')
        , $aColorBox = $('a.colorbox')
        , $windowOuterWidth = $(window).outerWidth()
        , $languagesItems = null
        , $fish_1_wrapperCss = null
        , styleClasses = {
            "hamburger": {
                "hover": "m-hamberger-hover",
                "click": "open"
            },
            "exhibitions": "m-exebitions-hover",
            "gifts": "m-gifts-hover",
            "nav": "isScrollBelowTitle"
        }
        , choosenConfig = { "disable_search": true }
        , aColorBoxConfig = {
            "maxWidth": "90%",
            "maxHeight": "90%",
            "rel": "colorbox",
            "retinaImage": true
        }
        , goldFishConfig = {
            "$border": $('#border_1'),
            "$fish": $('#fish_1'),
            "$fish_wrapper": $('#fish_1_wrapper'),
            "$viewport": $('#fish_1-viewport'),
            "direction": 'right',
            "verticalBorderWidth": 25,
            "additionalMargin": 16,
            "outWidth": 0
        }
        , block_1_fish_2_Config = {
            "$border": $('#block_1_border_2'),
            "$fish": $('#fish_block_1_2'),
            "$fish_wrapper": $('#fish_block_1_2_wrapper'),
            "$viewport": $('#fish_block_1_2-viewport'),
            "direction": 'right',
            "verticalBorderWidth": 0,
            "additionalMargin": -25,
            "outWidth": 126
        };

        $languagesItems = $languages.find('li');
        $aColorBox.colorbox(aColorBoxConfig);
        $('#filter-genre, #filter-age, #filter-gifts').chosen(choosenConfig);
        $nav.css('height', `calc(${$(window).outerHeight()}px - 106px)`);

        fish(goldFishConfig);
        fish(block_1_fish_2_Config);

        /* events */
        $hamburgerWrapper.hover(
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

        $fixedItems.on('click', () => {
            isScrollBelowTitle(styleClasses.nav);
            $hamburger.toggleClass(styleClasses.hamburger.click);
            $nav.toggleClass(styleClasses.hamburger.click);
        });
        $gifts.on('click', () => { location.href = 'contests.html'; });
        $languagesItems.on('click', (e) => {
            $languagesItems.removeClass('active');
            $(e.target).addClass('active');
        });

        $(window).scroll(() => { isScrollBelowTitle(styleClasses.nav); });
    });

    function fish(config) {
        config.verticalBorderWidth = config.verticalBorderWidth || 0;

        /* define size and position of viewport(border) */
        let border_offset = config.$border.offset()
          , border_width = config.$border.outerWidth()
          , both_borders = config.verticalBorderWidth * 2
          , padding = parseInt($(config.$viewport).css('padding-left'));

        let fish_wrapperCss = {
            "top": (border_offset.top - config.$border.closest('.full-width').offset().top) + (config.$border.outerHeight() - config.$fish_wrapper.height()) / 2 + 'px',
            "right": 0,
            "width": ($(window).outerWidth() - border_offset.left - both_borders - padding + config.outWidth) * 2 + 'px'
        };
        $(config.$viewport).css('width', parseInt(fish_wrapperCss.width) / 2 + padding + 'px')
        config.$fish_wrapper.css(fish_wrapperCss);

        /* define fish behaviour */
        let fish_width = config.$fish.outerWidth()
        , animationDuration = 5000
        , pauseTimeAnimation = 5000
        , stop = {}
        , out = {}
        , start = {};

        let stopPointDisagreement = border_width - fish_width;
        let isStopPointDisagreementPossitive = stopPointDisagreement > 0;
        stop[config.direction] = (config.outWidth) ? config.outWidth * -1 : '0%';
        // stop[config.direction] = ((stopPointDisagreement / 2 - both_borders) * -1 + ((isStopPointDisagreementPossitive) ? 0 : config.additionalMargin)) + 'px';debugger;
        out[config.direction] = '100%';
        start[config.direction] = '-100%';

        runAnimate(config);

        function runAnimate(config) {
            config.$fish.animate(
                stop,
                {
                    "duration": animationDuration,
                    "easing": 'swing',
                    "complete": () => {
                        setTimeout(() => {
                            config.$fish.animate(
                                out,
                                {
                                    "duration": animationDuration,
                                    "easing": 'linear',
                                    "complete": () => {
                                        config.$fish.css( start );
                                        setTimeout(() => {
                                            runAnimate(config);
                                        }, 1);
                                    },
                                }
                            );
                        }, pauseTimeAnimation);
                    }
                }
            );
        }
    }
    function isScrollBelowTitle(cssClass) {
        (window.scrollY > 75) ? $('nav').addClass(cssClass) : $('nav').removeClass(cssClass);
    }
})();
