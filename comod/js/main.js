/*“use strict” mode on*/
"use strict";

$(window).on('load', function () {
	
	/*=== Progress bar done ====*/
	
	NProgress.done();
	
	
	/*=== Pre loader fade ====*/
	
	setTimeout(function() { 
		
		$('#preloader-image').fadeOut(100);
		
		$("#preloader").animate(
			{ right: '25%' }, 
			500
		);
		$("#preloader").fadeOut(500);
	
	}, 200)
	
	/*=== Rihgt items height ====*/
	
	setTimeout(function() { 
	
		var windowHeight = $('#main-content').height();
		var rightItemNumber = $('.right-item').length;
		$('.city').height(windowHeight + 'px');
		$('.right-item').height(windowHeight/rightItemNumber + 'px');
		
		/*=== Stellar.js parallax plugin init ====*/
		$.stellar({
			horizontalScrolling: false,
			verticalOffset: 0,
		});
		
	}, 300)
		
		
	/*=== Isotope & masonry portfolio init ====*/		
	var $grid = $('#portf-items').isotope({
		itemSelector: '.portf-item',
		masonry: {
			columnWidth: '.portf-item'
	   }
	});
	
	/*=== Bind isotope filter button click ====*/		
	$('#portf-filter').on( 'click', 'a', function() {
		var filterValue = $( this ).attr('data-filter');

		$grid.isotope({ filter: filterValue });
		
		$('#portf-filter a').removeClass('active');
		$( this ).addClass('active');
		
		return false;
		
	});
	
	/*=== Masonsy blog init ====*/	
	
	$('#blog-items').isotope({
		itemSelector: '.blog-item',
		masonry: {
			columnWidth: '.blog-item'
	   }
	});
	
});

/*=== WOW plugin init ====*/
new WOW().init();

