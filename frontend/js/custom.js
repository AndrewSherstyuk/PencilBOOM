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
        $("#filter-genre, #filter-age, #filter-gifts").chosen(choosenConfig);
    });
})();
