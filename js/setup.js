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

setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');

var persons = generationData(4);

addWizard(persons);
