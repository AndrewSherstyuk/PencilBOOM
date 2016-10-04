"use strict";

(() => {
    $(document).ready(() => {
        var $fixedItems = $('.fixed-items')
        , $hamburger = $('.hamburger')
        , $hamburgerSpan = $('.hamburger span')
        , $exhibitions = $('.exhibitions')
        , $nav = $('nav')
        , $staticItems = $('.static-items')
        , $gifts = $('.gifts');

        $nav.css('height', `calc(${$(window).outerHeight()}px - 106px)`);
        $hamburger.on('click', () => {
            $hamburger.toggleClass('open');
            $nav.toggleClass('open');
        });
        $hamburger.hover(
            () => { $fixedItems.addClass('m-hamberger-hover'); }
            , () => { $fixedItems.removeClass('m-hamberger-hover'); }
        );
        $exhibitions.hover(
            () => { $nav.addClass('m-exebitions-hover'); }
            , () => { $nav.removeClass('m-exebitions-hover'); }
        );
        $gifts.hover(
            () => { $staticItems.addClass('m-gifts-hover'); }
            , () => { $staticItems.removeClass('m-gifts-hover'); }
        );
    });
})();
