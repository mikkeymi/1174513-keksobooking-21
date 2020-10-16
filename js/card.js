'use strict';
(function() {
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

//  отображение карточки
function renderCards(obj) {
  const card = createCard(obj);
  map.insertBefore(card, mapFilter);
}

renderCards(window.data.generate()[0]);

function typeToText(type) {
  switch (type) {
    case 'flat': return 'Квартира';
    case 'bungalow': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
  }
  return typeToText;
}

 window.card={
    createCards: createCard,
     renderCards: renderCards
  };


})();
