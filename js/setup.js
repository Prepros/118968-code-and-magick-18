'use strict';

// Случайное число
var randomVal = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

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

var persons = [];

// Генерация случайных персонажей
var generationData = function (count) {
  if (count <= 0 || !count) {
    count = 4;
  }

  for (var i = 0; i < count; i++) {
    var person = {
      name: names[randomVal(0, names.length - 1)] + ' ' + surNames[randomVal(0, names.length - 1)],
      coatColor: coatColors[randomVal(0, coatColors.length - 1)],
      eyesColor: eyesColors[randomVal(0, eyesColors.length - 1)]
    };

    persons.push(person);
  }
};

// Добавляем персонажей
var renderWizard = function (person) {
  var similarList = document.querySelector('.setup-similar-list');

  var similarTemplate = document.querySelector('#similar-wizard-template').content;
  var similarItem = similarTemplate.querySelector('.setup-similar-item');

  var wizard = similarItem.cloneNode(true);

  var nameWizard = wizard.querySelector('.setup-similar-label');
  var coatWizard = wizard.querySelector('.wizard-coat');
  var eyesWizard = wizard.querySelector('.wizard-eyes');

  nameWizard.textContent = person.name;
  coatWizard.setAttribute('fill', person.coatColor);
  eyesWizard.setAttribute('fill', person.eyesColor);

  similarList.appendChild(wizard);
};


// Показываем список персонажей
var setupSimilar = setup.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

generationData(4);

for (var i = 0; i < persons.length; i++) {
  renderWizard(persons[i]);
}
