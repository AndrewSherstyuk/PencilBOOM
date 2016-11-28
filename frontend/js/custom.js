"use strict";

/**
 * PencilBOOM application
 *
 * @module pencilboom
 */
var PENCILBOOM = {};

/**
 * User selectors and values for fish
 * 
 * @typedef {Object} FishConfig
 * @property {Object} $border - Fish 'container'(border) html element
 * @property {Object} $fish - Fish html element
 * @property {Object} $fish_wrapper - Fish html element wrapper element
 * @property {Object} $viewport - Viewport of fish html element
 * @property {String} direction - Fish direction(left/right) for css positioning
 * @property {Number} out_width - Sum of both(left and right) fish frames side 'container'(borders)
 *
 */

/**
 * Animated fishes
 *
 * @class Fish
 * @constructor
 * @namespace PENCILBOOM
 * @param {FishConfig} config - {@link FishConfig} object definition
 * 
 */
PENCILBOOM.Fish = function(config) {
    this.isLeftDirection = config.direction == 'left';

    this.animation_duration = 5000;
    this.pause_time_animation = 5000;
    this.timeout_ids = [];
    this.animation = {
        "start": {},
        "stop": {},
        "out": {}
    };
    this.animation_after_stop_point = null;

    this.direction = config.direction;
    this.animation.stop[config.direction] = (this.isLeftDirection) ? (config.$border.offset().left + config.$border.outerWidth() - config.$fish.outerWidth()) + 'px' : '0%';
    this.animation.out[config.direction] = '100%';
    this.animation.start[config.direction] = '-100%';
    this.fish_width = config.$fish.outerWidth();
    this.padding = (this.isLeftDirection) ? parseInt($(config.$viewport).css('padding-right')) : parseInt($(config.$viewport).css('padding-left'));
    this.out_width = config.out_width;

    this.border_offset = config.$border.offset();

    this.$viewport = config.$viewport;
    this.$border = config.$border;
    this.$fish_wrapper = config.$fish_wrapper;
    this.$fish = config.$fish;
}

/**
 * Calculate/update class properties.
 *
 * @method init
 */
