$('.accordion__title').on('click', function(){
  $(this).parent().toggleClass('open');
});

function changeNodes() {
  if($(window).width() <= 640){
    $('.node__bottom').addClass('owl-carousel');

    $('.node__bottom').owlCarousel({
      items: 1,
      margin: 0,
      nav: false,
      dots: true,
      lazyLoad: true,
      autoWidth: false,
      margin: 15,
      responsiveRefreshRate: 1,
      center: false,
      loop: false,
      mouseDrag: true
    });

  }else{
    $('.node__bottom').removeClass('owl-carousel');
    $('.node__bottom').trigger('destroy.owl.carousel');
  }
}

changeNodes();

var mobResultIsCreated = false;

function createMobResult(){
  var mobResult = $('<div class="mobresult owl-carousel big-arrows">');
  
  $('.result__row').each(function(i, elem){
    if(i > 0){
      var mobResultItem = '<div class="mobresult__item">';
      mobResultItem += '<div class="mobresult__title">' + $(elem).children('.result__line:first-child').children('.result__item:first-child').text() + '</div>';
      
      $('.result__row.result__title .result__item:not(:first-child)').each(function(j, el){
        console.log(el);
        mobResultItem += '<div class="mobresult__row">';
        mobResultItem += '<div>' + $(el).text() + '</div><div>';
        var ind = j+2;
        $(elem).children('.result__line').each(function(k, e){
          mobResultItem += '<span>' + $(e).children('.result__item:nth-child('+ind+')').html() + '</span>';
        })
        mobResultItem += '</div></div>';
        
      });
            
      mobResultItem += '</div>';
      
      mobResult.html(mobResult.html() + mobResultItem);
    }
  }); 

  $('.calc__result').prepend(mobResult);
  
  $('.mobresult').owlCarousel({
      items: 1,
      margin: 0,
      nav: true,
      navText: '',
      dots: false,
      lazyLoad: true,
      autoWidth: false,
      margin: 15,
      responsiveRefreshRate: 1,
      center: false,
      loop: false,
      mouseDrag: true
    });
  
  mobResultIsCreated = true; 
  
}

if($(window).width() <= 640){
  createMobResult();
}

$(window).on("resize", function() {
  changeNodes();
  
  if($(window).width() <= 640){
    if(!mobResultIsCreated){
      createMobResult();
    }
  }else{
    $('.mobresult').remove();
    mobResultIsCreated = false; 
  }
  
});