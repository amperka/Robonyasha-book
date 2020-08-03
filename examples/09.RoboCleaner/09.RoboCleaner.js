var analogSensor = require('@amperka/analog-line-sensor').connect(A0);

var showSignal = function() {
  print('signal:', analogSensor.read('V').toFixed(3), 'volts');
};

setInterval(showSignal, 100);

/*
(1) Библиотека для работы с аналоговым датчиком линии называется '@amperka/ analog-line-sensor'. Подключим датчик к аналоговому пину A0.
(3-5) Создадим функцию showSignal() для вывода в консоль значения напряжения датчика в вольтах.
(7) Чтобы что-то происходило периодически и до бесконечности, в JavaScript есть функция setInterval. Первым аргументом она принимает функцию, которую нужно вызывать периодически, вторым — интервал в миллисекундах. Будем вызывать созданную функцию showSignal() с интервалом 100 миллисекунд.
*/