PENCILBOOM.Fish.prototype.init = function() {
    /**
     * Fish behaviour application
     *
     * @module fishbehaviour_
     */
    let FISHBEHAVIOUR_ = {};

    /**
     * Define fish params
     * 
     * @typedef {Object} Config
     * @property {Number} $window_outer_width - Window element outer width
     * @property {Number} border_offset_left - Border element offset left
     * @property {Number} count_of_left_right_sides - It's a count number of left and right sides
     * @property {Number} padding - Get viewport 'extention' from css
     * @property {Number} out_width - Sum of both(left and right) fish frames side 'container'(borders)
     * @property {Object} $border_outerWidth - Border outer width
     *
     */

    /**
     * Fish behaviour mods: left/right
     *
     * @class SideCalculation
     * @constructor
     * @namespace FISHBEHAVIOUR_
     * @param {Config} config - {@link Config} object definition
     * 
     */
    FISHBEHAVIOUR_.SideCalculation = function(config) {
        this.$window_outer_width = config.$window_outer_width;
        this.border_offset_left = config.border_offset_left;
        this.count_of_left_right_sides = config.count_of_left_right_sides;
        this.padding = config.padding;
        this.out_width = config.out_width;
        this.$border_outerWidth = config.$border_outerWidth;
        this.fish_way_one_way = null;
    }

    /**
     * Left methods
     *
     * @typedef {Object} Left
     * @property {Function} fishWayOneWay - {@link fishWayOneWay} method
     * @property {Function} fishWayBothWay - {@link fishWayBothWay} method
     * @property {Function} viewportWidth - {@link viewportWidth} method
     *
     */

    /**
     * Fish behaviour by left side
     * 
     * @method left
     * @return {Object} left - {@link Left} methods
     *
     */
    FISHBEHAVIOUR_.SideCalculation.prototype.left = function() {
        let _this = this;

        return {
            "fish_way_one_way": fishWayOneWay,
            "fish_way_both_way": fishWayBothWay,
            "viewport_width": viewportWidth
        };

        /**
         * Fish way: one way
         *
         * @function fishWayOneWay
         * @return {Number} Sum of border offset left and border width
         *
         */
        function fishWayOneWay() {
            _this.fish_way_one_way = _this.border_offset_left + _this.$border_outerWidth;
            return _this.border_offset_left + _this.$border_outerWidth;
        }

        /**
         * Fish way: left and right ways (both)
         *
         * @function fishWayBothWay
         * @return {Number} In this case one_way and both_way are equals
         *
         */
        function fishWayBothWay() {
            _this.fish_way_both_way = _this.fish_way_one_way;
            return _this.fish_way_one_way;
        }

        /**
         * Calculation view port css width
         *
         * @function viewportWidth
         * @return {String} Multiple both ways on two sides and add padding. Concat calculated value with string
         *
         */
        function viewportWidth() {
            return (_this.fish_way_both_way * _this.count_of_left_right_sides) + _this.padding + 'px';
        }
    }
    FISHBEHAVIOUR_.SideCalculation.prototype.right = function() {
        let _this = this;

        return {
            "fish_way_one_way": fishWayOneWay,
            "fish_way_both_way": fishWayBothWay,
            "viewport_width": viewportWidth
        };

        /**
         * Fish way: left and right ways (both)
         *
         * @function fishWayBothWay
         * @return {Number} Diff btw window width and border offset left
         *
         */
        function fishWayOneWay() {
            _this.fish_way_one_way = _this.$window_outer_width - _this.border_offset_left;
            return _this.$window_outer_width - _this.border_offset_left;
        }

        /**
         * Fish way: left and right ways (both)
         *
         * @function fishWayBothWay
         * @return {Number} In this case one_way and both_way are equals
         *
         */
        function fishWayBothWay() {
            _this.fish_way_both_way = _this.fish_way_one_way * _this.count_of_left_right_sides;
            return _this.fish_way_one_way * _this.count_of_left_right_sides;
        }

        /**
         * Calculation view port css width
         *
         * @function viewportWidth
         * @return {String} Diff btw window width and border offset left, add padding and add two border sides(left and right).
         *
         */
        function viewportWidth() {
            return _this.$window_outer_width - _this.border_offset_left + _this.padding + _this.out_width + 'px';
        }
    }

    let $window_outer_width = $('html').outerWidth()
      , count_of_left_right_sides = 2
      , fish_wrapper_css = {}
      , fish_way_both_way = null
      , fish_way_one_way = null
      , fish_wrapper_css_right_position = 0
      , side_calculation = null
      , side_config = null
      , side = null;

    side_config = {
        "$window_outer_width": $window_outer_width,
        "border_offset_left": this.border_offset.left,
        "count_of_left_right_sides": count_of_left_right_sides,
        "padding": this.padding,
        "out_width": this.out_width,
        "$border_outerWidth": this.$border.outerWidth()
    };
    side = new FISHBEHAVIOUR_.SideCalculation(side_config);
    
    if(this.isLeftDirection) {
        side_calculation = side.left();
        fish_way_one_way = side_calculation.fish_way_one_way();
        fish_way_both_way = side_calculation.fish_way_both_way();

        this.$viewport.css('width', side_calculation.viewport_width());
    } else {
        side_calculation = side.right();
        fish_way_one_way = side_calculation.fish_way_one_way();
        fish_way_both_way = side_calculation.fish_way_both_way();

        this.$viewport.css('width', side_calculation.viewport_width());
    }

    fish_wrapper_css = {
        "top": (this.border_offset.top - this.$border.closest('.full-width').offset().top) + (this.$border.outerHeight() - this.$fish_wrapper.height()) / count_of_left_right_sides + 'px',
        "right": fish_wrapper_css_right_position,
        "width": fish_way_both_way + this.padding + 'px'
    };
    this.$fish_wrapper.css(fish_wrapper_css);
};

/**
 * Run fish animation.
 *
 * @method runAnimate
 */
PENCILBOOM.Fish.prototype.runAnimate = function() {
    this.$fish.animate(
        this.animation.stop,
        {
            "duration": this.animation_duration,
            "easing": 'linear',
            "complete": () => {
                this.timeout_ids.push(setTimeout(() => {
                    this.$fish.animate(
                        this.animation.out,
                        {
                            "duration": this.animation_duration,
                            "easing": 'linear',
                            "complete": () => {
                                this.$fish.css( this.animation.start );
                                this.timeout_ids.push(setTimeout(() => {
                                    this.runAnimate();
                                }, 1));
                            },
                        }
                    );
                }, this.pause_time_animation));
            }
        }
    );
};

PENCILBOOM.Fish.prototype.watch = function() {
    /**
     * AT THIS moment DIDN'T use.
     * Fishes float separately.
     * This method apply to setTimeout clear event
     *
     * @event runAnimate animate complete
     * @event runAnimate animate complete complite
     * @param {String} css_class - css class name
     *
     * @return {Void}
     */
    /* TODO: Im not sure about 'right' is the config.direction */
    // config.$fish.watch('right', function() {
    let Fish_this = this;
    Fish_this.$fish.watch(Fish_this.direction, function() {
        // if((parseInt($(this).css('right')) >= (parseInt(fish_width) + padding)) && animation_after_stop_point) {
        if((parseInt($(this).css(Fish_this.direction)) >= (parseInt(Fish_this.fish_width) + Fish_this.padding)) && Fish_this.animation_after_stop_point) {
            let timeout_ids_length = Fish_this.timeout_ids.length;

            Fish_this.animation_after_stop_point = false;
            Fish_this.$fish.finish();
            
            for(let i = 0; i < timeout_ids_length; i++) {
                clearTimeout(Fish_this.timeout_ids[i]);
            }

            Fish_this.timeout_ids = [];
            Fish_this.runAnimate();
        }
        
        // if(parseInt($(this).css('right')) >= parseInt(stop[config.direction])) {
        if(parseInt($(this).css(Fish_this.direction)) >= parseInt(stop[Fish_this.direction])) {
            Fish_this.animation_after_stop_point = true;
        }
    });
};

