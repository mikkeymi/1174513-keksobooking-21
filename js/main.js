'use strict';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateSimilarObject(photoIndex) {

  const photoId = photoIndex;

  const offerType = ["palace", "flat", "house", "bungalow"];
  const offerTypeId = getRandomInt(offerType.length - 1);

  const locationX = getRandomInt(20, 980);
  const locationY = getRandomInt(130, 630);

  const times = ["12:00", "13:00", "14:00"];
  const checkinTimeId = getRandomInt(0, times.length - 1);
  const checkoutTimeId = getRandomInt(0, times.length - 1);

  const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  const featuresEndIndex = getRandomInt(0, features.length - 1);

  const photos = [
    "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  ];
  const photoEndIndex = getRandomInt(0, photos.length - 1);

  return {
    "author": { //объект
      "avatar": "img/avatars/user0" + photoId + ".png" //ключ: значение
    },
    "offer": {
      "title": "Кексодом",
      "address": locationX + ", " + locationY, // строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      "price": getRandomInt(1000, 50000), // число, стоимость
      "type": offerType[offerTypeId], // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow
      "rooms": getRandomInt(1, 8), // число, количество комнат
      "guests": getRandomInt(1, 16), // число, количество гостей, которое можно разместить
      "checkin": times[checkinTimeId], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      "checkout": times[checkoutTimeId], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      "features": features.slice(0, featuresEndIndex), // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      "description": "lorem ipsum", // строка с описанием,
      "photos": photos.slice(0, photoEndIndex) // массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },
    "location": {
      "x": locationX, // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      "y": locationY // случайное число, координата y метки на карте от 130 до 630.
    }
  };
}


function generateSimilarArray() {
  let returnArray = [];

  for (let i = 1; i <= 8; i++) {
    returnArray.push(generateSimilarObject(i));
  }
  return returnArray;
}

const mapPins = document.querySelector('.map__pins');
const template = document.querySelector('#pin').content.querySelector('button');

// наполняет пины
function fillPins(inputSimilarArray) {

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < inputSimilarArray.length; i++) {

    const pinElement = createPin(inputSimilarArray[i]);
    fragment.appendChild(pinElement);
    // console.log(pinElement);
    // debugger;
  }
  mapPins.appendChild(fragment);
}

//отображает пины
function createPin(obj) {
  let clone = template.cloneNode(true);
  clone.style.left = obj.location.x + 'px';
  clone.style.top = obj.location.y + 'px';
  clone.querySelector('img').src = obj.author.avatar;
  clone.querySelector('img').alt = obj.offer.title;
  return clone;
}

const mapActive = document.querySelector('.map');
mapActive.classList.remove('map--faded');
const similarArray = generateSimilarArray();
fillPins(similarArray);

const map = document.querySelector('.map');
const mapFilter = document.querySelector('.map__filters-container');
const templateCard = document.querySelector('#card').content.querySelector('article');
//наполнение карточки
function createCard(data) {
  let clone = templateCard.cloneNode(true);
  clone.querySelector('.popup__avatar').src.textContent = data.author.avatar;
  clone.querySelector('.popup__title').textContent = data.offer.title;
  clone.querySelector('.popup__text--address').textContent = data.offer.address;
  clone.querySelector('popup__text--price').textContent = data.offer.price + '₽/ночь.';
  clone.querySelector('.popup__type').textContent = typeToText(similarArray[data.offer.type]); //?
  clone.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + 'гостей';
  clone.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
  clone.querySelector('.popup__features').textContent = data.offer.features;
  clone.querySelector('.popup__description').textContent = data.offer.description;
  clone.querySelector('.popup__photos').img.src.textContent = data.offer.photos;

  return clone;
}

createCard(similarArray[0]); //data


//отображение карточки
 function renderCards (obj) {
   const card = createCard(obj);
   map.insertBefore(card, mapFilter);
 }


function typeToText (type) {
  switch(type)  {
    case 'flat': return 'Квартира';
    case 'bungalow': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
  }
}
// return typeToText(similarArray[0]);


// // заполнить данными  1 шаблон
// var renderCards = function () {}
  // document.querySelectorAll('.popup__')
  //for (var i = 0; i < similarArray.length; i++) {
    //clone(templateCard[i], similarArray[i]);
  //}
  // document.querySelector('.popup__title') = similarArray.offer.title;
  // document.querySelector('.popup__text--adress') = similarArray.offer.address;
  // document.querySelector('.popup__text--price') = similarArray.offer.price + '₽/ночь.';
  // document.querySelector('.popup__type') = similarArray.offerType //связать значения ключей со значениями?
  // document.querySelector('.popup__text--capacity') = similarArray.offer.rooms + 'комнаты для ' + similarArray.offer.guests + 'гостей';
  // document.querySelector('.popup__text--time') = 'заезд после ' + similarArray.offer.checkin + 'выезд до ' + similarArray.offer.checkout;
  // document.querySelector('.popup__features') = similarArray.offer.features;
  // document.querySelector('.popup__description') = similarArray.offer.description;
  // document.querySelector('.popup__photos') = similarArray.offer.photos; //Каждая из строк массива photos должна записываться как src соответствующего изображени
  //Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.


// отобразить на странице function () {}
