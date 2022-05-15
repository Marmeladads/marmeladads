(function ($) {
    // default settings
    var defaultSettings = {
        // DESKTOP MODE SETTINGS
        logo_align: 'left',
        links_align: 'left',
        socialBar_align: 'left',
        searchBar_align: 'right',
        trigger: 'hover',
        effect: 'fade',
        effect_speed: 400,
        sibling: true,
        outside_click_close: true,
        top_fixed: false,
        sticky_header: false,
        sticky_header_height: 100,
        menu_position: 'horizontal',
        full_width: true,
        mobile_settings: {
            collapse: false,
            sibling: true,
            scrollBar: true,
            scrollBar_height: 400,
            top_fixed: true,
            sticky_header: false,
            sticky_header_height: 200
        }
    };
    $.fn.megaMenu = function (settings) {
        settings = $.extend({}, defaultSettings, settings || {});
        return this.each(function () {

            // variables
            var $this = $(this),
                $ul = 'ul',
                $li = 'li',
                $a = 'a',
                menu_logo = $this.find('.menu-logo'),
                menu_logo_li = menu_logo.children($li),
                menu_links = $this.find('.menu-links'),
                menu_links_li = menu_links.children($li),
                menu_socialBar = $this.find('.menu-social-bar'),
                menu_searchBar = $this.find('.menu-search-bar'),
                mobile_trigger_button = '.menu-mobile-collapse-trigger',
                mobile_dropDown_trigger = '.mobileTriggerButton',
                desktop_dropDown_trigger = '.desktopTriggerButton',
                activeClass = 'active',
                activeTrigger = 'activeTrigger',
                activeTriggerMobile = 'activeTriggerMobile',
                dropDown = '.drop-down-multilevel, .drop-down, .drop-down-tab-bar',
                desktopTopFixed = 'desktopTopFixed',
                mobileTopFixed = 'mobileTopFixed',
                fullWidth = 'menuFullWidth',
                Canvas;

            Canvas = {
                menu_full_width: function () {
                    // check if the full_width options true
                    if (settings.full_width === true) {
                        // add class menu full width
                        $this.addClass(fullWidth);
                    }
                },
                logo_Align: function () {

                    if (settings.logo_align === 'right') {
                        menu_logo.addClass('menu-logo-align-right');
                    }
                },
                links_Align: function () {

                    if (settings.links_align === 'right') {
                        menu_links.addClass('menu-links-align-right');
                    }
                },
                social_bar_Align: function () {
                    if (settings.socialBar_align === 'right') {
                        menu_socialBar.addClass('menu-social-bar-right');
                    }
                },
                search_bar_Align: function () {
                    if (settings.searchBar_align === 'left') {
                        menu_searchBar.addClass('menu-search-bar-left');
                    }
                },
                collapse_trigger_button: function () {
                    if (settings.mobile_settings.collapse === true) {
                        menu_logo_li.append('<div class="menu-mobile-collapse-trigger">' +
                            '<span></span>' +
                            '</div>');
                        var drop_down = menu_links.add(menu_socialBar);
                        drop_down.hide(0);
                        menu_searchBar.addClass(activeClass);
                        $this.find(mobile_trigger_button).on('click', function () {
                            if (drop_down.is(':hidden')) {
                                $(this).addClass(activeClass);
                                drop_down.show(0);
                            } else {
                                $(this).removeClass(activeClass);
                                drop_down.hide(0);
                            }
                            return false;
                        });
                    }
                },
                switch_effects: function () {
                    switch (settings.effect) {
                        case 'fade':
                            $this.find(dropDown).addClass('effect-fade');
                            break;
                        case 'scale':
                            $this.find(dropDown).addClass('effect-scale');
                            break;
                        case 'expand-top':
                            $this.find(dropDown).addClass('effect-expand-top');
                            break;
                        case 'expand-bottom':
                            $this.find(dropDown).addClass('effect-expand-bottom');
                            break;
                        case 'expand-left':
                            $this.find(dropDown).addClass('effect-expand-left');
                            break;
                        case 'expand-right':
                            $this.find(dropDown).addClass('effect-expand-right');
                            break;
                    }
                },
                transition_delay: function () {
                    $this.find(dropDown).css({
                        'webkitTransition': 'all ' + settings.effect_speed + 'ms ease ',
                        'transition': 'all ' + settings.effect_speed + 'ms ease '
                    });
                },
                hover_trigger: function () {
                    if (settings.trigger === 'hover') {
                        Canvas.transition_delay();
                        $this.find(dropDown).parents($li).addClass('hoverTrigger');
                        Canvas.switch_effects();
                    }
                },
                mobile_trigger: function () {
                    $this.find(dropDown).prev($a).append('<div class="mobileTriggerButton"></div>');
                    $this.find(mobile_dropDown_trigger).on('click', function () {
                        var elem = $(this),
                            parents = elem.parents($a),
                            drop_down = parents.next(dropDown);
                        if (drop_down.is(':hidden')) {
                            if (settings.mobile_settings.sibling === true) {
                                elem.parents($this).siblings($ul + ',' + $li).find(dropDown).hide(0);
                                elem.parents($this).siblings($li).removeClass(activeTriggerMobile);
                                elem.parents($this).siblings($ul).find($li).removeClass(activeTriggerMobile);
                            }
                            parents.parent($li).addClass(activeTriggerMobile);
                            drop_down.show(0);
                        } else {
                            parents.parent($li).removeClass(activeTriggerMobile);
                            drop_down.hide(0);
                        }
                        return false;
                    });
                    $this.find('i.fa.fa-indicator').on('click', function () {
                        return false;
                    });
                },
                click_trigger: function () {
                    if (settings.trigger === 'click') {
                        $this.find(dropDown).prev($a).append('<div class="desktopTriggerButton"></div>');
                        $this.find(dropDown).parents($li).addClass('ClickTrigger');
                        Canvas.switch_effects();
                        Canvas.transition_delay();
                        $this.find(desktop_dropDown_trigger).on('click', function (event) {
                            event.stopPropagation();
                            event.stopImmediatePropagation();
                            var elem = $(this),
                                parents = elem.parents($a),
                                drop_down = parents.next(dropDown);
                            if (!(drop_down.hasClass(activeClass))) {
                                if (settings.sibling === true) {
                                    elem.parents($this).siblings($ul + ',' + $li).find(dropDown).removeClass(activeClass);
                                    elem.parents($this).siblings($li).removeClass(activeTrigger);
                                    elem.parents($this).siblings($ul).find($li).removeClass(activeTrigger);
                                }
                                parents.parent($li).addClass(activeTrigger);
                                drop_down.addClass(activeClass);
                            } else {
                                parents.parent($li).removeClass(activeTrigger);
                                drop_down.removeClass(activeClass);
                            }
                        });
                    }
                },
                scroll_bar: function () {
                    if (settings.mobile_settings.scrollBar === true) {
                        menu_links.css({
                            'maxHeight': settings.mobile_settings.scrollBar_height + 'px',
                            'overflow': 'auto'
                        });
                    }
                },
                top_Fixed: function () {
                    if (settings.top_fixed === true) {
                        $this.addClass(desktopTopFixed);
                    }
                    if (settings.mobile_settings.top_fixed) {
                        $this.addClass(mobileTopFixed);
                    }
                },
                sticky_Header: function () {
                    var $window = $(window),
                        scrollFlag = true,
                        scrollFlagMobile = true;
                    if (!($this.find(dropDown).is(':hidden'))) {
                        $window.off('scroll');
                        if (settings.sticky_header === true
                            && settings.menu_position === 'horizontal'
                            && settings.top_fixed === false) {
                            $window.on('scroll', function () {
                                if ($window.scrollTop() > settings.sticky_header_height) {
                                    if (scrollFlag === true) {
                                        $this.fadeOut(200, function () {
                                            $(this).addClass(desktopTopFixed).fadeIn(200);
                                        });
                                        scrollFlag = false;
                                    }
                                } else {
                                    if (scrollFlag === false) {
                                        $this.fadeOut(200, function () {
                                            $(this).removeClass(desktopTopFixed).fadeIn(200);
                                        });
                                        scrollFlag = true;
                                    }
                                }
                            });
                        }
                    } else {
                        $window.off('scroll');
                        if (settings.mobile_settings.sticky_header === true
                            && settings.top_fixed === false) {
                            $window.on('scroll', function () {
                                if ($window.scrollTop() > settings.mobile_settings.sticky_header_height) {
                                    if (scrollFlagMobile === true) {
                                        $this.addClass(mobileTopFixed);
                                        scrollFlagMobile = false;
                                    }
                                } else {
                                    if (scrollFlagMobile === false) {
                                        $this.removeClass(mobileTopFixed);
                                        scrollFlagMobile = true;
                                    }
                                }
                            });
                        }
                    }
                },
                position: function () {
                    if (settings.menu_position === 'vertical-left') {
                        $this.addClass('vertical-left');
                    } else if (settings.menu_position === 'vertical-right') {
                        $this.addClass('vertical-right');
                    }
                }
            };
            Canvas.menu_full_width();
            Canvas.logo_Align();
            Canvas.links_Align();
            Canvas.social_bar_Align();
            Canvas.search_bar_Align();
            Canvas.collapse_trigger_button();
            Canvas.hover_trigger();
            Canvas.mobile_trigger();
            Canvas.click_trigger();
            Canvas.scroll_bar();
            Canvas.top_Fixed();
            Canvas.sticky_Header();
            Canvas.position();
            $(window).resize(function () {
                Canvas.sticky_Header();
            });
        });
    };
}(jQuery));
