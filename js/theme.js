'use strict';

var AD_TITLES = [
    "Большая уютная квартира", 
    "Маленькая неуютная квартира", 
    "Огромный прекрасный дворец", 
    "Маленький ужасный дворец", 
    "Красивый гостевой домик", 
    "Некрасивый негостеприимный домик", 
    "Уютное бунгало далеко от моря", 
    "Неуютное бунгало по колено в воде"
];
var AD_TYPES = [
    'palace',
    'flat', 
    'house', 
    'bungalo'
];
var AD_TYPES_NAMES = [
    'Дворец',
    'Квартира', 
    'Дом', 
    'Бунгало'
];
var AD_TIMES = [
    '12:00', 
    '13:00', 
    '14:00'
];
var AD_FEATURES = [
    "wifi", 
    "dishwasher", 
    "parking", 
    "washer", 
    "elevator", 
    "conditioner"
];
var AD_PHOTOS = [
    "http://o0.github.io/assets/images/tokyo/hotel1.jpg", 
    "http://o0.github.io/assets/images/tokyo/hotel2.jpg", 
    "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

var RELATED_ADS_NUMBER = 8;

var MAP_WIDTH = 1200;
var MAP_HEIGHT = 704;

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 85;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var relatedAds = [];
        

//функция генерации случайного числа
var getRandomNumber = function(min, max){
    
    return Math.floor(min + Math.random() * (max + 1 - min));
    
}
    
//функция выбора случайного элемента из массива
var getRandomArrayItem = function(array){
    
    return array[getRandomNumber(0, array.length - 1)];
    
}

//функция сортировки массива в случайном порядке
var getRandomMixedArray = function(array){
    
    var mixedArray = [];
    for(var i = 0; i < array.length; i++){
        mixedArray.push(array[i]);
    }
    
    mixedArray.sort(function () {
        return Math.random() - 0.5;
    });
    
    return mixedArray;
    
}

//функция генерации случайного массива случайной длины из другого массива
var getRandomArray = function(array){
    
    var randomArray = [];
    for(var i = 0; i < array.length; i++){
        randomArray.push(array[i]);
    }
        
    var itemsToRemove = getRandomNumber(0, randomArray.length - 1);
        
    for(var i = 0; i < itemsToRemove; i++){
        randomArray.splice(getRandomNumber(0, randomArray.length - 1), 1);
    }
    
    return randomArray;
}

//функция генерация одного случайного объявления
var generateAd = function(index){
    
    var locationX = getRandomNumber(50, 1150);
    var locationY = getRandomNumber(200, 700);
    
    var ad = {
        author: {
            avatar: 'img/avatars/user0' + (index + 1) + '.png'
        },
        location: {
            x: locationX,
            y: locationY
        },
        offer: {
            title: AD_TITLES[index],
            address: locationX + ', ' + locationY,
            price: getRandomNumber(1000, 1000000),
            type: getRandomArrayItem(AD_TYPES),
            rooms: getRandomNumber(1, 5),
            guests: getRandomNumber(1, 10),
            checkin: getRandomArrayItem(AD_TIMES),
            checkout: getRandomArrayItem(AD_TIMES),
            features: getRandomArray(AD_FEATURES),
            description: '',
            photos: getRandomMixedArray(AD_PHOTOS)
        }
    };
    
    return ad;
}

//наполняем массив relatedAds случайными данными
var generateRelatedAds = function(number){
    
    for(var i = 0; i < number; i++){
        relatedAds[i] = generateAd(i);
    }
    
}

generateRelatedAds(RELATED_ADS_NUMBER);

//функция создания одной метки
var createPin = function(template, ad){

    var pinElement = template.cloneNode(true);
    
    pinElement.style.left = ad.location.x - PIN_WIDTH/2 + 'px';
    pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
    
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    
    openPopup(pinElement, ad);
    
    return pinElement;
    
}

//функция отрисовкиметок из массива
var renderPins = function(ads) {
    
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsFragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    pinsFragment.appendChild(createPin(pinTemplate, ads[i]));
  }

  return pinsFragment;
    
};

//функция создания карточки объявления
var createCard = function(template, ad){
    
    var cardElement = template.cloneNode(true);
    
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' p/ночь';
    cardElement.querySelector('.popup__type').textContent = AD_TYPES_NAMES[AD_TYPES.indexOf(ad.offer.type)];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    
    var popupFeatures = cardElement.querySelector('.popup__features');
    popupFeatures.textContent = ''
    
    for(var i = 0; i < ad.offer.features.length; i++){
        var lisItem = document.createElement('li');
        lisItem.classList.add('popup__feature', 'popup__feature--'+ad.offer.features[i]);
        popupFeatures.appendChild(lisItem);
    }
    
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    
    var popupPhotos = cardElement.querySelector('.popup__photos');
    popupPhotos.textContent = ''
    
    for(var i = 0; i < ad.offer.photos.length; i++){
        var photoItem = document.createElement('img');
        photoItem.classList.add('popup__photo');
        photoItem.src = ad.offer.photos[i];
        photoItem.alt = 'Фотография жилья';
        photoItem.width = 45;
        photoItem.height = 40;
        popupPhotos.appendChild(photoItem);
    }
    
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    
    return cardElement;
    
}

var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var pinsContainer = document.querySelector('.map__pins');

var form = document.querySelector('.ad-form');
var formFieldsets = document.querySelectorAll('fieldset');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

