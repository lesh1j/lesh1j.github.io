$(document).ready(function() {
    window.Application = {
        Components: {},
        /**
         * Front controller application, init all plugin
         * and event handler
         */
        addComponent: function(name, object) {
            this.Components[name] = object;
            object.run();
            if (object.resizeFunctions != null && typeof(object.resizeFunctions) == "function") {
                $(window).on("resize", function() {
                    object.resizeFunctions();
                });
            };
            if (object.scrollFunctions != null && typeof(object.scrollFunctions) == "function") {
                $(window).on("scroll", function() {
                    object.scrollFunctions();
                });
            };
            if (object.loadFunctions != null && typeof(object.loadFunctions) == "function") {
                $(window).on("load", function() {
                    object.loadFunctions();
                });
            }
        }
    }
});
$(function() {
    var Main = {
        run: function() {
            this.Init();
            this.runMovedPanel();
            this.topMenu();
            this.Main();
            this.fancybox();
            this.owlCarusel();
            this.Popup();
            this.initTabs();
            this.initAnimation();
        },
        Init: function() {
            $("body").append("<div class='main-overlay'></div>");
            $("body").append("<div class='main-overlay-black'></div>");
        },
        runMovedPanel: function() {
            var $wrapper = $("body"),
                $bodyPanel = $('.moved-panel-body'),
                $Panel = $('.moved-panel'),
                $overlay = $wrapper.find(".main-overlay-black"),
                $closebtn = $(".close-moved-pannel"),
                $openpanel = $(".moved-panel.open"),
                $btn = $('[data-type="getMovedPanel"]');
           
            var target;
            $btn.on("click", function(e) {
                e.preventDefault();
                if ($(this).hasClass('inactive') === false) {
                   
                    $wrapper.css('overflow', 'hidden');
                    var $this = $(this);
                    if ($this.data('slide-url') && $this.data('slide-open')){
                        var url =  $this.data('slide-url'),
                            slide = $this.data('slide-open');
                        $.post(url, function( html ) {
                            $html = $(html);
                           var content = $html.find('[data-slide-name=' + slide + ']').html();
                         
                    });
                    }
                    else if ($this.data('slide-open')) {
                        var slide = $this.data('slide-open'),
                            content = $('[data-slide-name=' + slide + ']').html();
                    }
                    content = content.replace(/animation-active/g, "");
                    $bodyPanel.html(content);
                    if ($bodyPanel.find('.contact-panel').length){
                        $Panel.addClass('panel-bottom-fixed');
                    }
                    $target = $($this.attr("data-target"));
                    $(".moved-panel.open").removeClass("open").removeClass("from-top");
                    $target.addClass("open");
                    $overlay.fadeIn(300);
                    Main.fancybox();
                     $('.js-go-to-slide').click(function() {
                            var scroll_el = $(this).attr('href');
                            if ($(scroll_el).length != 0) {
                                $('.moved-panel.panel-bottom-fixed .moved-panel-body').animate({
                                    scrollTop: $(scroll_el).offset().top - $('.header').outerHeight()
                                }, 1000); // анимируем скроолинг к элементу scroll_el
                            }
                            return false; // выключаем стандартное действие
                        });
                       Main.initAnimation();        
                    $('.moved-panel.panel-bottom-fixed .moved-panel-body').scroll(function() {
                        Main.initAnimation();
                    }) 
                    //Application.Components.Main.runPanelHeight();
                }
            });
            $overlay.on("click", function(e) {
                $(".moved-panel.open").removeClass("open");
                 $overlay.fadeOut(300);
                 $wrapper.css('overflow', 'auto');
            });
             $closebtn.on("click", function(e) {
                $(".moved-panel.open").removeClass("open");
                 $overlay.fadeOut(300);
                  $wrapper.css('overflow', 'auto');
            });    


        },
        Main: function() {
           
            Main.initAnimation();
            $(window).scroll(function() {
               Main.initAnimation();
                if ($(window).scrollTop() > $('header').height()) {
                    $('body').addClass('header-fixed');
                } else {
                    $('body').removeClass('header-fixed');
                }
            });
            $('.js-go-to').click(function() {
                var scroll_el = $(this).attr('href');
                if ($(scroll_el).length != 0) {
                    $('html, body').animate({
                        scrollTop: $(scroll_el).offset().top - $('.header').outerHeight()
                    }, 1000); // анимируем скроолинг к элементу scroll_el
                }
                return false; // выключаем стандартное действие
            });
            $('.header-logo, .header-home').on("click", function(e) {
                if ($('body').hasClass('left-menu-open')) {
                    e.preventDefault();
                    $('.close_menu').trigger('click');
                }
            });
        },
        topMenu: function() {
            var $overlay = $('.main-overlay');
            if ($(window).innerWidth() < 989) {
                $('.top-menu').find('.opb').on('click', function(e) {
                    e.preventDefault();
                    $(this).parents('li.sub').toggleClass('active');
                });
            } else {
                var hover;
                $('.top-menu').find('.sub').on('mouseenter', function() {
                    $('.top-menu').find('.sub-menu').hide();
                    var $this = $(this);
                    clearTimeout(hover);
                    if ($this.find('.sub-menu').length > 0) {
                        $this.find('.sub-menu').show();
                    }
                }).on('mouseleave', function() {
                    var $this = $(this);
                    hover = setTimeout(function() {
                        if ($this.find('.sub-menu').length > 0) {
                            $this.find('.sub-menu').hide();
                        }
                    }, 200);
                });
            }
            $('.nav-btn').on("click", function() {
                $('.header-content').show();
                $('.page-wrap').animate({
                    "margin-left": "320px"
                }, "slow");
                $('.header-content').animate({
                    "left": "0px"
                }, "slow", function() {
                    $('body').addClass('left-menu-open');
                });
                $(this).addClass('open');
                $('body').css('overflow', 'hidden');
                $overlay.fadeIn(300);
                return false;
            });
            $('.main-overlay, .close_menu').on("click", function() {
                $('.header-content').animate({
                    "left": "-320px"
                }, "slow", function() {
                    $('.menu-left').hide();
                });
                $('.page-wrap').animate({
                    "margin-left": "0px"
                }, "slow");
                $('.nav-btn').removeClass('open');
                $('body').css('overflow', 'auto');
                $overlay.fadeOut(300);
                $('body').removeClass('left-menu-open')
            });
           
            function expressPlatSetHeight (){
                 var height = 0;
                $('.express-design-plan img').each(function(index, el) {
                    $img = $(this),
                    $parent = $(this).parents('.image');
                    if (!$parent.find('.img').length){
                        height = $img.outerHeight();
                       
                    }
                });
                if (height > 0){
                    $('.express-design-plan .img img').css('max-height', height);
                }

            }
              expressPlatSetHeight ();
                $( window ).resize(function() {
                    expressPlatSetHeight ();
                });
            
        },
        fancybox: function() {
            $('.fancybox').fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                autoSize: true,
                closeClick: false,
                title: null,
                padding: 0
            });
        },
        owlCarusel: function() {
            $('.main-construction-plan').owlCarousel({
                items: 3,
                margin: 0,
                nav: false,
                dots: true,
                lazyLoad: true,
                autoWidth: false,
                margin: 15,
                responsiveRefreshRate: 1,
                center: false,
                loop: false,
                mouseDrag: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    420: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    1000: {
                        items: 3
                    }
                }
            });
            $('.main-gallery').owlCarousel({
                items: 1,
                margin: 0,
                nav: true,
                navText: '',
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
            $('.technology-gallery').owlCarousel({
                items: 1,
                margin: 0,
                nav: false,
                navText: '',
                navText: '',
                dots: true,
                lazyLoad: true,
                autoWidth: false,
                margin: 15,
                responsiveRefreshRate: 1,
                center: false,
                loop: false,
                mouseDrag: true
            });
            if ($(window).innerWidth() < 640) {
                var $domokomplect = $('.domokomplect-is');
                $domokomplect.addClass('owl-carousel');
                $domokomplect.on('initialized.owl.carousel ', //Да простит меня мог, не хочу выяснять, почему при первичной загрузке высота слайда считается неправильно
                    function(e) {
                        setTimeout(function() {
                            $('.domokomplect-is').trigger('refresh.owl.carousel');
                        }, 500);
                    });
                $domokomplect.owlCarousel({
                    items: 1,
                    margin: 0,
                    nav: false,
                    navText: '',
                    dots: true,
                    lazyLoad: false,
                    autoWidth: false,
                    autoHeight: true,
                    margin: 15,
                    responsiveRefreshRate: 1,
                    center: false,
                    loop: false,
                    mouseDrag: true
                });
                $('.domokomplect-is').trigger('refresh.owl.carousel');

                 var $technologyAdvantage = $('.technology-advantage');
                 $technologyAdvantage.addClass('owl-carousel');
                $technologyAdvantage.owlCarousel({
                    items: 1,
                    margin: 0,
                    nav: false,
                    navText: '',
                    dots: true,
                    lazyLoad: false,
                    autoWidth: false,
                    autoHeight: true,
                    margin: 15,
                    responsiveRefreshRate: 1,
                    center: false,
                    loop: false,
                    mouseDrag: true
                });

            }
            if ($(window).innerWidth() < 768) {
                var $domokomplectStructure = $('.domokomplect-structure');
                $domokomplectStructure.addClass('owl-carousel');
                $domokomplectStructure.on('initialized.owl.carousel translated.owl.carousel', //Да простит меня мог, не хочу выяснять, почему при первичной загрузке высота слайда считается неправильно
                    function(e) {
                        var index = 0;
                        if (e.item.index) {
                            var index = e.item.index;
                        }
                        $domokomplectStructure.find('.owl-item').each(function() {
                            $(this).removeClass('owl-last');
                            $(this).removeClass('owl-next');
                            if ($(this).index() < index) {
                                $(this).addClass('owl-last');
                            }
                            if ($(this).index() > index) {
                                $(this).addClass('owl-next');
                            }
                        });
                        $domokomplectStructure.parents('.container').addClass('p0');
                    });
                $domokomplectStructure.owlCarousel({
                    items: 1,
                    margin: 0,
                    nav: false,
                    navText: '',
                    dots: true,
                    lazyLoad: false,
                    autoWidth: false,
                    autoHeight: true,
                    margin: 15,
                    responsiveRefreshRate: 1,
                    center: false,
                    loop: false,
                    mouseDrag: true
                });
            }
            $expressDesignPlan = $('.express-design-plan');
            /*$expressDesignPlan.owlCarousel({
                    items: 3,
                    margin: 0,
                    nav: false,
                    navText: '',
                    dots: true,
                    lazyLoad: false,
                    autoWidth: false,
                    autoHeight: true,
                    margin: 7,
                    responsiveRefreshRate: 1,
                    center: false,
                    loop: false,
                    mouseDrag: true
                });*/
        },
        Popup: function() {
            $('.popup-form').on('change', 'input[type=file]', function() {
                if ($(this).get(0).files.length > 1) $(this).parent().find('span').first().text('Файлов: ' + $(this).get(0).files.length);
                else if ($(this).get(0).files.length == 1) $(this).parent().find('span').first().text($(this).get(0).files[0].name);
                else $(this).parent().find('span').first().text('Прикрепить файл');
            });
            var fieldPlaceholder = '';
            $('input[type="text"], textarea').on('focus', function() {
                fieldPlaceholder = $(this).attr('placeholder');
                $(this).attr('placeholder', '');
            }).on('blur', function() {
                $(this).attr('placeholder', fieldPlaceholder);
            });
        },
        initTabs: function() {
            $('.js-tabs .tabs__header a').on("click", function(e) {
                e.preventDefault();
                var $tabs = $(this).parents('.js-tabs'),
                    idTabs = $(this).attr('href');
                $tabs.find('.active').removeClass('active');
               $(this).addClass('active');
               $tabs.find(idTabs).addClass('active');
            });

        },
        initAnimation: function() {
            $('.js-animation-element').each(function(index, el) {
                        if (!$(this).hasClass('animation-active') && $(window).scrollTop() + $(window).height() > $(this).offset().top) {
                            $(this).addClass('animation-active');
                        }
            });      
         }
        
    }
    window.Application.addComponent("Main", Main);
});