PENCILBOOM.menu = function() {};

/**
 * Check scroll position and compare it with header height.
 *
 * @method isScrollBelowTitle
 */
PENCILBOOM.menu.prototype.isScrollBelowTitle = function() {
    let $nav = $('nav')
    , activeClass = 'is-scroll-below-title';

    (window.scrollY > 75) ? $nav.addClass(activeClass) : $nav.removeClass(activeClass);
};

(() => {
    "use strict";
    $(document).ready(() => {
        var $a_color_box = $('a.colorbox')
        , $exhibitions = $('.exhibitions')
        , $fixed_items = $('.fixed-items')
        , $gifts = $('.gifts')
        , $hamburger = $('.hamburger')
        , $hamburger_wrapper = $('.hamburger-wrapper')
        , $languages = $('.languages')
        , $nav = $('nav')
        , $static_items = $('.static-items')
        , a_color_box_config = {
            "maxHeight": "90%",
            "maxWidth": "90%",
            "rel": "colorbox",
            "retinaImage": true
        }
        , block_1_fish_1_Config = {
            "name": 'fish1',
            "$border": $('#block_1_border_1'),
            "$fish": $('#fish_block_1_1'),
            "$fish_wrapper": $('#fish_block_1_1_wrapper'),
            "$viewport": $('#fish_block_1_1-viewport'),
            "direction": 'left',
            "out_width": 0
        }
        , block_1_fish_2_Config = {
            "$border": $('#block_1_border_2'),
            "$fish": $('#fish_block_1_2'),
            "$fish_wrapper": $('#fish_block_1_2_wrapper'),
            "$viewport": $('#fish_block_1_2-viewport'),
            "direction": 'right',
            "out_width": 0
        }
        , block_2_fish_1_Config = {
            "$border": $('#block_2_border_1'),
            "$fish": $('#fish_block_2_1'),
            "$fish_wrapper": $('#fish_block_2_1_wrapper'),
            "$viewport": $('#fish_block_2_1-viewport'),
            "direction": 'right',
            "out_width": 0
        }
        /* HOW TO INIT the NEW FISH: step 5 */
        , block_2_fish_2_Config = {
            "$border": $('#block_2_border_2'),
            "$fish": $('#fish_block_2_2'),
            "$fish_wrapper": $('#fish_block_2_2_wrapper'),
            "$viewport": $('#fish_block_2_2-viewport'),
            "direction": 'left',
            "out_width": 0
        }
        /* HOW TO INIT the NEW FISH: step 5 */
        , block_2_fish_3_Config = {
            "$border": $('#block_2_border_3'),
            "$fish": $('#fish_block_2_3'),
            "$fish_wrapper": $('#fish_block_2_3_wrapper'),
            "$viewport": $('#fish_block_2_3-viewport'),
            "direction": 'right',
            "out_width": 0
        }
        , block_3_fish_1_Config = {
            "$border": $('#block_3_border_1'),
            "$fish": $('#fish_block_3_1'),
            "$fish_wrapper": $('#fish_block_3_1_wrapper'),
            "$viewport": $('#fish_block_3_1-viewport'),
            "direction": 'right',
            "out_width": 0
        }
        , block_3_fish_2_Config = {
            "$border": $('#block_3_border_2'),
            "$fish": $('#fish_block_3_2'),
            "$fish_wrapper": $('#fish_block_3_2_wrapper'),
            "$viewport": $('#fish_block_3_2-viewport'),
            "direction": 'left',
            "out_width": 0
        }
        , block_3_fish_3_Config = {
            "$border": $('#block_3_border_3'),
            "$fish": $('#fish_block_3_3'),
            "$fish_wrapper": $('#fish_block_3_3_wrapper'),
            "$viewport": $('#fish_block_3_3-viewport'),
            "direction": 'right',
            "out_width": 0
        }
        , block_4_fish_1_Config = {
            "$border": $('#block_4_border_1'),
            "$fish": $('#fish_block_4_1'),
            "$fish_wrapper": $('#fish_block_4_1_wrapper'),
            "$viewport": $('#fish_block_4_1-viewport'),
            "direction": 'right',
            "out_width": 0
        }
        , block_4_fish_2_Config = {
            "$border": $('#block_4_border_2'),
            "$fish": $('#fish_block_4_2'),
            "$fish_wrapper": $('#fish_block_4_2_wrapper'),
            "$viewport": $('#fish_block_4_2-viewport'),
            "direction": 'left',
            "out_width": 0
        }
        , choosen_config = {
            "disable_search": true,
            "selectors": ['#filter-genre', '#filter-age', '#filter-gifts']
        }
        , gold_fish_config = {
            "$border": $('#border_1'),
            "$fish": $('#fish_1'),
            "$fish_wrapper": $('#fish_1_wrapper'),
            "$viewport": $('#fish_1-viewport'),
            "direction": 'right',
            "out_width": -80
        }
        , style_classes = {
            "exhibitions": "m-exebitions-hover",
            "gifts": "m-gifts-hover",
            "hamburger": {
                "click": "open",
                "hover": "m-hamberger-hover"
            },
            "nav": "is-scroll-below-title"
        }
        , $languages_items = null;

        $languages_items = $languages.find('li');
        $a_color_box.colorbox(a_color_box_config);
        $(choosen_config.selectors.toString()).chosen(choosen_config);
        $nav.css('height', `calc(${$(window).outerHeight()}px - 106px)`);

        let gold_fish = new PENCILBOOM.Fish(gold_fish_config);
        gold_fish.init();
        gold_fish.runAnimate();

        let fish_block_1_fish_1 = new PENCILBOOM.Fish(block_1_fish_1_Config);
        fish_block_1_fish_1.init();
        fish_block_1_fish_1.runAnimate();
        
        let fish_block_1_fish_2 = new PENCILBOOM.Fish(block_1_fish_2_Config);
        fish_block_1_fish_2.init();
        fish_block_1_fish_2.runAnimate();

        let fish_block_2_fish_1 = new PENCILBOOM.Fish(block_2_fish_1_Config);
        fish_block_2_fish_1.init();
        fish_block_2_fish_1.runAnimate();

        /* HOW TO INIT the NEW FISH: step 6 */
        let fish_block_2_fish_2 = new PENCILBOOM.Fish(block_2_fish_2_Config);
        fish_block_2_fish_2.init();
        fish_block_2_fish_2.runAnimate();
        /* HOW TO INIT the NEW FISH: step 6 */

        let fish_block_2_fish_3 = new PENCILBOOM.Fish(block_2_fish_3_Config);
        fish_block_2_fish_3.init();
        fish_block_2_fish_3.runAnimate();

        let fish_block_3_fish_1 = new PENCILBOOM.Fish(block_3_fish_1_Config);
        fish_block_3_fish_1.init();
        fish_block_3_fish_1.runAnimate();

        let fish_block_3_fish_2 = new PENCILBOOM.Fish(block_3_fish_2_Config);
        fish_block_3_fish_2.init();
        fish_block_3_fish_2.runAnimate();

        let fish_block_3_fish_3 = new PENCILBOOM.Fish(block_3_fish_3_Config);
        fish_block_3_fish_3.init();
        fish_block_3_fish_3.runAnimate();

        let fish_block_4_fish_1 = new PENCILBOOM.Fish(block_4_fish_1_Config);
        fish_block_4_fish_1.init();
        fish_block_4_fish_1.runAnimate();

        let fish_block_4_fish_2 = new PENCILBOOM.Fish(block_4_fish_2_Config);
        fish_block_4_fish_2.init();
        fish_block_4_fish_2.runAnimate();

        let menu = new PENCILBOOM.menu();

        /* events */
        $hamburger_wrapper.hover(
            () => { $fixed_items.addClass(style_classes.hamburger.hover); }
            , () => { $fixed_items.removeClass(style_classes.hamburger.hover); }
        );
        $exhibitions.hover(
            () => { $static_items.addClass(style_classes.exhibitions); }
            , () => { $static_items.removeClass(style_classes.exhibitions); }
        );
        $gifts.hover(
            () => { $static_items.addClass(style_classes.gifts); }
            , () => { $static_items.removeClass(style_classes.gifts); }
        );

        $fixed_items.on('click', () => {
            menu.isScrollBelowTitle();
            $hamburger.toggleClass(style_classes.hamburger.click);
            $nav.toggleClass(style_classes.hamburger.click);
        });
        $gifts.on('click', () => { location.href = 'contests.html'; });
        $languages_items.on('click', (e) => {
            $languages_items.removeClass('active');
            $(e.target).addClass('active');
        });

        /**
         * Menu styles can change, depend from scroll position.
         *
         * @event windowScroll
         * @fires isScrollBelowTitle
         */
        $(window).scroll(() => {
            menu.isScrollBelowTitle();
        });
    });
})();
