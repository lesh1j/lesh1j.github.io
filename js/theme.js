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
    
    if(windowWidth > 992){
        sliderStretch = 725;
        sliderEffect = 'coverflow';
        slidesPerView = 2;
    }else if(windowWidth > 768 && windowWidth <= 992){
        sliderStretch = 740;
        sliderEffect = 'coverflow';
        slidesPerView = 2;
    }else{
        sliderStretch = 0;
        sliderEffect = 'slide';
        slidesPerView = 1;
    }  
    
    var swiper = new Swiper('#swiper', {
        effect: sliderEffect,
        grabCursor: false,
        centeredSlides: true,
        slidesPerView: slidesPerView,
        initialSlide: 2,
        loop: false,
        coverflowEffect: {
            rotate: 0,
            stretch: sliderStretch,
            depth: 290,
            modifier: 1,
            slideShadows : false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
    });
    
    
    $(window).on('resize', function () {		
        
        windowWidth = $(window).width();   
        
        if(windowWidth > 992){
            sliderStretch1 = 725;
            sliderEffect1 = 'coverflow';
            slidesPerView1 = 2;
        }else if(windowWidth > 768 && windowWidth <= 992){
            sliderStretch1 = 740;
            sliderEffect1 = 'coverflow';
            slidesPerView1 = 2;
        }else{
            sliderStretch1 = 0;
            sliderEffect1 = 'slide';
            slidesPerView1 = 1;
        }     
             
        swiper.params.effect = sliderEffect;
        
        swiper.params.slidesPerView = slidesPerView;
            
        swiper.update();
    
	});
    
    var sliderWidth1, sliderStretch1, slidesPerView1, sliderEffect1;
    
    if(windowWidth > 1200){
        sliderStretch1 = 507;
        sliderEffect1 = 'coverflow';
        slidesPerView1 = 2;
    }else if(windowWidth > 992 && windowWidth <= 1200){
        sliderStretch1 = 875;
        sliderEffect1 = 'coverflow';
        slidesPerView1 = 2;
    }else if(windowWidth > 768 && windowWidth <= 992){
        sliderStretch1 = 645;
        sliderEffect1 = 'coverflow';
        slidesPerView1 = 2;
    }else{
        sliderStretch1 = 0;
        sliderEffect1 = 'slide';
        slidesPerView1 = 1;
    }
    
    var swiper1 = new Swiper('#swiper1', {
        effect: sliderEffect1,
        grabCursor: false,
        centeredSlides: true,
        slidesPerView: slidesPerView1,
        initialSlide: 2,
        loop: false,
        coverflowEffect: {
            rotate: 0,
            stretch: sliderStretch1,
            depth: 290,
            modifier: 1,
            slideShadows : false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
    });
    
    
    $(window).on('resize', function () {		
        
        windowWidth = $(window).width();
        
        if(windowWidth > 1200){
            sliderStretch1 = 507;
            sliderEffect1 = 'coverflow';
            slidesPerView1 = 2;
        }else if(windowWidth > 992 && windowWidth <= 1200){
            sliderStretch1 = 875;
            sliderEffect1 = 'coverflow';
            slidesPerView1 = 2;
        }else if(windowWidth > 768 && windowWidth <= 992){
            sliderStretch1 = 645;
            sliderEffect1 = 'coverflow';
            slidesPerView1 = 2;
        }else{
            sliderStretch1 = 0;
            sliderEffect1 = 'slide';
            slidesPerView1 = 1;
        } 
        
        swiper1.params.effect = sliderEffect1;
        
        swiper1.params.slidesPerView = slidesPerView1;
    
        swiper1.update();
    
	});
    
    var activeSlide;
    
    swiper1.on('slideChange', function () {
        activeSlide = swiper1.activeIndex + 1;
        $('.works-desc').hide();
        $('#desc_'+activeSlide).show();
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
    
    var advsIndex = 0;
    
    $(document).on('click', '#advs-next', function(){
        advsIndex++;
        if(advsIndex == 6){
            advsIndex = 0;
        }
        $('.advs .col-12.col-sm-12.col-md-4.col-lg-4.col-xl-4').addClass('d-none');
        $('.advs .col-12.col-sm-12.col-md-4.col-lg-4.col-xl-4').eq(advsIndex).removeClass('d-none');
        return false;
    });
    
    var advsMore = 0;
    
    $(document).on('click', '#advs-more', function(){
        if(advsMore == 0){
            $('.advs-text li').removeClass('d-none');
            $(this).html('Скрыть');
            advsMore = 1;
        }else{
            $('.advs-text li').addClass('d-none');
            $('.advs-text li:nth-child(1), .advs-text li:nth-child(2)').removeClass('d-none');
            $(this).html('Далее');
            advsMore = 0;
        }
        return false;
    });
    
    var projectsMore = 0;
    
    $(document).on('click', '#projects-more', function(){
        if(projectsMore == 0){
            $('.projects-list li').removeClass('d-none');
            $(this).html('Скрыть');
            projectsMore = 1;
        }else{
            $('.projects-list li').addClass('d-none');
            $('.projects-list li:nth-child(1), .projects-list li:nth-child(2)').removeClass('d-none');
            $(this).html('Далее');
            projectsMore = 0;
        }
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

