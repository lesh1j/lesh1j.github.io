'use strict';

$(document).ready(function(){
  
  var windowWidth = $(window).outerWidth();
  
  function initSlider(element, items, itemsLg, itemsMd, itemsSm, margin){
    
    var slider = $(element);

    slider.owlCarousel({
      nav: false,
      dots: false,
      items: items,
      margin: margin,
      responsiveClass:true,
      responsive:{
        0:{
          items:itemsSm,
          nav:false,
          dots: true
        },
        760:{
          items:itemsMd,
          nav:false,
          dots: true
        },
        1000:{
          items:itemsLg,
          nav:false
        },
        1250:{
          items:items,
          nav:false
        }
      }
    });

    slider.on('changed.owl.carousel', function(evt) {

      if(evt.item.index >= evt.item.count - evt.page.size){
        $(this).parent().children('.next')
          .css('opacity', '0')
          .css('visibility', 'hidden');
      }else{
        $(this).parent().children('.next')
          .css('opacity', '1')
          .css('visibility', 'visible');
      }

      if(evt.item.index <= 0){
        $(this).parent().children('.prev')
          .css('opacity', '0')
          .css('visibility', 'hidden');;
      }else{
        $(this).parent().children('.prev')
          .css('opacity', '1')
          .css('visibility', 'visible');
      }

    });

    $(element + '-next').click(function() {
      slider.trigger('next.owl.carousel');
    });

    $(element + '-prev').click(function() {
      slider.trigger('prev.owl.carousel');
    });
    
  }
  
  initSlider('#product-slider-1', 5, 4, 3, 2, 0);
  initSlider('#product-slider-2', 5, 4, 3, 2, 0);
  initSlider('#product-slider-3', 5, 4, 3, 2, 0);
  initSlider('#product-slider-4', 5, 4, 3, 2, 0);
  initSlider('#product-slider-5', 5, 4, 3, 2, 0);
  initSlider('#product-slider-6', 5, 4, 3, 2, 0);
  initSlider('#brands-slider', 8, 6, 5, 3, 0);
  initSlider('#shops-slider', 8, 6, 5, 3, 0);
  
  $('.product__desc').each(function(){
    
    var wrapper = $(this);
    var inner = $(this).children('p');
    var text = inner.text();
    
    while(inner.height() > wrapper.height()){
      
      text = text.substr(0, text.length - 1);
      inner.text(text + ' ...');
      
    }
        
  });
  
  if($(window).outerWidth() >= 1000){
    
    initSlider('#blog-slider', 3, 2, 2, 2, 25);
    
    $(".city-select__list").mCustomScrollbar({
      theme: "inset-2-dark"
    });
    
  }else{
    
    $('#blog-slider').removeClass('owl-carousel');
    
    $('.blog').insertBefore('.brands');
    
  }
  
  $('.city-select').on('click', function(e){
    var elem = $(".city-select__dropdown"); // тут указываем ID элемента
		if (!elem.is(e.target) && elem.has(e.target).length === 0) { // и не по его дочерним элементам
			if($(this).hasClass('open')){
        $('.city-select__dropdown').fadeOut(300, function(){
          $('.city-select').removeClass('open');
        });
      }else{
        $('.city-select__dropdown').fadeIn(300, function(){
          $('.city-select').addClass('open');
        });
      }
		}
  });
  
  $('.city-select__list li').on('click', function(){
    if($(window).outerWidth() >= 1000){
      if($(this).hasClass('active')){
        $('.city-select__dropdown').fadeOut(300, function(){
          $('.city-select').removeClass('open');
        });
      }else{
        $('#city').val($(this).text());
        $('#city-form').submit();
      }
    }else{
      $('.city-select__list li').removeClass('active');
      $(this).addClass('active');
      $('#city').val($(this).text());
    }
  });
  
  $('.city-select__button button').on('click', function(){
    $('#city-form').submit();
  });
  
  $('.city-select__close').on('click', function(){
    $('.city-select__dropdown').fadeOut(300, function(){
      $('.city-select').removeClass('open');
    });
  });
  
  $(document).on('click', function(e){ // событие клика по веб-документу
		var elem = $(".city-select"); // тут указываем ID элемента
		if (!elem.is(e.target) && elem.has(e.target).length === 0) { // и не по его дочерним элементам
      $('.city-select__dropdown').fadeOut(300, function(){
        elem.removeClass('open');
      });
		}
	});
  
  $('.mobmenu__top>ul>li>a').on('click', function(e){
    e.preventDefault();
    var $that = $(this);
    $('.mobmenu__top>ul>li>a').removeClass('active');
    $that.addClass('active');
    if($('.mobmenu__sub.open').length === 0){
      $('#'+$that.data('id')+'')
      .fadeIn(150)
      .addClass('open');
    }else{
      $('.mobmenu__sub.open')
      .removeClass('open')
      .fadeOut(150, function(){
        $('#'+$that.data('id')+'').fadeIn(150).addClass('open');
      });
    }
  });
  
  $('.menu__list>li>a').on('click', function(e){
    if($(window).outerWidth() < 1000){
      e.preventDefault();
      var itemIndex = $(this).parent().index() + 1;
      $('.mobmenu__top>ul>li>a').removeClass('active');
      $('.mobmenu__top>ul>li:nth-child('+itemIndex+')>a').addClass('active');
      $('.mobmenu__back').hide();
      $('.mobmenu__cats').show();
      $('.mobmenu__close').text('x').removeClass('level-2');
      $('.mobmenu__dropdown').css('left', '100%');
      $('.mobmenu__sub.open').hide().removeClass('open');
      $('.mobmenu__sub:nth-child('+itemIndex+')').show().addClass('open');
      $('.mobmenu').fadeIn(300);
    }
  });
  
  $('.mobmenu__sub>li').on('click', function(){
    $('.mobmenu__dropdown').css('left', '100%');
    $(this).children('.mobmenu__dropdown').css('left', '0');
    $('.mobmenu__cats').fadeOut(150, function(){
        $('.mobmenu__back').fadeIn(150);
        $('.mobmenu__close').text('закрыть').addClass('level-2');;
      });
  });
  
  $('.mobmenu__sub>li>a').on('click', function(e){
    e.preventDefault();
  });
  
  $('.mobmenu__back').on('click', function(){
    $('.mobmenu__dropdown').css('left', '100%');
    $('.mobmenu__back').fadeOut(150, function(){
      $('.mobmenu__cats').fadeIn(150);
      $('.mobmenu__close').text('x').removeClass('level-2');;
    });
  });
  
  $('.mobmenu__close').on('click', function(){
    $('.mobmenu').fadeOut(300, function(){
      //$('.mobmenu__back').hide();
      //$('.mobmenu__cats').show();
      //$('.mobmenu__close').text('x').removeClass('level-2');;
      //$('.mobmenu__dropdown').css('left', '100%');
      //$('.mobmenu__sub.open').hide();
      //$('.mobmenu__top>ul>li>a').removeClass('active');
    });
  });
  
  $('.show-menu').on('click', function(){
    $('.mobmenu').fadeIn(300);
  });
  
  $('.show-search').on('click', function(){
    $('.header__search').fadeIn(300);
  });   
  
  $('.header__search-close').on('click', function(){
    $('.header__search').fadeOut(300);
  });
  
  $(window).on('resize', function(){
    
    var windowWidth = $(window).outerWidth();
    
    if(windowWidth >= 1000){
      $('#blog-slider').addClass('owl-carousel');
      initSlider('#blog-slider', 3, 2, 2, 2, 25);
      $(".city-select__list").mCustomScrollbar({
        theme: "inset-2-dark"
      });
      $('.blog').insertBefore('.banner.cosm');
    }else{
      $('#blog-slider').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
      $(".city-select__list").mCustomScrollbar("destroy");
      $('.blog').insertBefore('.brands');
    }
  });
  
});