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
  const featuresEndIndex = getRandomInt(1, features.length - 1);

  const photos = [
    "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  ];
  const photoEndIndex = getRandomInt(1, photos.length - 1);

  const returnValue = {
    "author": {
      "avatar": "img/avatars/user0" + photoId + ".png"
    },
    "offer": {
      "title": "Кексодом", // строка, заголовок предложения
      "address": locationX + ", " + locationY, // строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      "price": 0, // число, стоимость
      "type": offerType[offerTypeId], // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow
      "rooms": 8, // число, количество комнат
      "guests": 8, // число, количество гостей, которое можно разместить
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

  return returnValue;
}


function generateSimilarArray() {
  let returnArray = [];

  for (let i = 1; i <= 8; i++) {
    returnArray.push(generateSimilarObject(i));
  }
  return returnArray;
}


function fillPins(inputSimilarArray) {

  let mapPins = document.querySelector('.map__pins');

  let fragment = document.createDocumentFragment();

  const template = document.querySelector('#pin').content.querySelector('button');
  const PinShiftTop = template.children[0]['height'];
  const PinShiftLeft = template.children[0]['width'] / 2;

  for (let i = 0; i < inputSimilarArray.length; i++) {

    const similarObject = inputSimilarArray[i];

    let clone = template.cloneNode(true);

    const styleLeft = similarObject['location']['x'] + PinShiftLeft;
    const styleTop = similarObject['location']['y'] + PinShiftTop;
    clone.style = 'left: ' + styleLeft + 'px; top: ' + styleTop + 'px;';

    clone.children[0].src = similarObject['author']['avatar'];
    clone.children[0].alt = similarObject['offer']['title'];

    fragment.appendChild(clone);
  }

  mapPins.appendChild(fragment);

}

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');


const similarArray = generateSimilarArray();
fillPins(similarArray);

