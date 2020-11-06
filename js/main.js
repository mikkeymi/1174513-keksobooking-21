'use strict';

(function () {
  const activatePage = function () {
    window.map.activate();
    window.form.activate();
    window.request.loadData(onLoadError, onSuccess);
  };

  const unActivatePage = function () {
    window.map.deactivate();
    window.form.deactivate();
  };

  window.main = {
    activatePage: activatePage,
    unActivatePage: unActivatePage
  };

  const onLoadError = function (text) {
    console.log(text);

  }
  const onSuccess = function (data) {
    console.log(data);
    window.pin.fillPins(data);
  }

})();
