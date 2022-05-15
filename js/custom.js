var POTENZA = {};

 (function($){
  "use strict";
    var $window = $(window),
        $document = $(document),
        $body = $('body'),
        $countdownTimer = $('.countdown'),
        $progressBar = $('.skill-bar'),
        $counter = $('.counter');


   //Check if function exists
    $.fn.exists = function () {
        return this.length > 0;
    };

  /*************************
       preloader
  *************************/
  POTENZA.preloader = function () {
       $("#load").fadeOut();
       $('#loading').delay(0).fadeOut('slow');
   };

 POTENZA.megaMenu = function () {
    $('#menu').megaMenu({
          logo_align          : 'left',
          links_align         : 'left',
          socialBar_align     : 'left',
          searchBar_align     : 'right',
          trigger             : 'hover',
          effect              : 'fade',
          effect_speed        : 400,
          sibling             : true,
          outside_click_close : true,
          top_fixed           : false,
          sticky_header       : true,
          sticky_header_height: 100,
          menu_position       : 'horizontal',
          full_width          : false,
          mobile_settings     : {
            collapse            : true,
            sibling             : true,
            scrollBar           : true,
            scrollBar_height    : 400,
            top_fixed           : false,
            sticky_header       : false,
            sticky_header_height: 100
         }
       });

}

 POTENZA.carousel = function () {

    $(".owl-carousel").each(function () {
        var $this = $(this),
            $items = ($this.data('items')) ? $this.data('items') : 1,
            $loop = ($this.data('loop')) ? $this.data('loop') : true,
            $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
            $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : false,
            $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : true,
            $space = ($this.attr('data-space')) ? $this.data('space') : 30;
            $(this).owlCarousel({
                loop: $loop,
                items: $items,
                responsive: {
                  0:{items: $this.data('xx-items') ? $this.data('xx-items') : 1},
                  600:{items: $this.data('xs-items') ? $this.data('xs-items') : 1},
                  767:{items: $this.data('sm-items') ? $this.data('sm-items') : 2},
                  992:{items: $this.data('md-items') ? $this.data('md-items') : 2},
                  1190:{items: $this.data('lg-items') ? $this.data('lg-items') : 3},
                  1200:{items: $items}
                },
                dots: $navdots,
                margin:$space,
                nav: $navarrow,
                navText:["<i class='fa fa-angle-left fa-2x'></i>","<i class='fa fa-angle-right fa-2x'></i>"],
                autoplay: $autoplay,
                autoplayHoverPause: true
            });

    });
}

  POTENZA.counters = function () {
          if ($counter.exists()) {
              $counter.each(function () {
                  var $elem = $(this);
                      $elem.appear(function () {
                          $elem.find('.timer').countTo();
                      });
              });
          }
  };

  POTENZA.accordion = function () {
     var   $acpanel = $(".accordion .acd-group > .acd-des"),
           $acsnav = $(".accordion .acd-group > .acd-heading");

          $acpanel.hide().first().slideDown("easeOutExpo");
          $acsnav.first().addClass("acd-active");
          $acsnav.on('click', function () {
              var $this = $(this).next(".acd-des");
              $(this).closest('.accordion').find(".acd-group").removeClass("acd-active");
              $(this).parent().addClass("acd-active");
              $(this).closest('.accordion').find(".acd-des").not($this).slideUp("easeInExpo");
              $(this).next().slideDown("easeOutExpo");
              return false;
        });
  }

 POTENZA.Isotope = function () {
      var $isotope = $(".isotope"),
          $itemElement = '.grid-item',
          $filters = $('.isotope-filters');
        if ($isotope.exists()) {
            $isotope.isotope({
            resizable: true,
            itemSelector: $itemElement,
              masonry: {
                gutterWidth: 10
              }
            });
       $filters.on( 'click', 'button', function() {
         var $val = $(this).attr('data-filter');
             $isotope.isotope({ filter: $val });
             $filters.find('.active').removeClass('active');
             $(this).addClass('active');
      });
    }
 }

  POTENZA.masonry = function () {
        var $masonry = $('.masonry .masonry'),
            $itemElement = '.masonry .masonry-item';
            if ($masonry.exists()) {
                $masonry.isotope({
                  resizable: true,
                  itemSelector: $itemElement,
                  masonry: {
                    gutterWidth: 10
                  }
                });
            }
  }

  POTENZA.mediaPopups = function () {
    if ($(".popup-gallery").exists()) {
          $('.popup-gallery').magnificPopup({
              delegate: 'a.popup-img',
              type: 'image',
              tLoading: 'Loading image #%curr%...',
              mainClass: 'mfp-img-mobile',
              gallery: {
                  enabled: true,
                  navigateByImgClick: true,
                  preload: [0,1] // Will preload 0 - before current, and 1 after the current image
              },
              image: {
                  tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                  titleSrc: function(item) {
                      return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                  }
             }
         });
      }
      if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
           $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
          });
      }
  }


  POTENZA.countdownTimer = function () {
      if ($countdownTimer.exists()) {
            $countdownTimer.downCount({
                date: '01/01/2022 00:00:00',
                offset: 400
            });
      }
  };
 POTENZA.tabs = function () {
       var $tabsdata = $("#tabs li[data-tabs]"),
           $tabscontent = $(".tabcontent"),
           $tabsnav = $(".tabs li");

      $tabsdata.on('click', function () {
        $tabsdata.removeClass('active');
        $tabscontent.hide();
        var tab = $(this).data('tabs');
        $(this).addClass('active');
        $('#' + tab).fadeIn().show();
      });

      $tabsnav.on('click', function () {
          var  cur = $tabsnav.index(this);
          var elm = $('.tabcontent:eq('+cur+')');
          elm.addClass("pulse");
          setTimeout(function() {
                elm.removeClass("pulse");
          }, 220);
      });
      $tabscontent.hide().filter(':first').show();

   }


 POTENZA.sidemenu = function () {
        var $menu_btn = $('.mobile-nav-button'),
            $overlay =  $('.menu-overlay'),
            $menucls =  $('.menu-close'),
            $slidemenu =  $('.side-content');


        $menu_btn.on('click', function () {
           if ($(".search").exists()){
             if ($(".search").hasClass('is-visible')){
                   return false;
             }
           }


            toggleslidemenu();
            return false;
        });

        $overlay.on('click', function () {
            toggleslidemenu('close');
            return false;
        });
        $menucls.on('click', function () {
            toggleslidemenu('close');
            return false;
        });
        function toggleslidemenu(type) {
            if(type=="close") {
                $slidemenu.removeClass('side-content-open');
                $overlay.removeClass('is-visible');
              } else {
                $slidemenu.addClass('side-content-open');
                $overlay.addClass('is-visible');

            }
         }
 }

 POTENZA.search = function () {
    var $search_btn =  $('.search-trigger'),
        $overlay =  $('.search-overlay'),
        $search_area =  $('.search');

       $search_btn.on('click', function () {
            var $type = '';
            ($search_area.hasClass('is-visible')) ? $type = 'close' : $type = '';
            toggleSearch($type);
            return false;
      });

       $search_btn.on('click', function () {
            if ($(".side-content-open").exists()){
            toggleSearch('close');
            return false;
            }

      });

      $overlay.on('click', function () {
          toggleSearch('close');
          return false;
      });

  function toggleSearch(type) {
      if(type=="close") {
          $search_area.removeClass('is-visible');
          $search_btn.removeClass('search-is-visible');
          $overlay.removeClass('is-visible');
          $body.css({"overflow":"visible"});
        } else {
          $search_btn.addClass('search-is-visible');
          $search_area.addClass('is-visible');
          $overlay.addClass('is-visible');
          $search_area.find('input[type="search"]').focus();
          $body.css({"overflow":"hidden"});
      }
   }
  }

    POTENZA.progressBar = function () {

        if ($progressBar.exists()) {

            $progressBar.each(function (i, elem) {
                var $elem = $(this),
                    percent = $elem.attr('data-percent') || "100",
                    delay = $elem.attr('data-delay') || "100",
                    type = $elem.attr('data-type') || "%";

                if (!$elem.hasClass('progress-animated')) {
                    $elem.css({
                        'width': '0%'
                    });
                }

                var progressBarRun = function () {
                    $elem.animate({
                        'width': percent + '%'
                    }, 'easeInOutCirc').addClass('progress-animated');

                    $elem.delay(delay).append('<span class="progress-type animated fadeIn">' + type + '</span><span class="progress-number animated fadeIn">' + percent + '</span>');
                };

                    $(elem).appear(function () {
                        setTimeout(function () {
                            progressBarRun();
                        }, delay);
                    });
            });
        }
    };

  $('.menu-links a[href^="#"]').on('click', function(e) {
  	e.preventDefault();
  	var id = $(this).attr('href'),
  			targetOffset = $(id).offset().top;

  	$('html, body').animate({
  		scrollTop: targetOffset - 140
  	}, 300);
  });


  POTENZA.scrolltotop = function () {
      var $scrolltop = $('.back-to-top');

      $scrolltop.on('click', function () {
          $('html,body').animate({
                    scrollTop: 0
             }, 800);
          $(this).addClass("back-run");
          setTimeout(function(){ $scrolltop.removeClass('back-run');},1000);
          return false;
      });
      $window.on('scroll', function () {
          if($window.scrollTop() >= 1000) {
              $scrolltop.addClass("show");
              $scrolltop.addClass("back-down");
             } else {
               $scrolltop.removeClass("show");
               setTimeout(function(){ $scrolltop.removeClass('back-down');},300);
            }
       });

	   $(".back-to-top img").mouseover(function () {
			$(this).attr('src', $(this).data("hover"));
		}).mouseout(function () {
			$(this).attr('src', $(this).data("src"));
		});
  }

