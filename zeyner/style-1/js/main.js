/*“use strict” mode on*/
"use strict";

$(window).on('load', function () {
	
	/*=== Pre loader slide up ====*/
	$('#preloader').slideUp();
	
	/*=== Stellar.js parallax plugin init ====*/
	$.stellar();
	
	var feature_1_left_bg = $('#feature1-left-bg');
	var feature_2_left_bg = $('#feature2-left-bg');
	var feature_3_left_bg = $('#feature3-left-bg');
	var feature_4_left_bg = $('#feature4-left-bg');
	
	var feature_1 = $("#feature1");
	var feature_2 = $("#feature2");
	var feature_3 = $("#feature3");
	var feature_4 = $("#feature4");
	
	/*=== Border width resize for features sections ====*/
	feature_1_left_bg.css('border-top-width', feature_1.innerHeight() + 'px');
	feature_1.css('height', feature_1.innerHeight() + 1 + 'px'); // for firefox inner height fixed
	feature_2_left_bg.css('border-bottom-width', feature_2.innerHeight() + 'px');
	feature_2.css('height', feature_2.innerHeight() + 1 + 'px'); // for firefox inner height fixed
	feature_3_left_bg.css('border-top-width', feature_3.innerHeight() + 'px');
	feature_3.css('height', feature_3.innerHeight() + 1 + 'px'); // for firefox inner height fixed
	feature_4_left_bg.css('border-bottom-width', feature_4.innerHeight() + 'px');
	feature_4.css('height', feature_4.innerHeight() + 'px'); // for firefox inner height fixed
	
	$(window).on('resize', function () {
		
		/*=== Border width resize for features sections at resize window ====*/	
		feature_1.css('height', '');
		feature_1_left_bg.css('border-top-width', feature_1.innerHeight() + 'px');
		feature_2.css('height', '');
		feature_2_left_bg.css('border-bottom-width', feature_2.innerHeight() + 'px');
		feature_3.css('height', '');
		feature_3_left_bg.css('border-top-width', feature_3.innerHeight() + 'px');
		feature_4.css('height', '');
		feature_4_left_bg.css('border-bottom-width', feature_4.innerHeight() + 'px');
		
		/*=== Stellar.js parallax plugin init at resize window ====*/
		$.stellar();
	});
	
	/*=== Isotope portfolio init ====*/		
	var $grid = $('#portfolio-items').isotope({
		itemSelector: '.portfolio-item',
		layoutMode: 'fitRows'
	});
	
	/*=== Bind isotope filter button click ====*/		
	$('#filter').on( 'click', 'a', function() {
		var filterValue = $( this ).attr('data-filter');

		$grid.isotope({ filter: filterValue });
		
		$('#filter a').removeClass('active');
		$( this ).addClass('active');
		
		return false;
		
	});
	
});

/*=== WOW plugin init ====*/
new WOW().init();