(function ($) {
	
	/*=== BUTTON TO TOP ====*/
	
	$(window).on('scroll', function () {
		
		if($(this).scrollTop() > 200){
			$('#totop').fadeIn(400);
		}else{ 
			$('#totop').fadeOut(400);
		}
		
	});
	
	$('#totop').on('click', function () { 
		$('body, html').animate({
			scrollTop: 0
		}, 1400);
	});

	
	
	/*=== BUTTON ANIMATE AT SCROLL ====*/

	if($('*').is('.my-button')) {
	
		$('.my-button').on('scrollSpy:enter', function() {
			
			$(this).children(".my-button-border-top").css('left', '0');	
			$(this).children(".my-button-border-right").css('top', '0');						
			$(this).children(".my-button-border-bottom").css('right', '0');
			$(this).children(".my-button-border-left").css('bottom', '0');
			$(this).children(".my-button-text").css('opacity', '1');
									
		});

		$('.my-button').on('scrollSpy:exit', function() {
			
			$(this).children(".my-button-border-top").css('left', '-100%');
			$(this).children(".my-button-border-right").css('top', '-100%');
			$(this).children(".my-button-border-bottom").css('right', '-100%');
			$(this).children(".my-button-border-left").css('bottom', '-100%')
			$(this).children(".my-button-text").css('opacity', '0');
			
		});
		
		$('.my-button').scrollSpy();
	
	}
	
	
	$(window).on('resize', function() {
			
		
		/*=== Rihgt items height at resize ====*/
		
		setTimeout(function() { 
			
			var windowHeight = $('#main-content').height();
			var rightItemNumber = $('.right-item').length;
			$('.right-item').height(windowHeight/rightItemNumber + 'px');
			
			/*=== Stellar.js parallax plugin init ====*/
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 0,
			});
			
		}, 300)
	
	});
	
	/*=== Page loader config ====*/
	
	NProgress.configure({ 
		showSpinner: false,
		ease: 'ease', 
		speed: 200,
		parent: '.pageloader',
		trickleRate: 0.1,
		trickleSpeed: 200
	});
	
	/*=== Page loader start ====*/
	
	NProgress.start();
	
	/*=== show login form button ====*/
	
	$('#showlogin, #showlogin1').on('click', function() {
		
		$("#login").fadeIn(500);
		
		$("#login").animate(
			{ right: '0' }, 
			500
		);
		
		return false;
		
	});
	
	/*=== close login form button ====*/
	
	$('#closelogin').on('click', function() {
		
		$("#login").animate(
			{ right: '25%' }, 
			500
		);
		$("#login").fadeOut(500);
		
		return false;
		
	});
	
	/*=== Text rotate plugin ====*/
	
	$("#js-rotating, #js-rotating-1").Morphext({
		animation: "fadeIn",
		separator: ",",
		speed: 7000
	});
	
	/*=== Right items overlay ====*/
	
	$(".right-item").on({
		mouseenter: function () {
			$(this).children(".right-item-overlay").stop(true);
			$(this).children(".right-item-overlay").animate(
			{ height: '100%' }, 
			200, 
			function(){
				$(this).children("div").css('border', '1px solid #f7fafb');
				$(this).animate(
					{ padding: '20px' }, 
					200,
					function(){
						$(this).children().children().children('a').css('display', 'inline-block');		
						$(this).children().children().children('a').css('visibility', 'visible');
						$(this).children().children().children('a').addClass('animated');						
					} 
				);					
			} 
		);
		},
		mouseleave: function () {
			$(this).children(".right-item-overlay").stop(true);
			$(this).children().children().children().children('a').css('display', 'none');
			$(this).children().children().children().children('a').css('visibility', 'hidden');
			$(this).children(".right-item-overlay").animate(
			{ padding: '0' }, 
			200, 
			function(){
				$(this).children("div").css('border', 'none');
				$(this).animate(
					{ height: '60px' }, 
					200 
				);
									
			} 
		);
		}
	});
	
	/*=== Portfolio items overlay ====*/
	
	$(".portf-item").on({
		mouseenter: function () {
			$(this).children(".portf-item-overlay").stop(true);
			$(this).children(".portf-item-overlay").animate(
			{ height: '100%' }, 
			200, 
			function(){
				$(this).children("div").css('border', '1px solid #bfcace');
				$(this).animate(
					{ padding: '20px' }, 
					200,
					function(){
						$(this).children().children().children('a').css('display', 'inline-block');		
						$(this).children().children().children('a').css('visibility', 'visible');
						$(this).children().children().children('a').addClass('animated');						
					} 
				);					
			} 
		);
		},
		mouseleave: function () {
			$(this).children(".portf-item-overlay").stop(true);
			$(this).children().children().children().children('a').css('display', 'none');
			$(this).children().children().children().children('a').css('visibility', 'hidden');
			$(this).children(".portf-item-overlay").animate(
			{ padding: '0' }, 
			200, 
			function(){
				$(this).children("div").css('border', 'none');
				$(this).animate(
					{ height: '0' }, 
					200 
				);
									
			} 
		);
		}
	});
	
	/*=== Team items overlay ====*/
	
	$(".team-item").on({
		mouseenter: function () {
			$(this).children(".team-item-overlay").stop(true);
			$(this).children(".team-item-overlay").animate(
			{ height: '100%' }, 
			200, 
			function(){
				$(this).children("div").css('border', '1px solid #bfcace');
				$(this).animate(
					{ padding: '20px' }, 
					200,
					function(){
						$(this).children().children().children('a').css('display', 'inline-block');		
						$(this).children().children().children('a').css('visibility', 'visible');
						$(this).children().children().children('a').addClass('animated');						
					} 
				);					
			} 
		);
		},
		mouseleave: function () {
			$(this).children(".team-item-overlay").stop(true);
			$(this).children().children().children().children('a').css('display', 'none');
			$(this).children().children().children().children('a').css('visibility', 'hidden');
			$(this).children(".team-item-overlay").animate(
			{ padding: '0' }, 
			200, 
			function(){
				$(this).children("div").css('border', 'none');
				$(this).animate(
					{ height: '55px' }, 
					200 
				);
									
			} 
		);
		}
	});
	
	/*=== Left slide meny accordeon ====*/
	
	$('#left-menu').metisMenu({
		toggle: false // disable the auto collapse. Default: true.
	});
	
	/*=== Close left slide menu ====*/
	
	$('#close-menu, #black-overlay').on('click', function() {
		
		$("#slide-menu").css('left', '-290px');
		$("#left-bar").css('left', '0');
		$("#black-overlay").css('opacity', '0');
		setTimeout(function() { 	
			$("#black-overlay").css('display', 'none');
		}, 300)
		
		return false;
		
	});
	
	/*=== Show left slide menu ====*/
	
	$('#show-menu, #show-menu-2').on('click', function() {
		
		$("#slide-menu").css('left', '0');
		$("#left-bar").css('left', '290px');
		$("#black-overlay").css('display', 'block');
		$("#black-overlay").css('opacity', '1');
		
		return false;
		
	});
	
	
	/*=== Owl carusel plugin for projects init ====*/
	
	var owl = $("#owl-project");
		owl.owlCarousel({
		items: 1, //1 items above 1000px browser width
        itemsDesktop: [1000, 1], //1 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1], //1 items between 600 and 0
		pagination: false,
	});
	
	// Custom Navigation Events
	$('#next-photo').on('click', function(){
		owl.trigger('owl.next');
		return false;
	});
	$('#prev-photo').on('click', function(){
		owl.trigger('owl.prev');
		return false;
	});
	
	/*=== Owl carusel plugin for blog init ====*/
	var owl1 = $("#owl-blog");
		owl1.owlCarousel({
		items: 1, //1 items above 1000px browser width
        itemsDesktop: [1000, 1], //1 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1], //1 items between 600 and 0
		pagination: false,
	});
	
	// Custom Navigation Events
	$('#next-blog-photo').on('click', function(){
		owl1.trigger('owl.next');
		return false;
	});
	$('#prev-blog-photo').on('click', function(){
		owl1.trigger('owl.prev');
		return false;
	});
	
	/*=== Owl carusel plugin for reviews init ====*/
	var owl2 = $("#owl-review");
		owl2.owlCarousel({
		items: 1, //1 items above 1000px browser width
        itemsDesktop: [1000, 1], //1 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1], //1 items between 600 and 0
		pagination: false,
	});
	
	// Custom Navigation Events
	$('#next-review').on('click', function(){
		owl2.trigger('owl.next');
		return false;
	});
	$('#prev-review').on('click', function(){
		owl2.trigger('owl.prev');
		return false;
	});
	
	/*=== Owl carusel plugin for work 1 init ====*/
	var owl3 = $("#owl-creative-portf-1");
	owl3.owlCarousel({
		items: 1, //1 items above 1000px browser width
        itemsDesktop: [1000, 1], //1 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1], //1 items between 600 and 0
		pagination: false,
	});
	
	// Custom Navigation Events
	$('#portf-creative-next-1').on('click', function(){
		owl3.trigger('owl.next');
		return false;
	});
	$('#portf-creative-prev-1').on('click', function(){
		owl3.trigger('owl.prev');
		return false;
	});
	
	/*=== Owl carusel plugin for work 2 init ====*/
	var owl4 = $("#owl-creative-portf-2");
	owl4.owlCarousel({
		items: 1, //1 items above 1000px browser width
        itemsDesktop: [1000, 1], //1 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1], //1 items between 600 and 0
		pagination: false,
	});
	
	// Custom Navigation Events
	$('#portf-creative-next-2').on('click', function(){
		owl4.trigger('owl.next');
		return false;
	});
	$('#portf-creative-prev-2').on('click', function(){
		owl4.trigger('owl.prev');
		return false;
	});
	
	/*=== Owl carusel plugin for work 3 init ====*/
	var owl5 = $("#owl-creative-portf-3");
	owl5.owlCarousel({
		items: 1, //1 items above 1000px browser width
        itemsDesktop: [1000, 1], //1 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1], //1 items between 600 and 0
		pagination: false,
	});
	
	// Custom Navigation Events
	$('#portf-creative-next-3').on('click', function(){
		owl5.trigger('owl.next');
		return false;
	});
	$('#portf-creative-prev-3').on('click', function(){
		owl5.trigger('owl.prev');
		return false;
	});
	
	
	/*=== Owl carusel plugin for work 4 init ====*/
	var owl6 = $("#owl-creative-portf-4");
	owl6.owlCarousel({
		items: 1, //1 items above 1000px browser width
        itemsDesktop: [1000, 1], //1 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1], //1 items between 600 and 0
		pagination: false,
	});
	
	// Custom Navigation Events
	$('#portf-creative-next-4').on('click', function(){
		owl6.trigger('owl.next');
		return false;
	});
	$('#portf-creative-prev-4').on('click', function(){
		owl6.trigger('owl.prev');
		return false;
	});
	
	/*=== Owl carusel plugin for work 5 init ====*/
	var owl7 = $("#owl-creative-portf-5");
	owl7.owlCarousel({
		items: 1, //1 items above 1000px browser width
        itemsDesktop: [1000, 1], //1 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1], //1 items between 600 and 0
		pagination: false,
	});
	
	// Custom Navigation Events
	$('#portf-creative-next-5').on('click', function(){
		owl7.trigger('owl.next');
		return false;
	});
	$('#portf-creative-prev-5').on('click', function(){
		owl7.trigger('owl.prev');
		return false;
	});
	
})(jQuery);

