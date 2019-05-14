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
      slideBy: items,
      responsive:{
        0:{
          items:itemsSm,
          slideBy: itemsSm,
          nav:false,
          dots: true
        },
        760:{
          items:itemsMd,
          slideBy: itemsMd,
          nav:false,
          dots: true
        },
        1000:{
          items:itemsLg,
          slideBy: itemsLg,
          nav:false
        },
        1250:{
          items:items,
          slideBy: items,
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
  
  $('#tags').owlCarousel({
      nav: true,
      dots: false,
      items: 1,
      responsiveClass:true
    });
  
    
    var tagsLists = '<ul>';
  
    $('#blog-tags-slider li').each(function(index){
      var tagClass = $(this).hasClass('blog-tags__letter') ? 'blog-tags__letter' : '';
      tagsLists += '<li class="' + tagClass + '">' + $(this).html() + '</li>';

      if(index+1 === $('#blog-tags-slider li').length){
        tagsLists += '</ul>';
        $('#blog-tags-slider').html(tagsLists);
        if($(window).outerWidth() >= 1000){
          $('#blog-tags-slider').addClass('owl-carousel');
          initSlider('#blog-tags-slider', 5, 5, 5, 5, 0);
        }
      }else if((index+1) % 17 === 0){
        tagsLists += '</ul><ul>';
      }
    });
  
  var catsLists = '<ul>';
  
  $('#cats__brands-slider ul li').each(function(index){
      
    catsLists += '<li>' + $(this).html() + '</li>';

    if(index+1 === $('#cats__brands-slider ul li').length){
      catsLists += '</ul>';
      $('#cats__brands-slider').html(catsLists);
      initSlider('#cats__brands-slider', 6, 6, 4, 2, 0);
    }else if((index+1) % 15 === 0){
      catsLists += '</ul><ul>';
    }
  });
  
  var popsLists = '<ul>';
  
  $('#cats__pops-slider ul li').each(function(index){
      
    popsLists += '<li>' + $(this).html() + '</li>';

    if(index+1 === $('#cats__pops-slider ul li').length){
      popsLists += '</ul>';
      $('#cats__pops-slider').html(popsLists);
      initSlider('#cats__pops-slider', 5, 5, 3, 1, 0);
    }else if((index+1) % 15 === 0){
      popsLists += '</ul><ul>';
    }
  });
  
  $('#blog-tags-show').on('click', function(){
    $('#blog-tags, #overlay').fadeIn(300, function(){
      if($(window).outerWidth() >= 1000){
        $("#blog-tags").mCustomScrollbar({
          theme: "inset-2-dark"
        });
      }
    });
  });
  
  $('#blog-tags-close, #blog-tags-mobclose').on('click', function(){
    $('#blog-tags, #overlay').fadeOut(300);
  });
  
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
    
    while(inner.outerHeight() > wrapper.outerHeight()){
      
      text = text.substr(0, text.length - 1);
      if(inner.children('a').length > 0){
        inner.children('a').text(text + ' ...');
      }else{
        inner.text(text + ' ...');
      }
      
    }
        
  });
  
  $('.cat__related-title').each(function(){
    
    if($(this).outerHeight() > 32){
      $(this).css('max-height', '32px').addClass('long');
    }
        
  });
  
  $(".left-filter__links").mCustomScrollbar({
    theme: "inset-2-dark"
  });

  $('.left-filter__search input, .filter__search input').on('keyup', function(){
    
    var list = $(this).parent().parent().children().children().children().children();
    list.children('li').css('display', 'none');
    list.children('li:contains("'+$(this).val()+'")').css('display', 'block');
    
  });
  
  $('.mobfilter__search input').on('keyup', function(){
    
    var list = $(this).parent().parent().children().children();
    list.children('li').css('display', 'none');
    list.children('li:contains("'+$(this).val()+'")').css('display', 'block');
    
  });
  
  $(".filter__options").mCustomScrollbar({
    theme: "inset-2-dark"
  });
  
  $('.filter>span').on('click', function(){
    if($(this).parent().hasClass('open')){
      $(this).parent().children('.filter__dropdown').fadeOut(300, function(){
        $(this).parent().removeClass('open');
      });
    }else{
      $('.filter__dropdown').hide();
      $('.filter').removeClass('open');
      $(this).parent().children('.filter__dropdown').fadeIn(300, function(){
        $(this).parent().addClass('open');
      });
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
    $('.product-item__bottom').insertAfter('.product-item__right');
    
  }
  
  if($(window).outerWidth() >= 760){
    $('.product-item__desc').insertAfter('.product-item__thumbs');
    
  }else{
    
    $('.product-item__desc').insertAfter('.product-item__attrs');
    $('.article__image-two').addClass('owl-carousel');
    initSlider('.article__image-two', 1, 1, 1, 1, 0);
    $('#cat__related-slider').addClass('owl-carousel');
    initSlider('#cat__related-slider', 3, 3, 3, 3, 0);
        
  }
  
  if($(window).outerWidth() >= 1000){
    setDescHeight(315);
  }else if($(window).outerWidth() < 1000 && $(window).outerWidth() >= 760){
    setDescHeight(64);
  }else{
    setDescHeight(105);
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
		var citySelect = $("#city-select"); // тут указываем ID элемента
		if (!citySelect.is(e.target) && citySelect.has(e.target).length === 0) { // и не по его дочерним элементам
      $('#city-select__dropdown').fadeOut(300, function(){
        citySelect.removeClass('open');
      });
		}
    var filterDropdown = $(".filter"); // тут указываем ID элемента
		if (!filterDropdown.is(e.target) && filterDropdown.has(e.target).length === 0) { // и не по его дочерним элементам
      $('.filter__dropdown').fadeOut(300, function(){
        filterDropdown.removeClass('open');
      });
		}
	});
  
  
  $('#blog-cats-show').on('click', function(){
    $('#blog-cats').fadeIn(300);
  });
  
  $('#blog-cats-close').on('click', function(){
    $('#blog-cats').fadeOut(300);
  });
  
  $('#blog-cats li').on('click', function(){
    if($(window).outerWidth() >= 1000){
      $('#cat').val($(this).text());
      $('#blog-cats-form').submit();
    }else{
      $('#blog-cats li').removeClass('active');
      $(this).addClass('active');
      $('#cat').val($(this).text());
    }
  });
  
  $('#blog-cats__button button').on('click', function(){
    $('#blog-cats-form').submit();
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
  
  /*$('#menu__list>li>a').on('click', function(e){
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
  });*/
  
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
  
  $('.mobfilters__sub>li').on('click', function(){
    $(this).children('.mobmenu__dropdown').css('left', '0');
    $('#mobfilters__clear').fadeOut(150, function(){
        $('#mobfilters__back').fadeIn(150);
      });
  });
  
  $('#mobfilters__back').on('click', function(){
    $('.mobmenu__dropdown').css('left', '100%');
    $('#mobfilters__back').fadeOut(150, function(){
      $('#mobfilters__clear').fadeIn(150);
    });
  });
  
  $('#mobfilters__close').on('click', function(){
    $('#mobfilters').fadeOut(300);
  });
  
  $('#mobfilters__show').on('click', function(){
    $('#mobfilters').fadeIn(300);
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
      $('#blog-slider, #blog-tags-slider').addClass('owl-carousel');
      initSlider('#blog-slider', 3, 2, 2, 2, 25);
      initSlider('#blog-tags-slider', 5, 5, 5, 5, 0);
      $("#city-select__list, #blog-tags").mCustomScrollbar({
        theme: "inset-2-dark"
      });
      $('#blog').insertBefore('.banner.cosm');
      $('.product-item__bottom').insertAfter('.product-item__delivery');
    }else{
      $('#blog-slider, #blog-tags-slider').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
      $("#city-select__list, #blog-tags").mCustomScrollbar("destroy");
      $('#blog').insertBefore('#brands');
      $('.product-item__bottom').insertAfter('.product-item__right');
    }
    
    if($(window).outerWidth() >= 760){
      
      $('.product-item__desc').insertAfter('.product-item__thumbs');
      $('.article__image-two').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
      $('#cat__related-slider').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
    
    }else{
      
      $('.product-item__desc').insertAfter('.product-item__attrs');
      $('.article__image-two').addClass('owl-carousel');
      initSlider('.article__image-two', 1, 1, 1, 1, 0);
      $('#cat__related-slider').addClass('owl-carousel');
      initSlider('#cat__related-slider', 3, 3, 3, 3, 0);

    }
    
    if($(window).outerWidth() >= 1000){
      setDescHeight(315);
    }else if($(window).outerWidth() < 1000 && $(window).outerWidth() >= 760){
      setDescHeight(64);
    }else{
      setDescHeight(105);
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
  
  function checkFavs(){
    $('.product').each(function(){
      var currentIndex = currentFavs.indexOf($(this).data('item-id').toString());
      if(currentIndex !== -1){
        $(this).children('.product__like').addClass('active');
      }
    });
    $('.product-item__content').each(function(){
      var currentIndex = currentFavs.indexOf($(this).data('item-id').toString());
      if(currentIndex !== -1){
        $(this).children().children().children('.product-item__like').addClass('active');
      }
    });
  }
  
  checkFavs();
  
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
  
  $('.product-item__like').on('click', function(){
    if($(this).hasClass('active')){
      $(this).removeClass('active');
      removeFromFavorite($(this).parent().parent().parent().data('item-id'));
    }else{
      $(this).addClass('active');
      addToFavorite($(this).parent().parent().parent().data('item-id'));
    }
    checkTopFavorites();
  });
  
  function getCurrentLikes(){
    var currentLikes = Cookies.get('likes_list');
    return currentLikes ? currentLikes.split(',') : [];
  }
  
  function sendLike(itemId, elem, action, currentLikes, currentIndex){
    $.ajax({
      method: 'GET',
      url: '/like_blog_item.html',
      data: { id: itemId, action: action }
    })
    .done(function(data) {
      elem.children('span').text(data);
      if(action === 'like'){
        currentLikes.push(itemId);
        elem.addClass('active');
      }else{
        currentLikes.splice(currentIndex, 1);
        elem.removeClass('active');
      }
      Cookies.set('likes_list', currentLikes.join(','));
    })
    .fail(function() {
      alert('Произошла ошибка, попробуйте позже.');
    });
  }
  
  function likeBlogItem(itemId, elem) {
    var currentLikes = getCurrentLikes();
    var currentIndex = currentLikes.indexOf(itemId.toString());
    if(currentIndex === -1){
      sendLike(itemId, elem, 'like', currentLikes, currentIndex)
    }
  }
  
  function unlikeBlogItem(itemId, elem) {
    var currentLikes = getCurrentLikes();
    var currentIndex = currentLikes.indexOf(itemId.toString());
    if(currentIndex !== -1){
      sendLike(itemId, elem, 'unlike', currentLikes, currentIndex)
    }
  }
  
  var currentLikes = getCurrentLikes();
  
  $('.blog-item').each(function(){
    var currentIndex = currentLikes.indexOf($(this).data('item-id').toString());
    if(currentIndex !== -1){
      $(this).children().children('.blog-item__likes').addClass('active');
    }
  });
  
  $('.blog-item__likes').on('click', function(){
    if($(this).hasClass('active')){
      unlikeBlogItem($(this).parent().parent().data('item-id'), $(this));
    }else{
      likeBlogItem($(this).parent().parent().data('item-id'), $(this));
    }
  });
  
  function checkArticleLikes(){
    $('.article__content').each(function(){
      var currentIndex = currentLikes.indexOf($(this).data('item-id').toString());
      if(currentIndex !== -1){
        $(this).children().children().children('.article__likes').addClass('active');
      }
    });
  }
  
  checkArticleLikes();
  
  $(document).on('click', '.article__likes', function(){
    if($(this).hasClass('active')){
      unlikeBlogItem($(this).parent().parent().parent().data('item-id'), $(this));
    }else{
      likeBlogItem($(this).parent().parent().parent().data('item-id'), $(this));
    }
  });
  
  $('#brands-page__letters li').on('click', function () {
    if($(this).hasClass('rus-letters')){
      var id = '#brands-rus';
    }else if($(this).hasClass('other-letters')){
      var id = '#brands-other';
    }else{
      var id = '#brands-' + $(this).text().toLowerCase();
    }
    var top = $(id).offset().top - 30;
    $('body,html').animate({scrollTop: top}, 500);
  });
  
  var loadArticle = false;
  var currentArticle = 1;
  
  function getArticle(){
    var lastId = $('.article__content:last-child').data('id');
    currentArticle++;
    $.ajax({
      method: 'GET',
      url: '/get_article.html',
      data: { lastId: lastId }
    })
    .done(function(data) {
      $('#articles').append('<div id="article-'+currentArticle+'"></div>');
      $('#articles').append(data);
      $('body,html').animate({scrollTop: $('#article-'+currentArticle+'').offset().top}, 300);
      setTimeout(function(){
        loadArticle = false;
      }, 300);
      if($(window).outerWidth() < 760){
        $('.article__image-two').addClass('owl-carousel');
        initSlider('.article__image-two', 1, 1, 1, 1, 0);
      }
      checkArticleLikes();
    })
    .fail(function() {
      alert('Произошла ошибка, попробуйте позже.');
    });
  }
  
  if($('.article__content').length > 0){
    
    $(window).on('scroll', function(){
      if(parseInt($(window).scrollTop() + $(window).height()) > (parseInt($('#footer').offset().top + 50)) && !loadArticle){
        loadArticle = true;
        getArticle();
      }
    });
    
  }
  
  var loadPage = false;
  var currentPage = 1;
  function getNewPage(){
    currentPage++;
    $.ajax({
      method: 'GET',
      url: '/get_new_page.html',
      data: { page: currentPage }
    })
    .done(function(data) {
      $('#cat_page').append('<div id="cat-page-'+currentPage+'"></div>');
      $('#cat_page').append(data);
      $('body,html').animate({scrollTop: $('#cat-page-'+currentPage+'').offset().top - 240}, 300);
      setTimeout(function(){
        loadPage = false;
      }, 300);
      if(window.location.search){
        var getParams = window.location.search.replace('?', '').split('&');
        if(getParams[getParams.length-1].indexOf('p=') === 0){
          getParams[getParams.length-1] = 'p='+currentPage;
          window.history.pushState({},"", '?'+getParams.join('&'));
        }else{
          window.history.pushState({},"", window.location.search+'&p='+currentPage);
        }
      }else{
        window.history.pushState({},"", '?p='+currentPage+'');
      }
      checkFavs();
    })
    .fail(function() {
      alert('Произошла ошибка, попробуйте позже.');
    });
  }
  
  if($('#bottom-text').length > 0){
    
    $(window).on('scroll', function(){
      if(parseInt($(window).scrollTop() + $(window).height()) > (parseInt($('.footer').offset().top + 50)) && !loadPage){
        loadPage = true;
        getNewPage();
      }
    });
    
  }
  
  var blodItemsStartFrom = 4;
  var blodItemsCount = 3;
  
  $('.blog__button').on('click', function(e){
    e.preventDefault();
    $.ajax({
      method: 'GET',
      url: '/get_blog_items.html',
      data: { startFrom: blodItemsStartFrom, count: blodItemsCount }
    })
    .done(function(data) {
      $('.blog-items-wrapper').append(data);
      blodItemsStartFrom += blodItemsCount;
    })
    .fail(function() {
      alert('Произошла ошибка, попробуйте позже.');
    });
  });
  
  var productItemsStartFrom = 6;
  var productItemsCount = 5;
  
  $('.products__button a').on('click', function(e){
    e.preventDefault();
    var $that = $(this);
    $.ajax({
      method: 'GET',
      url: '/get_product_items.html',
      data: { startFrom: productItemsStartFrom, count: productItemsCount }
    })
    .done(function(data) {
      $that.parent().parent().children('.product-items').append(data);
      productItemsStartFrom += productItemsCount;
    })
    .fail(function() {
      alert('Произошла ошибка, попробуйте позже.');
    });
  });
  
  function changeCatLinks(timeout){
    var startLink = 1;
    var catLinksLength = $('.cat__title li').length;

    setInterval(function(){
      $('.cat__title li:nth-child('+startLink+')').css('opacity', '0');
      setTimeout(function(){
        $('.cat__title li:nth-child('+startLink+')').css('position', 'absolute');
        if(startLink == catLinksLength) startLink = 0;
        $('.cat__title li:nth-child('+(++startLink)+')').css('position', 'relative').css('opacity', '1');
      }, 150);
    }, timeout);
  }
  
  changeCatLinks(3000);
  
  $(document).on('click', '.comment__button button', function(){
    var $textArea = $(this).parent().parent().parent().parent('.comments').find('textarea');
    var $answetTo = $(this).parent().parent().parent().parent('.comments').find('.answer_to');
    var answerToId = parseInt($(this).parent().parent().parent().data('comment-id'));
    $textArea.focus();
    $answetTo.val(answerToId);
  });
  
  $('#product-item__thumbs img').on('click', function(){
    $('#product-item__image img').attr('src', $(this).data('full'));
    $('#product-item__thumbs img').removeClass('active');
    $(this).addClass('active');
  });
    
  $('.accordeon__title').on('click', function(){
    $(this).children('.icon').toggleClass('open');
    $(this).parent().children('.accordeon__body').slideToggle(300, function(){
      $(this).parent().toggleClass('open');
    });
  });
  
  function setDescHeight(height){
    if($('.product-item__desc .accordeon__body').outerHeight() > height){
      $('.product-item__desc .accordeon__body').outerHeight(height).append('<div class="dots">...</div>');
    }
  }
  
  $(document).on('click', '.dots', function(){
    $(this).parent().css('height', 'auto');
    $(this).remove();
  });
  
  $('.sitemap__subcattitle').each(function(){
    $(this).css('top', $(this).width() + 5 + 'px');
  });
  
  $('.cats__item').each(function(){
    if($(this).outerHeight() > 168){
      $(this).outerHeight(189).append('<div class="dots">...</div>');
    }
  });
  
  function checkFilters() {
    var filters = {
      colors: [],
      sizes: [],
      squads: [],
      seasons: [],
      brands: [],
      shops: []
    }
    if($(window).outerWidth() >= 1000){
      var filterContainer = 'filter__dropdown';
    }else{
      var filterContainer = 'mobfilter';
    }
    $.each($('.'+filterContainer+'-color input:checked'), function(){ filters.colors.push($(this).val()); });
    $.each($('.'+filterContainer+'-size input:checked'), function(){ filters.sizes.push($(this).val()); });
    $.each($('.'+filterContainer+'-squad input:checked'), function(){ filters.squads.push($(this).val()); });
    $.each($('.'+filterContainer+'-season input:checked'), function(){ filters.seasons.push($(this).val()); });
    $.each($('.'+filterContainer+'-brand input:checked'), function(){ filters.brands.push($(this).val()); });
    $.each($('.'+filterContainer+'-shop input:checked'), function(){ filters.shops.push($(this).val()); });
    $('#filtes-form').html('');
    for(var key in filters){
      if(filters[key].length > 0){
        $('#filtes-form').append('<input type="hidden" name="'+key+'" value="'+ filters[key].join(',') +'" />');
      }
    }
    if($('.'+filterContainer+'-price input[name="from"]').val()){
      $('#filtes-form').append('<input type="hidden" name="from" value="'+ $('.'+filterContainer+'-price input[name="from"]').val() +'" />');
    }
    if($('.'+filterContainer+'-price input[name="to"]').val()){
      $('#filtes-form').append('<input type="hidden" name="to" value="'+ $('.'+filterContainer+'-price input[name="to"]').val() +'" />');
    }
    if($('.'+filterContainer+'-price input[name="discount"]').prop('checked')){
      $('#filtes-form').append('<input type="hidden" name="discount" value="1" />');
    }
    return filters;
  }
  
  checkFilters();
  
  $('.filter__clear').on('click', function(){
    if($(this).parent().children('.filter__dropdown').hasClass('filter__dropdown-price')){
      var priceForm = $(this).parent().children('.filter__dropdown').children();
      priceForm.children('input[name="from"]').val('');
      priceForm.children('input[name="to"]').val('');
      priceForm.children('input[name="discount"]').prop('checked', false);
    }else{
      var filtersForm = $(this).parent().children().children().children().children().children().children();
      filtersForm.children('input').prop('checked', false);
    }
    checkFilters();
    $('#filtes-form').submit();
  });
  
  $('.filters__active li').on('click', function(){
    $('#'+$(this).data('filter-id')).prop('checked', false);
    $('#mob'+$(this).data('filter-id')).prop('checked', false);
    checkFilters();
    $('#filtes-form').submit();
  });
  
  $('.clear_all').on('click', function(){
    $('.filters input[type="checkbox"], .mobfilters input[type="checkbox"]').prop('checked', false);
    $('input[name="from"]').val('');
    $('input[name="to"]').val('');
    checkFilters();
    $('#filtes-form').submit();
  });
  
  $('.filter__button button, .mobfilter__button button').on('click', function(){
    checkFilters();
    $('#filtes-form').submit();
  });
  
  var photoInterval;
  
  function changePhotos(elem, timeout){
    
    var imagesContainer = elem.children('.product__image').children();
    
    var currentPhoto = imagesContainer.children('img.active').index()+1;
    var photosLength = imagesContainer.children('img').length;

    photoInterval = setInterval(function(){
      imagesContainer.children('img:nth-child('+currentPhoto+')').removeClass('active');
      if(currentPhoto == photosLength) currentPhoto = 0;
      imagesContainer.children('img:nth-child('+(++currentPhoto)+')').addClass('active');
    }, timeout);
  }
  
  
  $('.cat__products .product').hover(
    function(){
      changePhotos($(this), 1000);
    }, 
    function(){
      clearInterval(photoInterval);
    }
  );
  
  $(document).on('click', '.cat__tags-show', function(){
    if($(this).hasClass('show')){
      $(this).parent().css('max-height', '1000px');
      $(this).removeClass('show').addClass('hide');
      $(this).children('span').text('свернуть');
    }else{
      $(this).parent().css('max-height', '80px');
      $(this).removeClass('hide').addClass('show');
      $(this).children('span').text('показать все');
    }
  });
  
  $('.mobfilter__show').on('click', function(){
    $(this).parent().children('.mobfilter__options').css('max-height', '10000px');
    $(this).remove();
  });
  
  $(window).on('scroll', function(){
    if(parseInt($(window).scrollTop()) > 500){
      $('#to-top').css('opacity', '0.5').css('visibility', 'visible');
    }else{
      $('#to-top').css('opacity', '0').css('visibility', 'hidden');
    }
  });
  
  $('#to-top').on('click', function(){
    $('body,html').animate({scrollTop: 0}, 500);
  });
  
  $('.product-item__socials a, .article__socials a').on('click', function(e){
    e.preventDefault();
  });
  
  $('.menu__dropdown-switcher span:first-child').on('click', function(){
    $('.menu__dropdown-switcher span').toggleClass('active');
    $('.menu__dropdown-item.boys').fadeOut(150, function(){
      $('.menu__dropdown-item.girls').fadeIn(150);
    });
  });
  
  $('.menu__dropdown-switcher span:last-child').on('click', function(){
    $('.menu__dropdown-switcher span').toggleClass('active');
    $('.menu__dropdown-item.girls').fadeOut(150, function(){
      $('.menu__dropdown-item.boys').fadeIn(150);
    });
  });
  
  $('.cat__text-show a').on('click', function(e){
    e.preventDefault();
    $(this).parent().parent().css('max-height', 'auto');
    $(this).parent().remove();
  });
  
});

var url = '';
var Share = {
    vkontakte: function(purl, ptitle, pimg, text) {
        url  = 'http://vkontakte.ru/share.php?';
        url += 'url='          + encodeURIComponent(purl);
        url += '&title='       + encodeURIComponent(ptitle.substring(0,50));
        url += '&description=' + encodeURIComponent(text.substring(0,100));
        url += '&image='       + encodeURIComponent(pimg);
        url += '&noparse=true';
        Share.popup(url);
    },
    odnoklassniki: function(purl, text) {
        url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
        url += '&st.comments=' + encodeURIComponent(text.substring(0,100));
        url += '&st._surl='    + encodeURIComponent(purl);
        Share.popup(url);
    },
    facebook: function(purl, ptitle, pimg, text) {
        url  = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]='     + encodeURIComponent(ptitle.substring(0,50));
        url += '&p[summary]='   + encodeURIComponent(text.substring(0,100));
        url += '&p[url]='       + encodeURIComponent(purl);
        url += '&p[images][0]=' + encodeURIComponent(pimg);
        Share.popup(url);
    },
    twitter: function(purl, ptitle) {
        url  = 'http://twitter.com/share?';
        url += 'text='      + encodeURIComponent(ptitle.substring(0,50));
        url += '&url='      + encodeURIComponent(purl);
        url += '&counturl=' + encodeURIComponent(purl);
        Share.popup(url);
    },
    mailru: function(purl, ptitle, pimg, text) {
        url  = 'http://connect.mail.ru/share?';
        url += 'url='          + encodeURIComponent(purl);
        url += '&title='       + encodeURIComponent(ptitle.substring(0,50));
        url += '&description=' + encodeURIComponent(text.substring(0,100));
        url += '&imageurl='    + encodeURIComponent(pimg);
        Share.popup(url)
    },
    pinterest:  function(purl, pimg, text) {
        url  = 'http://pinterest.com/pin/create/button/?';
        url += 'url='          + encodeURIComponent(purl);
        url += '&description=' + encodeURIComponent(text.substring(0,100));
        url += '&media='    + encodeURIComponent(pimg);
        Share.popup(url)
    },
    popup: function(url) {
        window.open(url,'','toolbar=0,status=0,width=626,height=436');
    }
  };