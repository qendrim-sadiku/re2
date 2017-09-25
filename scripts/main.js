(function ($) {
  'use strict'; // Start of use strict

  // Configure tooltips for collapsed side navigation

  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  });

  // Toggle the side navigation
  $('#sidenavToggler').click(function (e) {
    e.preventDefault();
    $('body').toggleClass('sidenav-toggled');
    $('.navbar-sidenav .nav-link-collapse').addClass('collapsed');
    $('.navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level').removeClass('show');
  });

  // Force the toggled class to be removed when a collapsible nav link is clicked
  $('.navbar-sidenav .nav-link-collapse').click(function (e) {
    e.preventDefault();
    $('body').removeClass('sidenav-toggled');
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function (e) {
    var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });

  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Configure tooltips globally
  $('[data-toggle="tooltip"]').tooltip();

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

  // Slider
  $('#testimonial-slider').owlCarousel({
    items: 1,
    // itemsDesktop:[1000,2],
    // itemsDesktopSmall:[979,2],
    // itemsTablet:[768,2],
    // itemsMobile:[650,1],
    // pagination:false,
    // navigation:true,
    // slideSpeed:1000,
    // autoPlay:true,
    // navigation : true, 
    // slideSpeed : 300,
    // paginationSpeed : 400,
    // singleItem: true,
    // pagination: false,
    // rewindSpeed: 500,
    nav: true,
    slideSpeed: 100,
    paginationSpeed: 800,
    singleItem: true,
    autoPlay: true
  });
})(jQuery); // End of slider

+function ($) {
  'use strict';

  var DataKey = 'lte.controlsidebar';

  var Default = {
    slide: true
  };

  var Selector = {
    sidebar: '.control-sidebar',
    data: '[data-toggle="control-sidebar"]',
    open: '.control-sidebar-open',
    bg: '.control-sidebar-bg',
    wrapper: '.wrapper',
    content: '.content-wrapper',
    boxed: '.layout-boxed'
  };

  var ClassName = {
    open: 'control-sidebar-open',
    fixed: 'fixed'
  };

  var Event = {
    collapsed: 'collapsed.controlsidebar',
    expanded: 'expanded.controlsidebar'

    // ControlSidebar Class Definition
    // ===============================
  };var ControlSidebar = function (element, options) {
    this.element = element;
    this.options = options;
    this.hasBindedResize = false;

    this.init();
  };

  ControlSidebar.prototype.init = function () {
    // Add click listener if the element hasn't been
    // initialized using the data API
    if (!$(this.element).is(Selector.data)) {
      $(this).on('click', this.toggle);
    }

    this.fix();
    $(window).resize(function () {
      this.fix();
    }.bind(this));
  };

  ControlSidebar.prototype.toggle = function (event) {
    if (event) event.preventDefault();

    this.fix();

    if (!$(Selector.sidebar).is(Selector.open) && !$('body').is(Selector.open)) {
      this.expand();
    } else {
      this.collapse();
    }
  };

  ControlSidebar.prototype.expand = function () {
    if (!this.options.slide) {
      $('body').addClass(ClassName.open);
    } else {
      $(Selector.sidebar).addClass(ClassName.open);
    }

    $(this.element).trigger($.Event(Event.expanded));
  };

  ControlSidebar.prototype.collapse = function () {
    $('body, ' + Selector.sidebar).removeClass(ClassName.open);
    $(this.element).trigger($.Event(Event.collapsed));
  };

  ControlSidebar.prototype.fix = function () {
    if ($('body').is(Selector.boxed)) {
      this._fixForBoxed($(Selector.bg));
    }
  };

  // Private

  ControlSidebar.prototype._fixForBoxed = function (bg) {
    bg.css({
      position: 'absolute',
      height: $(Selector.wrapper).height()
    });
  };

  // Plugin Definition
  // =================
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(DataKey);

      if (!data) {
        var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
        $this.data(DataKey, data = new ControlSidebar($this, options));
      }

      if (typeof option == 'string') data.toggle();
    });
  }

  var old = $.fn.controlSidebar;

  $.fn.controlSidebar = Plugin;
  $.fn.controlSidebar.Constructor = ControlSidebar;

  // No Conflict Mode
  // ================
  $.fn.controlSidebar.noConflict = function () {
    $.fn.controlSidebar = old;
    return this;
  };

  // ControlSidebar Data API
  // =======================
  $(document).on('click', Selector.data, function (event) {
    if (event) event.preventDefault();
    Plugin.call($(this), 'toggle');
  });

  // Slideovermenu
  // =======================  
  $(function () {
    $('.main-menu ul').hide();
    $('.nav-toggle').on('click', function () {
      $('.main-menu ul').toggle();
      $('.main-menu').toggleClass('open');
    });
  });

  // Remove
  // =======================  
  $(function () {
    $('.remove-button').on('click', function () {
      $(this).parent().parent().slideToggle();
    });
  });

  $('.checkbox').on('click', function (event) {
    const checkbox = event.target;
    var checked = checkbox.checked;
    if (checked) {
      $(this).parent().css({ 'border-color': '#7b9f47',
        'border-weight': '10px',
        'border-style': 'solid' });
    } else {
      $(this).parent().css({ 'border-color': '',
        'border-weight': '1px',
        'border-style': 'solid' });
    }
  });
}(jQuery);