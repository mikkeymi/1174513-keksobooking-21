'use strict';
(function () {
  const mapActive = document.querySelector('.map');
  const mapFilters = document.querySelector('.map__filters');
  const selectsOfFilter = document.querySelectorAll('select');
  const mainMapPin = document.querySelector('.map__pin--main');


  const activateMap = function () {
    mapActive.classList.remove('map--faded');
    mapFilters.removeAttribute('disabled', 'disabled');

    selectsOfFilter.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  }

  mainMapPin.addEventListener('mousedown', function (evt) {
    if (evt.buttons === 1) {
      activatePage();
    }
  });

const deactivateMap = function () {
  mapActive.classList.add('map--faded');

  selectsOfFilter.forEach(function (element) {
    element.setAttribute('disabled', 'disabled');
  });
}

window.map = {
  activate: activateMap,
  deactivate: deactivateMap
};

}) ();

