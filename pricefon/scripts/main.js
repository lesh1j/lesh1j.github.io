// POLYFILLS
(function (ELEMENT) {
	ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
	ELEMENT.closest = ELEMENT.closest || function closest(selector) {
		if (!this) return null;
		if (this.matches(selector)) return this;
		if (!this.parentElement) {
			return null;
		} else return this.parentElement.closest(selector);
	};
})(Element.prototype);

(() => {
	'use strict';

	const hoverSidebarData = {
		shops: {
			'aliexpress': {
				name: 'Aliexpress',
				country: 'China',
				description: 'Доставка во все страны Доставка от 3 дней до 3 месяцев',
				cashbacks: ['Letyshops', 'Cashbacker'],
				promocodes: 12,
				groupbuyings: 23,
				phones: 23,
				tablets: 123
			},
			'banggood': {
				name: 'Banggood',
				country: 'China',
				description: 'Доставка во все страны Доставка от 4 дней до 4 месяцев',
				cashbacks: ['Cashbacker', 'Letyshops'],
				promocodes: 23,
				groupbuyings: 12,
				phones: 23,
				tablets: 123
			},
			'gearbest': {
				name: 'gearbest',
				country: 'China',
				description: 'Доставка во все страны Доставка от 4 дней до 4 месяцев',
				cashbacks: ['Cashbacker', 'Letyshops'],
				promocodes: 23,
				groupbuyings: 12,
				phones: 23,
				tablets: 123
			},
			'everbuying': {
				name: 'everbuying',
				country: 'China',
				description: 'Доставка во все страны Доставка от 4 дней до 4 месяцев',
				cashbacks: ['Cashbacker', 'Letyshops'],
				promocodes: 23,
				groupbuyings: 12,
				phones: 23,
				tablets: 123
			},
			'lightinthebox': {
				name: 'lightinthebox',
				country: 'China',
				description: 'Доставка во все страны Доставка от 4 дней до 4 месяцев',
				cashbacks: ['Cashbacker', 'Letyshops'],
				promocodes: 23,
				groupbuyings: 12,
				phones: 23,
				tablets: 123
			}
		}
	};
  
  const imageSlides = document.querySelectorAll('.image__slides');

  if(document.documentElement.clientWidth < 520 && imageSlides){
    imageSlides.forEach((slider) => {
      slider.classList.add('js-slider-slides');
    });
  }
  
  window.onresize = function(event) {
    if(document.documentElement.clientWidth < 520 && imageSlides){
      imageSlides.forEach((slider) => {
        slider.classList.add('js-slider-slides');
      });
    }else{
      slider.classList.remove('js-slider-slides');
    }
  };
  
	// SLIDERS
	[...document.querySelectorAll('.js-slider')].forEach(slider => {
		const slidePrev = slider.querySelector('.js-slider-prev');
		const slideNext = slider.querySelector('.js-slider-next');
		const slides = slider.querySelectorAll('.js-slider-slide');
		const items = [...slider.querySelectorAll('.js-slider-item')];
		const currentItemClass = slider.dataset.currentItemClass;
		const autoplay = slider.dataset.autoplay;
		let timer;
		const sliderInstance = lory(slider, {
			classNameFrame: 'js-slider-frame',
			classNameSlideContainer: 'js-slider-slides',
			classNamePrevCtrl: 'js-slider-prev',
			classNameNextCtrl: 'js-slider-next'
		});
		slider.addEventListener('after.lory.slide', event => {
			slidePrev.disabled = !event.detail.currentSlide;
			slideNext.disabled = event.detail.currentSlide === slides.length - 1;
			const target = items && items[event.detail.currentSlide].querySelector('.js-slider-active-target');
			setCurrentItemClass(target);
			if (autoplay) {
				clearTimeout(timer);
				timer = setTimeout(slide, autoplay);
			}
		});
		items.forEach((item, index) => {
			const target = item.querySelector('.js-slider-active-target');
			item.addEventListener('click', event => {
				event.preventDefault();
				sliderInstance.slideTo(index);
				setCurrentItemClass(target);
			});
		});
		if (autoplay) {
			timer = setTimeout(slide, autoplay);
		}
		function slide() {
			if (sliderInstance.returnIndex() === slides.length - 1) {
				sliderInstance.slideTo(0);
			} else {
				sliderInstance.next();
			}
		}
		function setCurrentItemClass(target) {
			items.forEach(item => {
				const target = item.querySelector('.js-slider-active-target');
				target.classList.remove(currentItemClass);
			});
			target.classList.add(currentItemClass);
		}
	});

	// TABS
	[...document.querySelectorAll('.js-tab-links')].forEach(tabGroup => {
		const groupName = tabGroup.dataset.tabGroup;
		const group = document.querySelector(`.js-tabs[data-tab-group="${groupName}"]`);
		const toggles = [...tabGroup.querySelectorAll('[data-tab-target]')];
		const currentClass = tabGroup.dataset.currentClass;
		toggles.forEach(toggle => {
			const targetID = toggle.dataset.tabTarget;
			const target = document.querySelector(`#${targetID}`);
			toggle.addEventListener('click', event => {
				const currentTab = group.querySelector(`.${currentClass}`);
				const targetTab = document.querySelector(`#${targetID}`);
				currentTab.classList.remove(currentClass);
				targetTab.classList.add(currentClass);
			});
		});
	});

	// DIALOGS
	[...document.querySelectorAll('dialog')].forEach(dialog => {
		dialogPolyfill.registerDialog(dialog);
		dialog.addEventListener('click', event => {
			if (!dialog.open) {
				return;
			}
			if (dialog.contains(event.target) && event.target !== dialog) {
				return;
			}
			const dialogRect = dialog.getBoundingClientRect();
			const x = event.pageX;
			const y = event.pageY;
			const left = window.pageXOffset + dialogRect.left;
			const top = window.pageYOffset + dialogRect.top;
			const rect = {
				left: left,
				right: left + dialogRect.width,
				top: top,
				bottom: top + dialogRect.height
			};
			if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
				dialog.close();
			}
		});
	});

	// TOGGLES
	[...document.querySelectorAll('.js-toggle')].forEach(toggle => {
		const type = toggle.dataset.toggle;
		switch (type) {
			case 'dialog':
				const dialogId = toggle.dataset.dialog;
				const dialogEl = document.getElementById(dialogId);
				const toggleParentDialog = toggle.closest('dialog');
				let eventName = 'click';
				if (toggle.nodeName == 'BUTTON' && toggle.form) {
					toggle = toggle.form;
					eventName = 'submit';
				}
				toggle.addEventListener(eventName, event => {
					event.preventDefault();
					if (toggleParentDialog === dialogEl) {
						toggleParentDialog.close();
					} else {
						dialogEl.showModal();
						toggleParentDialog && toggleParentDialog.close();
					}
				});
				break;
			case 'class':
				const targetId = toggle.dataset.toggleTarget;
				const target = document.getElementById(targetId);
				const toggleClass = toggle.dataset.toggleClass;
				const action = toggle.dataset.toggleAction || 'toggle';
				toggle.addEventListener('click', event => {
					target.classList[action](toggleClass);
				});
				break;
		}
	});

	// PRODUCT PHOTOS
	[...document.querySelectorAll('.js-photos')].forEach(photos => {
		const photo = photos.querySelector('.js-photo');
		const links = [...photos.querySelectorAll('.js-photo-link')];
		links.forEach(link => {
			const url = link.href;
			link.addEventListener('click', event => {
				event.preventDefault();
				photo.src = url;
				photo.removeAttribute('width');
				photo.removeAttribute('height');
			});
		});
	});

	// ClICK FAKERS
	[...document.querySelectorAll('.js-click-trigger')].forEach(trigger => {
		trigger.addEventListener('click', event => {
			let targetId = trigger.dataset.clickTarget;
			CSS && CSS.escape && (targetId = CSS.escape(targetId));
			if (!targetId) {
				return;
			}
			const target = document.getElementById(targetId);
			target.click();
		});
	});

	[...document.querySelectorAll('.js-hover-sidebar')].forEach(instance => {
		const sidebarContainer = document.querySelector(`#${instance.dataset.sidebar}`);
		const template = document.querySelector(`#${instance.dataset.template}`);
		const dataset = hoverSidebarData[instance.dataset.datasetName];
		const triggers = instance.querySelectorAll('.js-hover-sidebar-item');
		const sidebar = sidebarContainer.firstElementChild;
		[...triggers].forEach(trigger => {
			const dataItem = dataset[trigger.dataset.item];
			trigger.addEventListener('mouseenter', event => {
				event.preventDefault();
				sidebarContainer.removeChild(sidebar);
				sidebarContainer.innerHTML = Handlebars.compile(template.innerHTML)(dataItem);
			});
			trigger.addEventListener('mouseleave', event => {
				event.preventDefault();
				sidebarContainer.innerHTML = '';
				sidebarContainer.appendChild(sidebar);
			});
		});
	});

	[...document.querySelectorAll('.js-promocode')].forEach(promocode => {
		const reveal = promocode.querySelector('.js-promocode-reveal');
		const holder = promocode.querySelector('.js-promocode-holder');
		const revealedClass = promocode.dataset.revealedClass;
		const hiddenClass = promocode.dataset.hiddenClass;
		reveal.addEventListener('click', event => {
			event.preventDefault();
			holder.parentElement && holder.parentElement.removeChild(holder);
			promocode.querySelector(`.${hiddenClass}`).classList.remove(hiddenClass);
			promocode.classList.add(revealedClass);
		});
	});

	[...document.querySelectorAll('.js-expandable')].forEach(expandable => {
		const trigger = expandable.querySelector('.js-expand');
		const fullText = expandable.dataset.fullText;
		trigger.addEventListener('click', event => {
			event.preventDefault();
			expandable.innerText = fullText;
		});
	});
  
  const showSearch = document.querySelector('.search__show');
  const searchForm = document.querySelector('.header__search');
  const searchClose = document.querySelector('#search-close');
  const whiteOverlay = document.querySelector('.white-overlay');
  if(showSearch){
    showSearch.addEventListener('click', (e) => {
      e.preventDefault();
      searchForm.style.visibility = 'visible';
      searchForm.style.opacity = '1';
      whiteOverlay.style.display = 'block';
    });
  }
  
  if(searchClose){
    searchClose.addEventListener('click', () => {
      searchForm.style.visibility = 'hidden';
      searchForm.style.opacity = '0';
      whiteOverlay.style.display = 'none';
    });
  }
  
  const menuContainer = document.querySelector('.layout__menu'); 
  const menuShow = document.querySelector('.header__menu-switch');
  const menuHeader = document.querySelector('.mobmenu__header');
  const menuItems = document.querySelectorAll('.menu-item__text');
  const menuClose = document.querySelector('#mobmenu-close');
  const layout = document.querySelector('.layout__column_menu');
  const menuDrops = document.querySelectorAll('.menu-dropdown');
  const menuBack = document.querySelector('#mobmenu-back');
  
  if(menuShow){
    menuShow.addEventListener('click', () => {
      if(document.documentElement.clientWidth < 980){
        menuHeader.style.visibility = 'visible';
        menuHeader.style.opacity = '1';
        menuContainer.style.position = 'fixed';
        menuContainer.style.top = '60px';
        menuContainer.style.display = 'block';
        menuContainer.style.width = document.documentElement.clientWidth + 'px';
        menuContainer.style.maxWidth = document.documentElement.clientWidth + 'px';
        whiteOverlay.style.display = 'block';
        if(layout){
          layout.style.display = 'block';
        }
        if(menuContainer.classList.contains('layout__menu_comparison')){
          menuContainer.style.display = 'block';
          menuContainer.style.top = '60px';
        }
        menuItems.forEach((item) => {
          item.style.display = 'flex';
        })
      }
    });
  }
  
  if(menuClose){
    menuClose.addEventListener('click', () => {
      
      menuDrops.forEach((drop) => {
        drop.style.left = '100%';
        drop.style.visibility = 'hidden';
      });
      menuBack.style.visibility = 'hidden';
      
      menuHeader.style.visibility = 'hidden';
      menuHeader.style.opacity = '0';
      menuContainer.style.position = '';
      menuContainer.style.top = '';
      menuContainer.style.display = '';
      whiteOverlay.style.display = 'none';
      menuItems.forEach((item) => {
        item.style.display = 'none';
      })
      //setTimeout(() => {
        menuContainer.style.width = '';
        menuContainer.style.maxWidth = '';
        if(layout){
          layout.style.display = 'none';
        }
        if(menuContainer.classList.contains('layout__menu_comparison')){
          menuContainer.style.display = 'none';
        }
      //}, 300);
    });
  }
  
  const menuWithChild = document.querySelectorAll('.with-child');
  const linksWithChild = document.querySelectorAll('.with-child a');
  
  menuWithChild.forEach((item) => {
    
    item.addEventListener('click', (evt) => {
      if(document.documentElement.clientWidth < 980){
        const dropdown = evt.currentTarget.querySelector('.menu-dropdown');
        dropdown.style.visibility = 'visible';
        dropdown.style.left = '0';
        menuBack.style.visibility = 'visible';
      }
    })
    
  });
  
  menuBack.addEventListener('click', (evt) => {
    menuDrops.forEach((drop) => {
      drop.style.left = '100%';
      setTimeout(() => {
        drop.style.visibility = 'hidden';
      }, 300);
    });
    menuBack.style.visibility = 'hidden';
  })
  
  linksWithChild.forEach((link) => {
    
    link.addEventListener('click', (evt) => {
      if(document.documentElement.clientWidth < 980){
        evt.preventDefault();
      }
    })
    
  });
  
  const toTop = document.querySelector('.footer_to-top');
  
  document.addEventListener('scroll', () => {
    document.documentElement.scrollTop > 300 ? toTop.style.opacity = 0.5 : toTop.style.opacity = 0;
  });
  
  const sort = document.querySelector('#market-sort');
  const sortText = document.querySelector('#market-sort__text');
  const sortDropdown = document.querySelector('#market-sort__dropdown');
  const sortItems = document.querySelectorAll('.styled-select__item');
  
  if(sort){
    sort.addEventListener('click', (evt) => {
      if(!sort.classList.contains('open') && !evt.target.classList.contains('styled-select__item')){
        sortDropdown.style.display = 'block';
        sort.classList.add('open')
      }else{
        //sortDropdown.style.display = 'block';
      }
    });
  }
  
  if(sortItems){
    sortItems.forEach((item) => {
      item.addEventListener('click', (evt) => {
        sortText.textContent = evt.currentTarget.textContent;
        sortItems.forEach((item) => item.classList.remove('active'));
        evt.currentTarget.classList.add('active')
        sortDropdown.style.display = 'none';
        sort.classList.remove('open')
        console.log(evt.currentTarget.dataset.value);
        document.querySelector('#market-sort__select option[value="' + evt.currentTarget.dataset.value + '"]').selected = true;
      });
    })
  }
  
  document.addEventListener('click', (evt) => {
    if(sort){
      if (!sort.contains(evt.target)) { 
        sortDropdown.style.display = 'none';
        sort.classList.remove('open')
      }
    }
  })
  
  const showFilters = document.querySelector('#market-filters-toggle');
  const hideFilters = document.querySelector('#filters-close');
  const overlay = document.querySelector('.overlay');
  
  if(showFilters){
    showFilters.addEventListener('click', () => {
      overlay.style.display = 'block';
      if(layout){
        layout.style.display = 'block';
      }
    });
  }
  
  if(hideFilters){
    hideFilters.addEventListener('click', () => {
      overlay.style.display = 'none';
      if(layout){
        layout.style.display = 'none';
      }
    });
  }
  
  const moreBrands = document.querySelector('.radiogroup__more');
  const brands = document.querySelectorAll('.filter__brands .radiogroup__item');
  
  if(moreBrands){  
    moreBrands.addEventListener('click', (evt) => {
      if(!evt.currentTarget.classList.contains('open')){
        brands.forEach((brand, i) => {
          brand.classList.remove('hidden');
        })
        evt.currentTarget.classList.add('open')
      }else{
        brands.forEach((brand, i) => {
          if(i > 7 && !brand.classList.contains('radiogroup__item_more')){
            brand.classList.add('hidden');
          }
        })
        evt.currentTarget.classList.remove('open')
      }
    });
  }
  
  const productAside = document.querySelector('.product__aside');
  const productBody = document.querySelector('.product__body');
  const productContent = document.querySelector('.product__content');
  
  if(document.documentElement.clientWidth < 500 && productAside){
    productAside.style.top = productBody.getBoundingClientRect().top - productContent.getBoundingClientRect().top + 80 + 'px';
  }
  
  const sidebarShop = document.querySelector('.sidebar-shop');
  const shopText = document.querySelector('.shop__text');
  const shopContent = document.querySelector('.shop__content');
  
  if(document.documentElement.clientWidth < 1240 && sidebarShop){
    shopContent.insertBefore(sidebarShop, shopText);
  }
  
  const priceValues = document.querySelectorAll('.price-promo__bucket');
  const slider = document.getElementById("myRange");
  
  if(slider){
    slider.oninput = function() {
      const currentPrice = Math.round(this.value/this.step);
      priceValues.forEach((value) => {
        value.classList.remove('active');
      })
      priceValues[currentPrice].classList.add('active');
      console.log(currentPrice);
    }
  }
  
  
  
})();

//scroll to top

var hiddenElement = document.getElementById('hidden-header');
var btn = document.querySelector('.footer_to-top');
function handleButtonClick() {
	hiddenElement.scrollIntoView({ behavior: 'smooth' });
}
btn.addEventListener('click', handleButtonClick);