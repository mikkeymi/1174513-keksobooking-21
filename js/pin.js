'use strict';

// модуль создания пинов pin.js
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


// перетаскивание метки
//Для удобства пользователей значение Y-координаты адреса должно быть ограничено интервалом от 130 до 630.
//Значение X-координаты адреса должно быть ограничено размерами блока, в котором перемещается метка.
let pinHandle = document.querySelector('.map__pin');

pinHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX, //const? 570
      y: moveEvt.clientY //375
    };

    pinHandle.style.top = (setup.offsetTop - shift.y) + 'px';
    pinHandle.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});
