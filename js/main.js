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
    let text = console.log("Данные не получены");
  };

  const onSuccess = function (data) {
    // console.log(data);
    window.pin.fillPins(data);
  };

})();
