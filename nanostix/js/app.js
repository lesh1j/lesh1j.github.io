document.addEventListener("DOMContentLoaded", () => {
  const line = document.querySelector('.underline__line')

  setTimeout(() => {
    line.style.left = '0px';
  }, 3000);

  setInterval(() => {
    const textLeftOffset = parseInt($('.text__left').css('left'));
    const textRightOffset = parseInt($('.text__right').css('right'));
    const textTopOffset = parseInt($('.text__top').css('left'));
    const textBottomOffset = parseInt($('.text__bottom').css('right'));

    if (textLeftOffset < -240) {
      $('.text__left').css('left', '-220px');
    } else {
      $('.text__left').css('left', '-360px');
    }

    if (textRightOffset > -238) {
      $('.text__right').css('right', '-258px');
    } else {
      $('.text__right').css('right', '-118px');
    }

    if (textTopOffset < -150) {
      $('.text__top').css('left', '-130px');
    } else {
      $('.text__top').css('left', '-230px');
    }

    if (textBottomOffset > -160) {
      $('.text__bottom').css('right', '-180px');
    } else {
      $('.text__bottom').css('right', '-80px');
    }
  }, 3000);

  $('.order').on('click', () => {
    $('.order-frame, .close__iframe').css('opacity', '1').css('visibility', 'visible');
  });

  $('#close__iframe').on('click', () => {
    $('.order-frame, .close__iframe').css('opacity', '0').css('visibility', 'hidden');
  });

  $('#tomap').on('click', () => {
    $('#map').css('opacity', '1').css('visibility', 'visible');
  });

  $('#close__map').on('click', () => {
    $('#map').css('opacity', '0').css('visibility', 'hidden');
  });

  const tastesSlider = $('#tastesSlider');
  tastesSlider.owlCarousel({
    loop: false,
    items: 1
  });
  $('.tastes__prev').click(() => tastesSlider.trigger('prev.owl.carousel'));
  $('.tastes__next').click(() => tastesSlider.trigger('next.owl.carousel'));

  const videoSlider = $('#videoSlider');
  videoSlider.owlCarousel({
    loop: false,
    items: 1
  });
  $('.video__prev').click(() => videoSlider.trigger('prev.owl.carousel'));
  $('.video__next').click(() => videoSlider.trigger('next.owl.carousel'));

  const redImage = new Image();
  redImage.src = 'img/slider/red.png';
  redImage.dataset.color = 'red'

  const greyImage = new Image();
  greyImage.src = 'img/slider/grey.png';
  greyImage.dataset.color = 'grey'

  const nanoImage = new Image();
  nanoImage.src = 'img/slider/nano.png';
  nanoImage.dataset.color = 'nano'

  const blackImage = new Image();
  blackImage.src = 'img/slider/black.png';
  blackImage.dataset.color = 'black'

  const blueImage = new Image();
  blueImage.src = 'img/slider/blue.png';
  blueImage.dataset.color = 'blue'

  const blue2Image = new Image();
  blue2Image.src = 'img/slider/blue_2.png';
  blue2Image.dataset.color = 'blue2'

  const pinkImage = new Image();
  pinkImage.src = 'img/slider/pink.png';
  pinkImage.dataset.color = 'pink'

  const purpleImage = new Image();
  purpleImage.src = 'img/slider/purple.png';
  purpleImage.dataset.color = 'purple'


  const colors = {
    red: redImage,
    nano: nanoImage,
    grey: greyImage,
    black: blackImage,
    blue: blueImage,
    blue2: blue2Image,
    pink: pinkImage,
    purple: purpleImage,
  }

  $('.color').on("click", function () {
    const oldColor = document.querySelector('.owl-item.active .taste__image .stix.active-color');
    if ($(this).data('color') !== oldColor.dataset.color) {
      $('.color').removeClass('active');
      $(this).addClass('active');

      const slides = [...document.querySelectorAll('.tastes .owl-item')];

      slides.forEach((slide) => {
        const oldColor = slide.querySelector('.taste__image .stix.active-color');
        const newColor = colors[$(this).data('color')].cloneNode();
        newColor.classList.add('stix');
        newColor.style.opacity = '0';
        const imageContainer = slide.querySelector('.taste__image');
        imageContainer.appendChild(newColor);

        if (slide.classList.contains('active')) {
          setTimeout(() => {
            newColor.style.opacity = '1';
          }, 1);
          setTimeout(() => {
            oldColor.style.opacity = '0';
          }, 500);
          setTimeout(() => {
            oldColor.remove();
            newColor.classList.add('active-color');
          }, 750);
        } else {
          newColor.style.opacity = '1';
          oldColor.remove();
          newColor.classList.add('active-color');
        }
      });
    }
  });

  const bgPositions = [
    [
      {
        top: '-565px',
        left: '-350px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '-74px',
        left: '380px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '8vh',
        left: null,
        bottom: null,
        right: '0px',
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '73.2vh',
        left: '396px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '70.1vh',
        left: '648px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: null,
        left: null,
        bottom: '-320px',
        right: '-234px',
        rotate: null,
        scale: null,
        scaleX: null,
      },
    ],
    [
      {
        top: '-1000px',
        left: '-350px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '-9px',
        left: '-188px',
        bottom: null,
        right: null,
        rotate: 'rotate(45deg)',
        scale: 'scale(1.18)',
        scaleX: 'scaleX(-1)',
      },
      {
        top: '18vh',
        left: null,
        bottom: null,
        right: '330px',
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '34.4vh',
        left: '1048px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '120vh',
        left: '648px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: null,
        left: null,
        bottom: '-320px',
        right: '-234px',
        rotate: null,
        scale: null,
        scaleX: null,
      },
    ],
    [
      {
        top: '-565px',
        left: '-350px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '75.5vh',
        left: '-35px',
        bottom: null,
        right: null,
        rotate: 'rotate(-165deg)',
        scale: 'scale(0.9)',
        scaleX: null,
      },
      {
        top: '12vh',
        left: null,
        bottom: null,
        right: '62px',
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '-5vh',
        left: '1048px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '16vh',
        left: '1220px',
        bottom: null,
        right: null,
        rotate: 'rotate(-36deg)',
        scale: 'scale(0.5)',
        scaleX: null,
      },
      {
        top: null,
        left: null,
        bottom: '-370px',
        right: '-355px',
        rotate: null,
        scale: null,
        scaleX: null,
      },
    ],
    [
      {
        top: '-565px',
        left: '-350px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '73vh',
        left: '167px',
        bottom: null,
        right: null,
        rotate: 'rotate(-165deg)',
        scale: 'scale(2)',
        scaleX: null,
      },
      {
        top: '12vh',
        left: null,
        bottom: null,
        right: '330px',
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '64.1vh',
        left: '1057px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '61vh',
        left: '1309px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: null,
        left: null,
        bottom: '-570px',
        right: '-355px',
        rotate: null,
        scale: null,
        scaleX: null,
      },
    ],
    [
      {
        top: '-565px',
        left: '-350px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '-7vh',
        left: '943px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: 'scaleX(-1)',
      },
      {
        top: '-100vh',
        left: null,
        bottom: null,
        right: '330px',
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '77.3vh',
        left: '83px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: '78.3vh',
        left: '330px',
        bottom: null,
        right: null,
        rotate: null,
        scale: null,
        scaleX: null,
      },
      {
        top: null,
        left: null,
        bottom: '-320px',
        right: '-234px',
        rotate: null,
        scale: null,
        scaleX: null,
      },
    ],
  ];

  //const [ bg1, bg2, bg3, bg4, bg5, bg6 ] = document.getElementsByClassName('bg_item');
  const bgs = [...document.getElementsByClassName('bg_item')];

  const animated = [...document.querySelectorAll('.animate__animated')];

  const startAnimations = (slideIndex) => {
    animated.forEach((el) => {
      if (Number(el.dataset.slide) === slideIndex) {
        el.style.animationDelay = el.dataset.delay + 'ms';
        el.style.animationDuration = el.dataset.duration || 700 + 'ms';
        el.classList.add(el.dataset.animation);
        el.style.opacity = '1';
      } else {
        el.classList.remove(el.dataset.animation);
      }
    });
  };

  startAnimations(0);

  const myFullpage = new fullpage('#fullpage', {
    anchors: ['home', 'features', 'products', 'video', 'contacts'],
    navigation: true,
    navigationPosition: 'right',
    verticalCentered: false,
    scrollingSpeed: 700,

    onLeave: (index, newIndex, direction) => {
      const positions = bgPositions[newIndex.index];
      bgs.forEach((el, i) => {
        el.style.top = positions[i].top;
        el.style.left = positions[i].left;
        el.style.bottom = positions[i].bottom;
        el.style.right = positions[i].right;
        el.style.transform = null;
        el.style.transform = `${positions[i].scaleX || ''} ${positions[i].rotate || ''} ${positions[i].scale || ''}`;
      });

      startAnimations(newIndex.index);

      if (newIndex.index === 0) {
        setTimeout(() => {
          line.style.left = '0px';
        }, 2000);
      } else {
        line.style.left = '-300px';
      }

      if ($(window).width() < 1200) {
        if (newIndex.index === 0 || newIndex.index === 4) {
          $('.to-order').css('display', 'none');
        } else {
          $('.to-order').css('display', 'flex');
        }
      }
    },
  });
});