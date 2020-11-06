'use strict';
(function () {

const loadData =function(onError, onSuccess) {

  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    var error;
    switch (xhr.status) {
      case 200:
        onSuccess(xhr.response);
        break;

      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;

      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }

    if (error) {
      onError(error);
    }
  });
  xhr.open('GET', 'https://21.javascript.pages.academy/keksobooking/data');
  xhr.send();
}

  window.request = {
    loadData: loadData
  }


})();


// xhr.open('GET', 'https://21.javascript.pages.academy/keksobooking/data');
