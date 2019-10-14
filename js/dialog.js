'use strict';

(function () {
  // Открытие попап окна с настройками персонажа
  var openSetup = function () {
    window.setup.setup.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscPress);
  };

  // Закрытие попап окна с настройками персонажа
  var closeSetup = function () {
    window.setup.setup.classList.add('hidden');
    window.setup.setup.removeAttribute('style');

    document.removeEventListener('keydown', onSetupEscPress);
  };

  // Открытие попап окна с настройками персонажа при нажатии на ENTER
  var onSetupOpenEnterPress = function (evt) {
    window.util.isEnterEvent(evt, openSetup);
  };

  // Закрытие попап окна с настройками персонажа при нажатии на ENTER
  var onSetupCloseEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closeSetup);
  };

  // Закрытие попап окна с настройками персонажа при нажатии на ESC
  var onSetupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSetup);
  };

  // Событие клика на иконку пользователя
  window.setup.setupOpen.addEventListener('click', function (evt) {
    evt.preventDefault();

    openSetup();
  });

  // Событие клика на крестик
  window.setup.setupClose.addEventListener('click', function (evt) {
    evt.preventDefault();

    closeSetup();
  });

  // При фокусе на иконке пользователя добавляем обработчик события ENTER
  window.setup.iconSetupOpen.addEventListener('focus', function () {
    document.addEventListener('keydown', onSetupOpenEnterPress);
  });
  // При отмене фокуса на иконке пользователя убираем обработчик события ENTER
  window.setup.iconSetupOpen.addEventListener('blur', function () {
    document.removeEventListener('keydown', onSetupOpenEnterPress);
  });

  // При фокусе на поле ввода имени добавляем обработчик события ESC
  window.setup.setupUserName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onSetupEscPress);
  });
  // При отмене фокуса на поле ввода имени убираем обработчик события ESC
  window.setup.setupUserName.addEventListener('blur', function () {
    document.addEventListener('keydown', onSetupEscPress);
  });

  // При фокусе на крестике добавляем обработчик события ENTER
  window.setup.setupClose.addEventListener('focus', function () {
    document.addEventListener('keydown', onSetupCloseEnterPress);
  });
  // При отмене фокуса на крестике добавляем убираем обработчик события ENTER
  window.setup.setupUserName.addEventListener('blur', function () {
    document.removeEventListener('keydown', onSetupCloseEnterPress);
  });

  // Перемещение окна настроек персонажа
  window.setup.setupUload.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      startCoords.x = evtMove.clientX;
      startCoords.y = evtMove.clientY;

      window.setup.setup.style.left = (window.setup.setup.offsetLeft - shift.x) + 'px';
      window.setup.setup.style.top = (window.setup.setup.offsetTop - shift.y) + 'px';
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (evtClick) {
          evtClick.preventDefault();
          window.setup.setupUload.removeEventListener('click', onClickPreventDefault);
        };

        window.setup.setupUload.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.dialog = {
    closeSetup: closeSetup
  };
})();
