"use strict";

(() => {
    $(document).ready(() => {
        //menu hover
        var $fixedItems = $('.fixed-items')
        , $hamburger = $('.hamburger')
        , $hamburgerSpan = $('.hamburger span')
        , $exhibitions = $('.exhibitions')
        , $nav = $('nav')
        , $staticItems = $('.static-items')
        , $gifts = $('.gifts');

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
