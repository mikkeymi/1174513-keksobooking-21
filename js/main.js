'use strict';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateSimilarObject(photoIndex) {

  const photoId = photoIndex;


  const offerType = ["palace", "flat", "house", "bungalow"];
  const offerTypeId = getRandomInt(0, offerType.length);

  const locationX = getRandomInt(20, 980);
  const locationY = getRandomInt(130, 630);

  const times = ["12:00", "13:00", "14:00"];
  const checkinTimeId = getRandomInt(0, times.length);
  const checkoutTimeId = getRandomInt(0, times.length - 1);

  const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  const featuresEndIndex = getRandomInt(0, features.length);

  const photos = [
    "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  ];
  const photoEndIndex = getRandomInt(0, photos.length);

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
const photoTemplate = templateCard.querySelector('.popup__photo');
const featursTemplate = templateCard.querySelector('.popup__feature');

//наполнение карточки
function createCard(data) {
  let clone = templateCard.cloneNode(true);
  clone.querySelector('.popup__avatar').src = data.author.avatar;
  clone.querySelector('.popup__title').textContent = data.offer.title;
  clone.querySelector('.popup__text--address').textContent = data.offer.address;
  clone.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь.';
  clone.querySelector('.popup__type').textContent = typeToText(data.offer.type);
  clone.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  clone.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
  clone.querySelector('.popup__description').textContent = data.offer.description;

  clone.querySelector('.popup__features').textContent = data.offer.features;

  // свзять массив с разметкой
    // if (data.offer.features.length === document.querySelector('.popup__feature--wifi')) {
    //   clone.querySelector('.popup__feature--wifi');


    // }
  // debugger;


// все фотографии из списка
if (data.offer.photos.length > 0) {
  const photosList = document.createDocumentFragment();

  for (let i = 0; i < data.offer.photos.length; i++) {
    const photoTemplateClone = photoTemplate.cloneNode(true);
    photoTemplateClone.src = data.offer.photos[i];

    photosList.appendChild(photoTemplateClone);
  }

  // как правильно удалить первого ребенка?

  clone.querySelector('.popup__photos').removeChild(clone.querySelector('.popup__photo'))
  clone.querySelector('.popup__photos').appendChild(photosList);
} else {
  clone.querySelector('.popup__photos').remove()
  }

  return clone;
  }



createCard(similarArray[0]); //data


//отображение карточки
 function renderCards (obj) {
   const card = createCard(obj);
   map.insertBefore(card, mapFilter);
 }
 renderCards(similarArray[0])


function typeToText (type) {
  switch(type)  {
    case 'flat': return 'Квартира';
    case 'bungalow': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
  }
}
// return typeToText(similarArray[0]);

