'use strict';

(function () {
  // Окно персонажей
  var setup = window.domElement.setup.setup;

  // Закрузка аватара пользователя и перемещение окна
  var setupUload = window.domElement.setup.upload;

  // Блок персонажей
  var setupSimilar = window.domElement.setup.similar;

  // Список персонажей
  var similarList = window.domElement.setup.list;

  // Открывает окно персонажей
  var setupOpen = window.domElement.setup.buttonOpen;
  var iconSetupOpen = window.domElement.setup.iconButtonOpen;

  // Закрывает окно персонажей
  var setupClose = window.domElement.setup.buttonClose;

  // Поле ввода имени персонажа
  var setupUserName = window.domElement.setup.inputName;

  // Блок обертка для создаваемого персонажа
  var setupWizardAppearance = window.domElement.setup.wizardAppearance;

  // SVG иконка создаваемого персонажа
  var setupWizard = window.domElement.setup.wizard;

  // Части создаваемого персонажа
  var setupWizardCoat = window.domElement.setup.wizardCoat;
  var setupWizardEyes = window.domElement.setup.wizardEyes;
  var setupFireball = window.domElement.setup.wizardFireball;

  // Кнопка отправки формы настроек персонажа
  var setupForm = window.domElement.setup.submitButton;


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


  // Меняем цвет одежды
  setupWizardCoat.addEventListener('click', function (evt) {
    var target = evt.target;
    var input = setupWizardAppearance.querySelector('input[name="coat-color"]');
    var color = window.util.getRandomColor(window.data.coatColors);

    target.setAttribute('style', 'fill: ' + color);
    input.value = color;

    window.backend.load(onAddWizard, window.util.onError);
  });


  // Меняем цвет глаз
  setupWizardEyes.addEventListener('click', function (evt) {
    var target = evt.target;
    var input = setupWizardAppearance.querySelector('input[name="eyes-color"]');
    var color = window.util.getRandomColor(window.data.eyesColors);

    target.setAttribute('style', 'fill: ' + color);
    input.value = color;

    window.backend.load(onAddWizard, window.util.onError);
  });


  // Меняем цвет фаирбола
  setupFireball.addEventListener('click', function () {
    var input = setupFireball.querySelector('input[name="fireball-color"]');
    var color = window.util.getRandomColor(window.data.fireballColors);

    setupFireball.setAttribute('style', 'background: ' + color);
    input.value = color;

    window.backend.load(onAddWizard, window.util.onError);
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
  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = new FormData(setupForm);

    window.backend.save(data, window.dialog.closeSetup, window.util.onError);

  });

  window.setup = {};
})();
