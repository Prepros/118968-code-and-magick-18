'use strict';

// Данные
var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var surNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];


// Перестановка местами имени и фамилии
var nameOrSurname = function () {
  var coin = window.randomVal(0, 1);
  var nameOne = names[window.randomVal(0, names.length - 1)] + ' ' + surNames[window.randomVal(0, names.length - 1)];
  var surNameOne = surNames[window.randomVal(0, names.length - 1)] + ' ' + names[window.randomVal(0, names.length - 1)];

  return coin === 0 ? nameOne : surNameOne;
};

// Генерация случайных персонажей
var generationData = function (count) {
  if (count <= 0 || !count) {
    count = 4;
  }

  var persons = [];
  for (var i = 0; i < count; i++) {
    var person = {
      name: nameOrSurname(),
      coatColor: coatColors[window.randomVal(0, coatColors.length - 1)],
      eyesColor: eyesColors[window.randomVal(0, eyesColors.length - 1)]
    };

    persons.push(person);
  }

  return persons;
};


// Рисуем DOM
var renderWizard = function (person) {
  var similarTemplate = document.querySelector('#similar-wizard-template').content;
  var similarItem = similarTemplate.querySelector('.setup-similar-item');

  var wizard = similarItem.cloneNode(true);

  var nameWizard = wizard.querySelector('.setup-similar-label');
  var coatWizard = wizard.querySelector('.wizard-coat');
  var eyesWizard = wizard.querySelector('.wizard-eyes');

  nameWizard.textContent = person.name;
  coatWizard.setAttribute('fill', person.coatColor);
  eyesWizard.setAttribute('fill', person.eyesColor);

  return wizard;
};


// Добавляем персонажа
var addWizard = function (persons) {
  for (var i = 0; i < persons.length; i++) {
    var dom = renderWizard(persons[i]);
    similarList.appendChild(dom);
  }
};


// Окно персонажей
var setup = document.querySelector('.setup');
// Блок персонажей
var setupSimilar = setup.querySelector('.setup-similar');
// Список персонажей
var similarList = setupSimilar.querySelector('.setup-similar-list');

setupSimilar.classList.remove('hidden');

var persons = generationData(4);

addWizard(persons);

// ------------------------------------
var setupOpen = document.querySelector('.setup-open');
var iconSetupOpen = setupOpen.querySelector('.setup-open-icon');
var setupClose = document.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');

var setupWizard = setup.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

// Открытие попап окна с настройками персонажа
var openSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

// Закрытие попап окна с настройками персонажа
var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
};

// Открытие попап окна с настройками персонажа при нажатии на ENTER
var onSetupOpenEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
};

// Закрытие попап окна с настройками персонажа при нажатии на ENTER
var onSetupCloseEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
};

// Закрытие попап окна с настройками персонажа при нажатии на ESC
var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetup();
  }
};

// Событие клика на иконку пользователя
setupOpen.addEventListener('click', function (evt) {
  evt.preventDefault();

  openSetup();
});

// Событие клика на крестик
setupClose.addEventListener('click', function (evt) {
  evt.preventDefault();

  closeSetup();
});

// При фокусе на иконке пользователя добавляем обработчик события ENTER
iconSetupOpen.addEventListener('focus', function () {
  document.addEventListener('keydown', onSetupOpenEnterPress);
});
// При отмене фокуса на иконке пользователя убираем обработчик события ENTER
iconSetupOpen.addEventListener('blur', function () {
  document.removeEventListener('keydown', onSetupOpenEnterPress);
});

// При фокусе на поле ввода имени добавляем обработчик события ESC
setupUserName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onSetupEscPress);
});
// При отмене фокуса на поле ввода имени убираем обработчик события ESC
setupUserName.addEventListener('blur', function () {
  document.addEventListener('keydown', onSetupEscPress);
});

// При фокусе на крестике добавляем обработчик события ENTER
setupClose.addEventListener('focus', function () {
  document.addEventListener('keydown', onSetupCloseEnterPress);
});
// При отмене фокуса на крестике добавляем убираем обработчик события ENTER
setupUserName.addEventListener('blur', function () {
  document.removeEventListener('keydown', onSetupCloseEnterPress);
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

// Цвет одежды
setupWizardCoat.addEventListener('click', function (evt) {
  var target = evt.target;
  target.setAttribute('style', 'fill: ' + coatColors[window.randomVal(0, coatColors.length - 1)]);
});

// Цвет глаз
setupWizardEyes.addEventListener('click', function (evt) {
  var target = evt.target;
  target.setAttribute('style', 'fill: ' + eyesColors[window.randomVal(0, eyesColors.length - 1)]);
});

// Цвет фаирбола
setupFireball.addEventListener('click', function () {
  var input = setupFireball.querySelector('[name="fireball-color"]');
  var color = fireballColors[window.randomVal(0, fireballColors.length - 1)];

  setupFireball.setAttribute('style', 'background: ' + color);
  input.value = color;
});