//функция активации карты
var activateMap = function(){
    
    map.classList.remove('map--faded');
    pinsContainer.appendChild(renderPins(relatedAds));
    
}

//функция активации формы
var activateForm = function(){
    
    form.classList.remove('ad-form--disabled');
    
    for(var i = 0; i < formFieldsets.length; i++){
        formFieldsets[i].disabled = false;
    }
    
}

//функция установки адреса в инпут
var setAdressInput = function(width, height){
    
    var addressInput = document.querySelector('#address');
    addressInput.value = (mainPin.offsetLeft + Math.floor(width/2)) + ', ' + (mainPin.offsetTop + height);
    
}

setAdressInput(0, 0);

mainPin.addEventListener('mousedown', function(evt){
   
    evt.preventDefault();

    var startCursorShift = {
        x: evt.clientX - mainPin.offsetLeft,
        y: evt.clientY - mainPin.offsetTop,
    }

    var onMainPinDragging = function(moveEvt){

        moveEvt.preventDefault();

        var mainPinLeft  = moveEvt.x - startCursorShift.x;
        var mainPinTop  = moveEvt.y - startCursorShift.y;

        if(mainPinLeft < -MAIN_PIN_WIDTH/2){
            mainPinLeft = -MAIN_PIN_WIDTH/2;
        }
        
        if(mainPinLeft > MAP_WIDTH - MAIN_PIN_WIDTH/2){
            mainPinLeft = MAP_WIDTH - MAIN_PIN_WIDTH/2;
        }
        
        if(mainPinTop < 0){
            mainPinTop = 0;
        }

        if(mainPinTop > MAP_HEIGHT - MAIN_PIN_HEIGHT){
            mainPinTop = MAP_HEIGHT - MAIN_PIN_HEIGHT;
        }

        mainPin.style.left = mainPinLeft + 'px';
        mainPin.style.top = mainPinTop + 'px';

    }
    
    var onStopMainPinDragging = function(upEvt){

        upEvt.preventDefault();
        
        activateMap();
        
        activateForm();
    
        setAdressInput(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);

        document.removeEventListener('mousemove', onMainPinDragging);
        document.removeEventListener('mouseup', onStopMainPinDragging);

    }
    
    
    document.addEventListener('mousemove', onMainPinDragging);
    document.addEventListener('mouseup', onStopMainPinDragging);
    
});

//функция открытия карточки объявления
var openPopup = function(pinElement, ad){
    
    pinElement.addEventListener('click', function(){
        closePopup();
        map.insertBefore(createCard(cardTemplate, ad), map.querySelector('.map__filters-container'));
        
        var currentCard = document.querySelector('.map__card');
        var closePopubButton = currentCard.querySelector('.popup__close');
        closePopubButton.addEventListener('click', closePopup);
        
        document.addEventListener('keyup', onEscPopupPress);
        
    })
    
}

//функция закрытия карточки объявления
var closePopup = function(){
    
    var currentCard = document.querySelector('.map__card');
    
    if(currentCard){
        map.removeChild(currentCard);
    }
    
    document.removeEventListener('keyup', onEscPopupPress);
    
}

//обработчик нажатия клафиши esc
var onEscPopupPress = function(evt){
    if(evt.keyCode == 27){
        closePopup();
    }
}

//функция изменения минимальной цены в зависимости от типа жилья
var changeMinPrice = function(type){
    
    var minPrice = 0;
    
    switch(type){
        case 'flat':
            minPrice = 1000;
            break;
        case 'house':
            minPrice = 5000;
            break;
        case 'palace':
            minPrice = 10000;
            break;
    }
    
    return minPrice;
    
}

var typeSelect = form.querySelector('#type');
var priceInput = form.querySelector('#price');

typeSelect.addEventListener('change', function(){
    priceInput.min = changeMinPrice(this.value);
    priceInput.placeholder = changeMinPrice(this.value);
});


//зависимостть времени заезда\выезда
var timeIn = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');

timeIn.addEventListener('change', function(){
    timeOut.value = this.value;
});

timeOut.addEventListener('change', function(){
    timeIn.value = this.value;
});

var roomsSelect = document.querySelector('#room_number');
var guestsSelect = document.querySelector('#capacity');
var guestsOptions = guestsSelect.querySelectorAll('option');

//функция изменения количества гостей в зависимости от количества комнат
var checkGuests = function(rooms){
    
    //задаем массив с допустимыми значиниями колва гостей в зависимости от комнат
    var currentGuestsOptions = [1];
    
    switch(parseInt(rooms)){
        case 2:
            currentGuestsOptions = [1, 2];
            break;
        case 3:
            currentGuestsOptions = [1, 2, 3];
            break;
        case 100:
            currentGuestsOptions = [0];
            break;
    }
        
    guestsSelect.textContent = '';
    
    var optionsFragment = document.createDocumentFragment();
    
    //перебираем все варианты количесва гостей
    for(var i = 0; i < guestsOptions.length; i++){
        //проверяем содержится ли текущее значение колва гостей в массиве с допустимым значением
        if(currentGuestsOptions.indexOf(parseInt(guestsOptions[i].value)) != -1){
            //если да, то добавляем его в селект
            optionsFragment.appendChild(guestsOptions[i]);
        }
    }
    
    guestsSelect.appendChild(optionsFragment);
    
}

roomsSelect.addEventListener('change', function(){
    checkGuests(this.value);
});
