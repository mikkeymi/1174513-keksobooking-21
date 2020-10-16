'use strict';

(function() {
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

   window.form={
    unActivatePage: unActivatePage,
    activatePage :activatePage
  };


})();
