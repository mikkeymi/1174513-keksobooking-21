'use strict';

(function() {
  const activatePage = function() {
    window.map.activate();
    window.Form.activate();

    const unActivatePage = function () {
      window.map.deactivate();
      window.form.deactivate();
    }
  }


})();
