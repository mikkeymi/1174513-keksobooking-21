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
    "author": { //  объект
      "avatar": "img/avatars/user0" + photoId + ".png" //  ключ: значение
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
  }
  mapPins.appendChild(fragment);
}

//  отображает пины
function createPin(obj) {
  let clone = template.cloneNode(true);
  clone.style.left = obj.location.x + 'px';
  clone.style.top = obj.location.y + 'px';
  clone.querySelector('img').src = obj.author.avatar;
  clone.querySelector('img').alt = obj.offer.title;
  return clone;
}

const similarArray = generateSimilarArray();
fillPins(similarArray);

const map = document.querySelector('.map');
const mapFilter = document.querySelector('.map__filters-container');
const templateCard = document.querySelector('#card').content.querySelector('article');
const photoTemplate = templateCard.querySelector('.popup__photo');

//  наполнение карточки
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
  clone.querySelector('.popup__features').innerHTML = '';
  const photosList = clone.querySelector('.popup__photos');

  // отображать разметку в зависимости от свойства
  let featuresList = clone.querySelector('.popup__features');

  for (let i = 0; i < data.offer.features.length; i++) {
    const feature = data.offer.features[i];
    const stringFeature = '<li class="popup__feature popup__feature--' + feature + '"></li>';
    featuresList.insertAdjacentHTML('beforeend', stringFeature);
  }
  photosList.innerHTML = '';

  for (let i = 0; i < data.offer.photos.length; i++) {
    const photoTemplateClone = photoTemplate.cloneNode(true);
    photoTemplateClone.src = data.offer.photos[i];

    photosList.appendChild(photoTemplateClone);
  }
  return clone;
}
// createCard(similarArray[0]);

//  отображение карточки
function renderCards(obj) {
  const card = createCard(obj);
  map.insertBefore(card, mapFilter);
}

renderCards(similarArray[0]);

function typeToText(type) {
  switch (type) {
    case 'flat': return 'Квартира';
    case 'bungalow': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
  }
  return typeToText;
}

// неактивное состояние
const mapFilters = document.querySelector('.map__filters');
const selectsOfFilter = mapFilters.querySelectorAll('select');
const mapActive = document.querySelector('.map');
const formActives = document.querySelector('.ad-form');
const formDisabledFile = document.querySelector('.ad-form-header');
const formDisabled = document.querySelectorAll('.ad-form__element');
const mainMapPin = document.querySelector('.map__pin--main');


const unActivatePage = function () {
  mapActive.classList.add('map--faded');
  formActives.classList.add('ad-form--disabled');
  formDisabledFile.setAttribute('disabled', 'disabled');

  formDisabled.forEach(function (element) {
    element.setAttribute('disabled', 'disabled');
  });

  selectsOfFilter.forEach(function (element) {
    element.setAttribute('disabled', 'disabled');
  });
};
unActivatePage();

const activatePage = function () {
  mapActive.classList.remove('map--faded');
  formActives.classList.remove('ad-form--disabled');
  formDisabledFile.removeAttribute('disabled', 'disabled');
  mapFilters.removeAttribute('disabled', 'disabled');

  formDisabled.forEach(function (element) {
    element.removeAttribute('disabled');
  });

  selectsOfFilter.forEach(function (element) {
    element.removeAttribute('disabled');
  });
};

mainMapPin.addEventListener('mousedown', function (evt) {
  if (evt.buttons === 1) {
    activatePage();
  }
});

// 3.3 тип жилья влияет на цену (minlength и placeholder)
const roomType = formActives.querySelector('#type');
const roomPrice = formActives.querySelector('#price');

roomType.addEventListener('change', function () {
  let value = 0;
  switch (roomType.value) {
    case 'bungalow': value = 0; break;
    case 'flat': value = 1000; break;
    case 'house': value = 5000; break;
    case 'palace': value = 10000; break;
  }

  roomPrice.min = value;
  roomPrice.placeholder = value;
});

// 3.4 ручное редактирование адреса запрещено и адрес заполняется автоматически
const addressDisabled = document.querySelector('.ad-form__label');
addressDisabled.setAttribute('disabled', 'disabled');


// 3.4 синхронизировать поля
const timeInElement = formActives.querySelector('#timein');
const timeOutElement = formActives.querySelector('#timeout');

timeInElement.addEventListener('change', function () {
  timeOutElement.value = timeInElement.value;
});

timeOutElement.addEventListener('change', function () {
  timeInElement.value = timeOutElement.value;
});

const roomNumbers = formActives.querySelector('#room_number');
const capacityElement = formActives.querySelector('#capacity');

roomNumbers.addEventListener('change', function () {
  checkCapacity();
});

capacityElement.addEventListener('change', function () {
  checkCapacity();
});

const checkCapacity = function () {
  let isCheck = false;
  const capacity = capacityElement.value;
  switch (roomNumbers.value) {
    case '1': isCheck = (capacity === '1'); break;
    case '2': isCheck = (capacity === '1') || (capacity === '2'); break;
    case '3': isCheck = (capacity === '1') || (capacity === '2') || (capacity === '3'); break;
    case '100': isCheck = (capacity === '0'); break;
  }

  if (isCheck === false) {
    capacityElement.setCustomValidity('выберите корректные значения');
  } else {
    capacityElement.setCustomValidity('');
  }
};