/*=== Chart init ====*/



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
    tooltipFontFamily: "Montserrat",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "Montserrat",

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
			fillColor : "rgba(101,196,221,0.8)",
			strokeColor : "rgba(101,196,221,1)",
			pointColor : "rgba(101,196,221,1)",
			pointStrokeColor : "rgba(101,196,221,1)",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(220,220,220,1)",
			data : [10,5,3,9,2,4,10]
		},
		{
			label: "Second dataset",
			fillColor : "rgba(108,204,161,0.8)",
			strokeColor : "rgba(108,204,161,1)",
			pointColor : "rgba(108,204,161,1)",
			pointStrokeColor : "rgba(108,204,161,1)",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(151,187,205,1)",
			data : [2,3,8,6,7,9,1]
		},
		{
			label: "Third dataset",
			fillColor : "rgba(253, 140, 128,0.8)",
			strokeColor : "rgba(253, 140, 128,1)",
			pointColor : "rgba(253, 140, 128,1)",
			pointStrokeColor : "rgba(253, 140, 128,1)",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(151,187,205,1)",
			data : [5,8,2,4,3,10,7]
		}
	]

}

window.onload = function(){
	if($('*').is('#canvaschart')) {
		var ctx = document.getElementById("canvaschart").getContext("2d");
		var windowWidth = $(window).width();
		if(windowWidth > 1200){		
			ctx.canvas.width = 868;
			ctx.canvas.height = 240;
		}else if(windowWidth < 1200 && windowWidth >= 768){		
			ctx.canvas.width = 712;
			ctx.canvas.height = 210;
		}else if(windowWidth < 768 && windowWidth >= 488){		
			ctx.canvas.width = 458;
			ctx.canvas.height = 200;
		}else{
			ctx.canvas.width = 330;
			ctx.canvas.height = 160;
		}
		window.myLine = new Chart(ctx).Line(lineChartData, {
			//responsive: true,
			maintainAspectRatio: true,
			//Boolean - Whether the line is curved between points
			bezierCurve : false,
			//Number - Radius of each point dot in pixels
			pointDotRadius : 0,
			//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			pointHitDetectionRadius : 60
		});
	}
		
	if($('*').is('#canvaschart-2')) {
		var ctx = document.getElementById("canvaschart-2").getContext("2d");
		var windowWidth = $(window).width();
		if(windowWidth > 1310){		
			ctx.canvas.width = 868;
			ctx.canvas.height = 240;
		}else if(windowWidth < 1310 && windowWidth >= 1200){		
			ctx.canvas.width = 799;
			ctx.canvas.height = 230;
		}else if(windowWidth < 1200 && windowWidth >= 768){		
			ctx.canvas.width = 712;
			ctx.canvas.height = 210;
		}else if(windowWidth < 768 && windowWidth >= 488){		
			ctx.canvas.width = 458;
			ctx.canvas.height = 200;
		}else{
			ctx.canvas.width = 330;
			ctx.canvas.height = 160;
		}
		window.myLine = new Chart(ctx).Line(lineChartData, {
			//responsive: true,
			maintainAspectRatio: true,
			//Boolean - Whether the line is curved between points
			bezierCurve : false,
			//Number - Radius of each point dot in pixels
			pointDotRadius : 0,
			//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			pointHitDetectionRadius : 60
		});
	}
		
}