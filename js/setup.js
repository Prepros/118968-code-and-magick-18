'use strict';

(function () {
  // Рисуем DOM
  var renderWizard = function (person) {
    var similarTemplate = document.querySelector('#similar-wizard-template').content;
    var similarItem = similarTemplate.querySelector('.setup-similar-item');

    var wizard = similarItem.cloneNode(true);

    var nameWizard = wizard.querySelector('.setup-similar-label');
    var coatWizard = wizard.querySelector('.wizard-coat');
    var eyesWizard = wizard.querySelector('.wizard-eyes');

    nameWizard.textContent = person.name;
    coatWizard.setAttribute('fill', person.colorCoat);
    eyesWizard.setAttribute('fill', person.colorEyes);

    return wizard;
  };


  // Добавляем персонажа
  var onAddWizard = function (data) {
    var persons = [];

    for (var i = 0; i < 4; i++) {
      var randomWizard = data[window.util.randomVal(0, data.length - 1)];
      persons.push(randomWizard);
    }

    for (i = 0; i < persons.length; i++) {
      var dom = renderWizard(persons[i]);
      similarList.appendChild(dom);
    }
  };


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

  // Кнопка отправки формы настроек персонажа
  var setupForm = setup.querySelector('.setup-wizard-form');
  var setupSubmit = setupForm.querySelector('.setup-submit');

  // Генерируем персонажей
  // var persons = window.data.generationData(4);

  // Показываем список персонажей
  setupSimilar.classList.remove('hidden');

  // Добавляем персонажей
  // addWizard(persons);
  window.backend.load(onAddWizard, window.util.onError);

  // Цвет одежды
  setupWizardCoat.addEventListener('click', function (evt) {
    var target = evt.target;
    var input = setupWizardAppearance.querySelector('input[name="coat-color"]');
    var color = window.util.getRandomColor(window.data.coatColors);

    target.setAttribute('style', 'fill: ' + color);
    input.value = color;
  });

  // Цвет глаз
  setupWizardEyes.addEventListener('click', function (evt) {
    var target = evt.target;
    var input = setupWizardAppearance.querySelector('input[name="eyes-color"]');
    var color = window.util.getRandomColor(window.data.eyesColors);

    target.setAttribute('style', 'fill: ' + color);
    input.value = color;
  });

  // Цвет фаирбола
  setupFireball.addEventListener('click', function () {
    var input = setupFireball.querySelector('input[name="fireball-color"]');
    var color = window.util.getRandomColor(window.data.fireballColors);

    setupFireball.setAttribute('style', 'background: ' + color);
    input.value = color;
  });


  // Проверка на валидность данных
  setupUserName.addEventListener('invalid', function () {
    if (setupUserName.validity.tooShort) {
      setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (setupUserName.validity.tooLong) {
      setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (setupUserName.validity.valueMissing) {
      setupUserName.setCustomValidity('Обязательное поле');
    } else {
      setupUserName.setCustomValidity('');
    }
  });


  // Отправляем форму
  setupSubmit.addEventListener('click', function (evt) {
    evt.preventDefault();

    var data = new FormData(setupForm);

    window.backend.save(data, window.dialog.closeSetup, window.util.onError);

  });

  window.setup = {
    setup: setup,
    setupOpen: setupOpen,
    setupClose: setupClose,
    iconSetupOpen: iconSetupOpen,
    setupUserName: setupUserName,
    setupUload: setupUload
  };
})();
