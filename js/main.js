/* global alert */

$(document).ready(function () {
  //dropdown-menu header
  $(".dropdown-menu > .dropdown > a").addClass("dropdown-toggle");

  $(".dropdown-menu a.dropdown-toggle").on("click", function (e) {
    if (!$(this).next().hasClass("show")) {
      $(this)
        .parents(".dropdown-menu")
        .first()
        .find(".show")
        .removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass("show");
    $(this)
      .parents("li.nav-item.dropdown.show")
      .on("hidden.bs.dropdown", function (e) {
        $(".dropdown-menu > .dropdown .show").removeClass("show");
      });
    return false;
  });

  $(".commission-carousel").owlCarousel({
    rtl: true,
    margin: 30,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 8,
      },
    },
  });
  $(".hero-carousel").owlCarousel({
    rtl: true,
    margin: 30,
    nav: true,
    loop: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
  //counter
  $(".counter").counterUp({
    time: 2900,
  });

  // YouTube/Viemo Video & Gmaps

  $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false,
  });

  //filter-drop-down
  $(".nav-sidebar ul:has(li)").addClass("sub-menu");

  $(".dropmenu").on("click", function () {
    $(this).toggleClass("openmenu"); // arrow rotate
    $(this).next(".sub-menu").slideToggle(200);
    $(this)
      .parent()
      .siblings()
      .children()
      .removeClass("openmenu")
      .next()
      .slideUp();
    return false;
  });
 


  

});
