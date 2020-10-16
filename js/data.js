'use strict';

(function() {

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

  window.data={
    generate: generateSimilarArray
  };

})();



