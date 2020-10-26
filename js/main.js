'use strict';

(function () {
  const activatePage = function () {
    window.map.activate();
    window.form.activate();
  };

  const unActivatePage = function () {
    window.map.deactivate();
    window.form.deactivate();
  };

  window.main = {
    activatePage: activatePage,
    unActivatePage: unActivatePage
  };

})();
