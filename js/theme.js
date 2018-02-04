/*“use strict” mode on*/
"use strict";

$(window).on('load', function () {
	    
    var windowWidth = $(window).width();
    
    
    $(window).on('resize', function () {		

    
	});
    
    
});


(function ($) {
    
    var windowWidth = $(window).width();
    
    var sliderWidth, sliderStretch;
    
    if(windowWidth > 996){
        sliderWidth = 2000;
        sliderStretch = 725;
    }else{
        sliderWidth = 1154;
        sliderStretch = 740;
    }
    
    var swiper = new Swiper('.swiper-container', {
        width: sliderWidth,
        effect: 'coverflow',
        grabCursor: false,
        centeredSlides: true,
        slidesPerView: 2,
        loop: true,
        loopedSlides: 1,
        coverflowEffect: {
            rotate: 0,
            stretch: sliderStretch,
            depth: 290,
            modifier: 1,
            slideShadows : false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    
    
    $(window).on('resize', function () {		
        
        windowWidth = $(window).width();
        
        if(windowWidth > 996){
            sliderWidth = 2000;
            sliderStretch = 725;
        }else{
            sliderWidth = 1154;
            sliderStretch = 740;
        }
        
        //alert(windowWidth);
        
        swiper.params.width = sliderWidth;
        
        swiper.coverflowEffect.stretch = sliderStretch;
    
        swiper.update();
    
	});

})(jQuery);

