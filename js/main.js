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
  
  $('.products__slider').each(function(index){
    var sliderId = '#product-slider-' + (index + 1);
    initSlider(sliderId, 5, 4, 3, 2, 0);
  });
  
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
    
    $("#city-select__list").mCustomScrollbar({
      theme: "inset-2-dark"
    });
    
  }else{
    
    $('#blog-slider').removeClass('owl-carousel');
    
    $('#blog').insertBefore('#brands');
    
  }
  
  $('#city-select').on('click', function(e){
    var elem = $("#city-select__dropdown"); // тут указываем ID элемента
		if (!elem.is(e.target) && elem.has(e.target).length === 0) { // и не по его дочерним элементам
			if($(this).hasClass('open')){
        $('#city-select__dropdown').fadeOut(300, function(){
          $('#city-select').removeClass('open');
        });
      }else{
        $('#city-select__dropdown').fadeIn(300, function(){
          $('#city-select').addClass('open');
        });
      }
		}
  });
  
  $('#city-select__list li').on('click', function(){
    if($(window).outerWidth() >= 1000){
      if($(this).hasClass('active')){
        $('#city-select__dropdown').fadeOut(300, function(){
          $('#city-select').removeClass('open');
        });
      }else{
        $('#city').val($(this).text());
        $('#city-form').submit();
      }
    }else{
      $('#city-select__list li').removeClass('active');
      $(this).addClass('active');
      $('#city').val($(this).text());
    }
  });
  
  $('#city-select__button button').on('click', function(){
    $('#city-form').submit();
  });
  
  $('#city-select__close').on('click', function(){
    $('#city-select__dropdown').fadeOut(300, function(){
      $('#city-select').removeClass('open');
    });
  });
  
  $(document).on('click', function(e){ // событие клика по веб-документу
		var elem = $("#city-select"); // тут указываем ID элемента
		if (!elem.is(e.target) && elem.has(e.target).length === 0) { // и не по его дочерним элементам
      $('#city-select__dropdown').fadeOut(300, function(){
        elem.removeClass('open');
      });
		}
	});
  
  $('#mobmenu__top>ul>li>a').on('click', function(e){
    e.preventDefault();
    var $that = $(this);
    $('#mobmenu__top>ul>li>a').removeClass('active');
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
  
  $('#menu__list>li>a').on('click', function(e){
    if($(window).outerWidth() < 1000){
      e.preventDefault();
      var itemIndex = $(this).parent().index() + 1;
      $('#mobmenu__top>ul>li>a').removeClass('active');
      $('#mobmenu__top>ul>li:nth-child('+itemIndex+')>a').addClass('active');
      $('#mobmenu__back').hide();
      $('#mobmenu__cats').show();
      $('#mobmenu__close').text('x').removeClass('level-2');
      $('.mobmenu__dropdown').css('left', '100%');
      $('.mobmenu__sub.open').hide().removeClass('open');
      $('.mobmenu__sub:nth-child('+itemIndex+')').show().addClass('open');
      $('#mobmenu').fadeIn(300);
    }
  });
  
  $('.mobmenu__sub>li').on('click', function(){
    $('#mobmenu__dropdown').css('left', '100%');
    $(this).children('.mobmenu__dropdown').css('left', '0');
    $('#mobmenu__cats').fadeOut(150, function(){
        $('#mobmenu__back').fadeIn(150);
        $('#mobmenu__close').text('закрыть').addClass('level-2');;
      });
  });
  
  $('.mobmenu__sub>li>a').on('click', function(e){
    e.preventDefault();
  });
  
  $('#mobmenu__back').on('click', function(){
    $('.mobmenu__dropdown').css('left', '100%');
    $('#mobmenu__back').fadeOut(150, function(){
      $('#mobmenu__cats').fadeIn(150);
      $('#mobmenu__close').text('x').removeClass('level-2');;
    });
  });
  
  $('#mobmenu__close').on('click', function(){
    $('#mobmenu').fadeOut(300, function(){
      //$('.mobmenu__back').hide();
      //$('.mobmenu__cats').show();
      //$('.mobmenu__close').text('x').removeClass('level-2');;
      //$('.mobmenu__dropdown').css('left', '100%');
      //$('.mobmenu__sub.open').hide();
      //$('.mobmenu__top>ul>li>a').removeClass('active');
    });
  });
  
  $('#show-menu').on('click', function(){
    $('#mobmenu').fadeIn(300);
  });
  
  $('#show-search').on('click', function(){
    $('#header__search').fadeIn(300);
  });   
  
  $('#header__search-close').on('click', function(){
    $('#header__search').fadeOut(300);
  });
  
  $(window).on('resize', function(){
    
    var windowWidth = $(window).outerWidth();
    
    if(windowWidth >= 1000){
      $('#blog-slider').addClass('owl-carousel');
      initSlider('#blog-slider', 3, 2, 2, 2, 25);
      $("#city-select__list").mCustomScrollbar({
        theme: "inset-2-dark"
      });
      $('#blog').insertBefore('.banner.cosm');
    }else{
      $('#blog-slider').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
      $("#city-select__list").mCustomScrollbar("destroy");
      $('#blog').insertBefore('#brands');
    }
  });
  
  function getCurrentFavs(){
    var currentFavs = Cookies.get('fav_list');
    return currentFavs ? currentFavs.split(',') : [];
  }
  
  function addToFavorite(itemId) {
    var currentFavs = getCurrentFavs();
    var currentIndex = currentFavs.indexOf(itemId.toString());
    if(currentIndex === -1){
      currentFavs.push(itemId);
      Cookies.set('fav_list', currentFavs.join(','));
    }
  }
  
  function removeFromFavorite(itemId) {
    var currentFavs = getCurrentFavs();
    var currentIndex = currentFavs.indexOf(itemId.toString());
    if(currentIndex !== -1){
      currentFavs.splice(currentIndex, 1);
      Cookies.set('fav_list', currentFavs.join(','));
    }
  }
  
  function checkTopFavorites() {
    var currentFavs = getCurrentFavs();
    if(currentFavs.length > 0){
      $('#header__likes').css('color', '#000');
    }else{
      $('#header__likes').css('color', '#c8c8c8');
    }
  }
  
  checkTopFavorites();
    
  var currentFavs = getCurrentFavs();
  
  $('.product').each(function(){
    var currentIndex = currentFavs.indexOf($(this).data('item-id').toString());
    if(currentIndex !== -1){
      $(this).children('.product__like').addClass('active');
    }
  });
  
  $('.product__like').on('click', function(){
    if($(this).hasClass('active')){
      $(this).removeClass('active');
      removeFromFavorite($(this).parent().data('item-id'));
    }else{
      $(this).addClass('active');
      addToFavorite($(this).parent().data('item-id'));
    }
    checkTopFavorites();
  });
  
  function getCurrentLikes(){
    var currentLikes = Cookies.get('likes_list');
    return currentLikes ? currentLikes.split(',') : [];
  }
  
  function sendLike(itemId, elem, action){
    $.ajax({
      method: 'POST',
      url: '/like_blog_item.html',
      data: { id: itemId, action: action }
    })
    .done(function(data) {
      elem.children('span').text(data);
    })
    .fail(function() {
      alert('Произошла ошибка, попробуйте позже.');
    });
  }
  
  function likeBlogItem(itemId, elem) {
    var currentLikes = getCurrentLikes();
    var currentIndex = currentLikes.indexOf(itemId.toString());
    if(currentIndex === -1){
      sendLike(itemId, elem, 'like')
      currentLikes.push(itemId);
      Cookies.set('likes_list', currentLikes.join(','));
    }
  }
  
  function unlikeBlogItem(itemId, elem) {
    var currentLikes = getCurrentLikes();
    var currentIndex = currentLikes.indexOf(itemId.toString());
    if(currentIndex !== -1){
      sendLike(itemId, elem, 'unlike')
      currentLikes.splice(currentIndex, 1);
      Cookies.set('likes_list', currentLikes.join(','));
    }
  }
  
  var currentLikes = getCurrentLikes();
  
  $('.blog-item').each(function(){
    var currentIndex = currentLikes.indexOf($(this).data('item-id').toString());
    if(currentIndex !== -1){
      $(this).children('.blog-item__likes').addClass('active');
    }
  });
  
  $('.blog-item__likes').on('click', function(){
    if($(this).hasClass('active')){
      $(this).removeClass('active');
      unlikeBlogItem($(this).parent().data('item-id'), $(this));
    }else{
      $(this).addClass('active');
      likeBlogItem($(this).parent().data('item-id'), $(this));
    }
  });
  
});