POTENZA.scrolltotop = function () {
    var $scrolltop = $('.contact-down');

    $scrolltop.on('click', function () {
        $('html,body').animate({
                  scrollTop: 9900
           }, 800);
        $(this).addClass("back-run");
        setTimeout(function(){ $scrolltop.removeClass('back-run');},1000);
        return false;
    });
    $window.on('scroll', function () {
        if($window.scrollTop() >= 1000) {
            $scrolltop.addClass("show");
            $scrolltop.addClass("back-down");
           } else {
             $scrolltop.removeClass("show");
             setTimeout(function(){ $scrolltop.removeClass('back-down');},300);
          }
     });
     }

 POTENZA.stickyFooter = function () {
    var  $footerfixed = $("#footer-fixed");
       if ($footerfixed.exists()) {
         var footerheight = $('#footer-fixed').height() + 70;
         document.getElementById("main").style.marginBottom = footerheight + "px";
         }
      };


  POTENZA.slickslider = function () {
      if ($(".slider-slick").exists()) {
          $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            asNavFor: '.slider-nav'
          });
        $('.slider-nav').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: '.slider-for',
          dots: false,
          centerMode: true,
          focusOnSelect: true
        });
      }
  }

POTENZA.Contactform = function () {
  $( "#contactform").submit(function( event ) {
    $("#ajaxloader").show();
    $("#contactform").hide();
    $.ajax({
      url:'php/contact-form.php',
      data:$(this).serialize(),
      type:'post',
      success:function(response){
        $("#ajaxloader").hide();
        $("#contactform").show();
        $("#contactform").find("input, textarea").val("");
        $("#formmessage").html(response).show().delay(2000).fadeOut('slow');
      }
    });
    event.preventDefault();
  });
}

    $window.load(function () {
      POTENZA.preloader(),
      POTENZA.Isotope(),
      POTENZA.progressBar(),

      POTENZA.masonry();
    });

    $document.ready(function () {
        POTENZA.megaMenu(),
        POTENZA.counters(),
        POTENZA.carousel(),
        POTENZA.tabs(),
        POTENZA.accordion(),
        POTENZA.countdownTimer(),
        POTENZA.search(),
        POTENZA.sidemenu(),
        POTENZA.scrolltotop(),
        POTENZA.mediaPopups(),
        POTENZA.stickyFooter(),
        POTENZA.slickslider(),
		POTENZA.Contactform();

    });


})(jQuery);
