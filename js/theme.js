/*“use strict” mode on*/
"use strict";

$(window).on('load', function () {
	    
    var windowWidth = $(window).width();
    
    
    $(window).on('resize', function () {		

    
	});
    
    
});


(function ($) {
    
    var windowWidth = $(window).width();
    
    var sliderWidth, sliderStretch, slidesPerView, sliderEffect;
    
    if(windowWidth > 996){
        sliderWidth = 2000;
        sliderStretch = 725;
    }else{
        sliderWidth = 1154;
        sliderStretch = 740;
    }
    
    if(windowWidth > 786){
        slidesPerView = 2;
        sliderEffect = 'coverflow';
    }else{
        slidesPerView = 1;
        sliderWidth = '100%';
        sliderEffect = 'fade';
        sliderStretch = 0;
    }
    
    var swiper = new Swiper('#swiper', {
        width: sliderWidth,
        effect: sliderEffect,
        grabCursor: false,
        centeredSlides: true,
        slidesPerView: slidesPerView,
        loop: true,
        simulateTouch:false,
        allowSwipeToNext: false, 
        allowSwipeToPrev: false,
        touchRatio: 0,
        allowTouchMove: false,
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
        
        if(windowWidth > 992){
            sliderWidth = 2000;
            sliderStretch = 725;
        }else{
            sliderWidth = 1154;
            sliderStretch = 740;
        }
        
        if(windowWidth > 768){
            slidesPerView = 2;
            sliderEffect = 'coverflow';
        }else{
            slidesPerView = 1;
            sliderWidth = '100%';
            sliderEffect = 'fade';
            sliderStretch = 0;
        }
        
        //alert(windowWidth);
        
        swiper.params.effect = sliderEffect;
        
        swiper.params.slidesPerView = slidesPerView;
        
        swiper.params.width = sliderWidth;
        
        swiper.coverflowEffect.stretch = sliderStretch;
    
        swiper.update();
    
	});
    
    var sliderWidth1, sliderStretch1, slidesPerView1, sliderEffect1;
    
    if(windowWidth > 1200){
        sliderWidth1 = 1620;
        sliderStretch1 = 507;
        sliderEffect1 = 'coverflow';
        slidesPerView1 = 2;
    }else if(windowWidth > 992 && windowWidth <= 1200){
        sliderWidth1 = 1200;
        sliderStretch1 = 875;
        sliderEffect1 = 'coverflow';
        slidesPerView1 = 2;
    }else if(windowWidth > 768 && windowWidth <= 992){
        sliderWidth1 = 940;
        sliderStretch1 = 645;
        sliderEffect1 = 'coverflow';
        slidesPerView1 = 2;
    }else{
        sliderWidth1 = '100%';
        sliderStretch1 = 0;
        sliderEffect1 = 'fade';
        slidesPerView1 = 1;
    }    

    var swiper1 = new Swiper('#swiper1', {
        width: sliderWidth1,
        effect: sliderEffect1,
        grabCursor: false,
        centeredSlides: true,
        slidesPerView: slidesPerView1,
        loop: true,
        loopedSlides: 1,
        simulateTouch:false,
        allowSwipeToNext: false, 
        allowSwipeToPrev: false,
        touchRatio: 0,
        allowTouchMove: false,
        coverflowEffect: {
            rotate: 0,
            stretch: sliderStretch1,
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
        
        if(windowWidth > 1200){
            sliderWidth1 = 1620;
            sliderStretch1 = 507;
            sliderEffect1 = 'coverflow';
            slidesPerView1 = 2;
        }else if(windowWidth > 992 && windowWidth <= 1200){
            sliderWidth1 = 1200;
            sliderStretch1 = 875;
            sliderEffect1 = 'coverflow';
            slidesPerView1 = 2;
        }else if(windowWidth > 768 && windowWidth <= 992){
            sliderWidth1 = 940;
            sliderStretch1 = 645;
            sliderEffect1 = 'coverflow';
            slidesPerView1 = 2;
        }else{
            sliderWidth1 = '100%';
            sliderStretch1 = 0;
            sliderEffect1 = 'fade';
            slidesPerView1 = 1;
        } 
        
        //alert(windowWidth);
        
        swiper1.params.effect = sliderEffect1;
        
        swiper1.params.slidesPerView = slidesPerView1;
        
        swiper1.params.width = sliderWidth1;
        
        swiper1.coverflowEffect.stretch = sliderStretch1;
    
        swiper1.update();
    
	});
    
    
    swiper1.on('slideChange', function () {
        //alert(swiper1.activeIndex);
        $('.works-desc').hide();
        $('#desc_'+swiper1.activeIndex).show();
    });
    
    
    $(document).on('click', '#showmenu', function(){
        if($(this).hasClass('opened')){
            $('#mobbar').css('right', '-200px');
            $(this).removeClass('opened');
            $('#overlay, #popup').fadeOut(200);
        }else{
            $('#mobbar').css('right', '0');
            $(this).addClass('opened');
            $('#overlay').fadeIn(200);
            $('#popup').fadeOut(200);
        }
    });
    
    var servIndex = 0;
    
    $(document).on('click', '#services-more', function(){
        servIndex++;
        if(servIndex == 4){
            servIndex = 0;
        }
        $('.services .col-12.col-sm-12.col-md-6.col-lg-6.col-xl-6').addClass('d-none');
        $('.services .col-12.col-sm-12.col-md-6.col-lg-6.col-xl-6').eq(servIndex).removeClass('d-none');
        return false;
    });
    
    $(document).on('click', '#advs-more', function(){
        $('.advs-text li').removeClass('d-none');
        return false;
    });
    
    $(document).on('click', '#projects-more', function(){
        $('.projects-list li').removeClass('d-none');
        return false;
    });
    
    $(document).on('click', '.header-form button, #projects-get', function(){
        $('#popup_website').val($('#top_website').val());
        $('#overlay, #popup').fadeIn(200);
        return false;
    });
    
    $(document).on('click', '#overlay', function(){
        $('#overlay, #popup').fadeOut(200);
        $('#mobbar').css('right', '-200px');
        $('#showmenu').removeClass('opened');
        return false;
    });
    
    $(document).on('change', '#file', function(){
        var file = $(this).val();
        $('.uploadbutton .input').html(file);
        return false;
    });

})(jQuery);

