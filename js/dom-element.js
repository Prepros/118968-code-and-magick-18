'use strict';

(function () {
  // Окно персонажей
  var setup = document.querySelector('.setup');

  // Закрузка аватара пользователя и перемещение окна
  var setupUload = setup.querySelector('.upload');

  // Блок персонажей
  var setupSimilar = setup.querySelector('.setup-similar');

  // Список персонажей
  var similarList = setupSimilar.querySelector('.setup-similar-list');

  // Открывает окно персонажей
  var setupOpen = document.querySelector('.setup-open');
  var iconSetupOpen = setupOpen.querySelector('.setup-open-icon');

  // Закрывает окно персонажей
  var setupClose = document.querySelector('.setup-close');

  // Поле ввода имени персонажа
  var setupUserName = setup.querySelector('.setup-user-name');

  // Блок обертка для создаваемого персонажа
  var setupWizardAppearance = setup.querySelector('.setup-wizard-appearance');

  // SVG иконка создаваемого персонажа
  var setupWizard = setupWizardAppearance.querySelector('.setup-wizard');

  // Части создаваемого персонажа
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');

  window.domElement = {
    setup: setup,
    setupUload: setupUload,
    setupSimilar: setupSimilar,
    similarList: similarList,
    setupOpen: setupOpen,
    iconSetupOpen: iconSetupOpen,
    setupClose: setupClose,
    setupUserName: setupUserName,
    setupWizardAppearance: setupWizardAppearance,
    setupWizard: setupWizard,
    setupWizardCoat: setupWizardCoat,
    setupWizardEyes: setupWizardEyes,
    setupFireball: setupFireball
  };
})();