(function ($) {
	
	/*=== Full screen header ====*/
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var headerContentHeight = $('#header-content').height();	
	
	/*=== Header content centering for screen height > 640px  ====*/
	
	var home = $('#home');
	var header_left_bg = $('#header-left-bg');
	var header_right_bg = $('#header-right-bg');
	var header_content = $('#header-content');
	var main_logo = $('#main-logo');
	
	if(windowWidth > 595){
		if(windowHeight > 640){
			home.css('height', windowHeight + 'px');
			header_left_bg.css('border-bottom-width', windowHeight + 'px');
			header_right_bg.css('height', windowHeight + 'px');
			header_content.css('padding-top', (windowHeight - headerContentHeight)/2 - 8 + 'px');
			main_logo.css('padding-top', (windowHeight - headerContentHeight)/2 + 6 + 'px');
		}else{
			home.css('height', '760px');
			header_left_bg.css('border-bottom-width', '760px');
			header_right_bg.css('height', '760px');
			header_content.css('padding-top', '80px');
			main_logo.css('padding-top', '94px');
		}
	}else{
		home.css('height', 'auto');
		header_content.css('padding', '60px 0');
	}
		
	/*=== Full screen header and header content centering at resize window ====*/
	$(window).on('resize', function () {
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		var headerContentHeight = $('#header-content').height();
		
		if(windowWidth > 595){
			if(windowHeight > 640){
				home.css('height', windowHeight + 'px');
				header_left_bg.css('border-bottom-width', windowHeight + 'px');
				header_right_bg.css('height', windowHeight + 'px');
				header_content.css('padding-top', (windowHeight - headerContentHeight)/2 - 8 + 'px');
				main_logo.css('padding-top', (windowHeight - headerContentHeight)/2 + 6 + 'px');
			}else{
				home.css('height', '760px');
				header_left_bg.css('border-bottom-width', '760px');
				header_right_bg.css('height', '760px');
				header_content.css('padding-top', '80px');
				main_logo.css('padding-top', '94px');
			}
		}else{
			home.css('height', 'auto');
			header_content.css('padding', '60px 0');
		}

	});
	
	/*=== Top menu slide in on scroll ====*/
	
	var top_navbar = $('#top-navbar');
	
	$(window).on('scroll', function(){
		
		if($(window).scrollTop() >= windowHeight){
			top_navbar.css('top', '0');
		}else{
			top_navbar.css('top', '-120px');
		}
		
	});
	
	/*===Show and hide right slide menu ====*/
	
	var right_menu = $('#right-menu');
	
	$('#showmenu').on('click', function(){
		right_menu.css('right', '0px');
		
		return false;
	});
	
	$('#hidemenu').on('click', function(){
		right_menu.css('right', '-300px');
		
		return false;
	});
	
	/*===Number animation in we did section on scroll ====*/
	$('#wedids').on('scrollSpy:enter', function() {
		
		$('#num1').animate({ num: 242 - 3 }, {
				duration: 4000,
				step: function (num){
					this.innerHTML = (num + 3).toFixed(0)
				}
			});
			$('#num2').animate({ num: 177 - 3 }, {
				duration: 4300,
				step: function (num){
					this.innerHTML = (num + 3).toFixed(0)
				}
			});
			$('#num3').animate({ num: 734 - 3 }, {
				duration: 4600,
				step: function (num){
					this.innerHTML = (num + 3).toFixed(0)
				}
			});
			$('#num4').animate({ num: 933 - 3 }, {
				duration: 4900,
				step: function (num){
					this.innerHTML = (num + 3).toFixed(0)
				}
			});
		
	});
	$('#wedids').scrollSpy();

	
	/*===Smooth scrolling at right and animate mouse image menu click ====*/
	$('.navbar a, #header-content a').on('click', function(){
      $("html, body").animate({
         scrollTop: $($(this).attr("href")).offset().top + "px"
      }, {
         duration: 1000,
         easing: "swing"
      });
	  
      return false;
	});
	
	
	/*=== Play and pause video section ====*/
	var video =  document.getElementById('videosection');
	
	var play_video = $('#play-video');
	var stop_video = $('#stop-video');
	
	play_video.on('click', function(){
		  video.play();
		  play_video.css('display', 'none');
		  stop_video.css('display', 'block');
		  
		  return false;
	});
	
	stop_video.on('click', function(){
		  video.pause();
		  stop_video.css('display', 'none');
		  play_video.css('display', 'block');
		  
		  return false;
	});
	
	/*=== Owl carusel plugin for reviews init ====*/
	var owl = $("#owl-rev");
		owl.owlCarousel({
		items: 1, //1 items above 1000px browser width
        itemsDesktop: [1000, 1], //1 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1], //1 items between 600 and 0
	});
	
	// Custom Navigation Events
	$('#next-review').on('click', function(){
		owl.trigger('owl.next');
		
		return false;
	});
	$('#prev-review').on('click', function(){
		owl.trigger('owl.prev');
		
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

/*=== Chart configurations ====*/
Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: false,

    // Boolean - If we should show the scale at all
    showScale: false,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(0,0,0,0.8)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Raleway'",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Raleway'",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "normal",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 10,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 10,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 0,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value %>",

}

var randomScalingFactor = function(){ return Math.round(Math.random()*10)};

var lineChartData = {
	labels : ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
	datasets : [
		{
			label: "First dataset",
			fillColor : "rgba(52,152,219,0.8)",
			strokeColor : "rgba(52,152,219,1)",
			pointColor : "rgba(52,152,219,1)",
			pointStrokeColor : "rgba(52,152,219,1)",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(220,220,220,1)",
			data : [10,5,3,9,2,4,10]
		},
		{
			label: "Second dataset",
			fillColor : "rgba(22,166,182,0.8)",
			strokeColor : "rgba(22,166,182,1)",
			pointColor : "rgba(22,166,182,1)",
			pointStrokeColor : "rgba(22,166,182,1)",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(151,187,205,1)",
			data : [2,3,7,6,7,9,1]
		},
		{
			label: "Third dataset",
			fillColor : "rgba(238, 101, 87,0.8)",
			strokeColor : "rgba(238, 101, 87,1)",
			pointColor : "rgba(238, 101, 87,1)",
			pointStrokeColor : "rgba(238, 101, 87,1)",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(151,187,205,1)",
			data : [3,8,2,4,3,10,8]
		}
	]

}

window.onload = function(){
	var ctx = document.getElementById("canvaschart").getContext("2d");
	window.myLine = new Chart(ctx).Line(lineChartData, {
		responsive: true,
		//Boolean - Whether the line is curved between points
		bezierCurve : false,
		//Number - Radius of each point dot in pixels
		pointDotRadius : 0,
		//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		pointHitDetectionRadius : 60
	});
	initialize();
}