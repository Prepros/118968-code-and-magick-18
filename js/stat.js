'use strict';

var CLOUD_X = 100; // Начальные координаты по X
var CLOUD_Y = 10; // Начальные координаты по Y

var GAP = 10; // Смещение

var CLOUD_WIDTH = 420; // Ширина блока
var CLOUD_HEIGHT = 270; // Высота блока

var GRAPH_WIDTH = 40; // Ширина графа
var GRAPH_HEIGHT = 150; // Высота графа
var MARGIN_GRAPH = 50; // Расстояние между графами

var TEXT_COLOR = '#000';
var TEXT_FONT = '16px PT Mono';

// Простое облаго (прямоугольник)
var renderSimpleCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Сложное облако (с закругленными углами)
var renderComplexCloud = function (ctx, x, y, color) {
  var radius = 15;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.fillStyle = color;
  ctx.arcTo(CLOUD_WIDTH + x, y, CLOUD_WIDTH + x, CLOUD_HEIGHT + y, radius);
  ctx.arcTo(CLOUD_WIDTH + x, CLOUD_HEIGHT + y, x, CLOUD_HEIGHT + y, radius);
  ctx.arcTo(x, CLOUD_HEIGHT + y, x, y, radius);
  ctx.arcTo(x, y, CLOUD_WIDTH + x, y, radius);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

// Отрисовываем облако с результатами
var renderResultCloud = function (ctx, type = 'complex') {
  if (type === 'complex') {
    renderComplexCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderComplexCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  } else {
    renderSimpleCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderSimpleCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  }
};

// Случайное число
var randomVal = function (min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
};

// Максимальное значение
var getMaxVal = function (array) {
  if (array === []) return false;

  var maxVal = array[0];

  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxVal) {
      maxVal = array[i];
    }
  }

  return maxVal;
};

// Минимальное значение
var getMinVal = function (array) {
  if (array === []) return false;

  var minVal = array[0];

  for (var i = 1; i < array.length; i++) {
    if (array[i] < minVal) {
      minVal = array[i];
    }
  }

  return minVal;
};

// Рисуем графы
var renderGraph = function (ctx, names, times) {
  var minVal = getMinVal(times);
  var maxVal = getMaxVal(times);
  var userWin = times.indexOf(minVal);

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText('Ура ' + names[userWin] + ' победили!', CLOUD_X + 25, CLOUD_Y + 30);
  ctx.fillText('Список результатов:', CLOUD_X + 25, CLOUD_Y + 50);

  for (var i = 0; i < names.length; i++) {
    var heightGraph = Math.floor(times[i] * GRAPH_HEIGHT / maxVal);

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.floor(times[i]), CLOUD_X + 45 + ((GRAPH_WIDTH + MARGIN_GRAPH) * i), CLOUD_Y + 75);
    ctx.fillText(names[i], CLOUD_X + 45 + ((GRAPH_WIDTH + MARGIN_GRAPH) * i), CLOUD_Y + 255);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgb(255, 0, 0  )';
    } else {
      ctx.fillStyle = 'hsl(240, ' + randomVal(30, 95) + '%,  ' + randomVal(30, 80) + '%)';
    }

    ctx.fillRect(CLOUD_X + 45 + ((GRAPH_WIDTH + MARGIN_GRAPH) * i), CLOUD_Y + 85, GRAPH_WIDTH, heightGraph);
  }
};

window.renderStatistics = function(ctx, names, times) {
  renderResultCloud(ctx);
  renderGraph(ctx, names, times);
};
