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

var relatedAds = [];
        

//функция генерации случайного числа
var getRandomNumber = function(min, max){
    
    return Math.floor(min + Math.random() * (max + 1 - min));
    
}
    
//функция выбора случайного элемента из массива
var getRandomArrayItem = function(arr){
    
    return arr[getRandomNumber(0, arr.length - 1)];
    
}

//функция сортировки массива в случайном порядке
var getRandomMixedArray = function(array){
    
    return array.sort(function () {
        return Math.random() - 0.5;
    });
    
}

//функция генерации случайного массива случайной длины из другого массива
var getRandomArray = function(array){
    
    var randomArray = [];
    for(var i = 0; i < array.length; i++){
        randomArray.push(array[i]);
    }
    
    getRandomMixedArray(randomArray);
    
    randomArray.splice(getRandomNumber(1, randomArray.length));
 
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
            description: ''     
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
