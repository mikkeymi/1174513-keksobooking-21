'use strict';
(function () {

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

  const similarArray = window.data.generate();
  fillPins(similarArray);

  // перетаскивание метки
  // Для удобства пользователей значение Y-координаты адреса должно быть ограничено интервалом от 130 до 630.
  // Значение X-координаты адреса должно быть ограничено размерами блока, в котором перемещается метка.
  let pinHandle = document.querySelector('.map__pin--main');


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
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
      pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.pin = {
    similarArray: similarArray,
    createPin: createPin
  };

})();
