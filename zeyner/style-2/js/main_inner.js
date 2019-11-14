/*“use strict” mode on*/
"use strict";

$(window).on('load', function () {
	
	/*=== Pre loader slide up ====*/
	$('#preloader').slideUp();
	
	/*=== Stellar.js parallax plugin init ====*/
	$.stellar();
	
	$(window).on('resize', function () {
	
		/*=== Stellar.js parallax plugin init at resize window ====*/
		$.stellar();
	});
	
	
	initialize();

});

/*=== WOW plugin init ====*/
new WOW().init();

(function ($) {

	
	var right_menu = $('#right-menu');
	
	$('#showmenu').on('click', function(){
		right_menu.css('right', '0px');
		
		return false;
	});
	
	$('#hidemenu').on('click', function(){
		right_menu.css('right', '-300px');
		
		return false;
	});
		
	/*===Smooth scrolling at right and animate mouse image menu click ====*/
	$('.navbar a').on('click', function(){
      $("html, body").animate({
         scrollTop: $($(this).attr("href")).offset().top + "px"
      }, {
         duration: 1000,
         easing: "swing"
      });
      return false;
	});
	
	
	/*=== Owl carusel plugin for image gallery on blog and portfolio pages init ====*/
	var owlGallery = $("#owl-gallery");
		owlGallery.owlCarousel({
		items: 1, //1 items above 1000px browser width
        itemsDesktop: [1000, 1], //1 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1], //1 items between 600 and 0
		pagination: false
	});
 	 
	// Custom Navigation Events
	$('#next-gallery').on('click', function(){
		owlGallery.trigger('owl.next');
		
		return false;
	});
	$('#prev-gallery').on('click', function(){
		owlGallery.trigger('owl.prev');
		
		return false;
	});
	
	
})(jQuery);

/*=== Send message bottom contact form ====*/
function sendmail() {
	var fields = $('#bottom-form').serialize();
	$.ajax({
		type: 'POST',
		url: 'sendmail.php',
		data: fields,
		success: function(data) {
			$('.send-result').html(data);
		}
	});
}