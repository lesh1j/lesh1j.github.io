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

var activateMap = function(){
    
    map.classList.remove('map--faded');
    pinsContainer.appendChild(renderPins(relatedAds));
    
}

var activateForm = function(){
    
    form.classList.remove('ad-form--disabled');
    
    for(var i = 0; i < formFieldsets.length; i++){
        formFieldsets[i].disabled = false;
    }
    
}

var setAdressInput = function(width, height){
    
    var addressInput = document.querySelector('#address');
    addressInput.value = (mainPin.offsetLeft + Math.floor(width/2)) + ', ' + (mainPin.offsetTop + height);
    
}

setAdressInput(0, 0);

mainPin.addEventListener('mouseup', function(){
   
    activateMap();
        
    activateForm();
    
    setAdressInput(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
    
});

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

var closePopup = function(){
    
    var currentCard = document.querySelector('.map__card');
    
    if(currentCard){
        map.removeChild(currentCard);
    }
    
    document.removeEventListener('keyup', onEscPopupPress);
    
}

var onEscPopupPress = function(evt){
    if(evt.keyCode == 27){
        closePopup();
    }
}


