var SPEED = 0.3;
var detective = require('@amperka/robot-2wd').connect();
var lineSensor = require('@amperka/analog-line-sensor');
var leftSensor = lineSensor.connect(A0);
var rightSensor = lineSensor.connect(A1);

var lineFollower = require('@amperka/pid').create({
  target : 0,
  kp : 0.35,
  ki : 0.05,
  kd : 1.5,
  outputMin : -1.5,
  outputMax : 1.5
});

lineFollower.run(function() {
  var right = rightSensor.read();
  var left = leftSensor.read();
  var error = left - right;
  var output = lineFollower.update(error);
  detective.go({
    l : SPEED + output,
    r : SPEED - output
  });
}, 0.02);

/*
(7) Подключаем библиотеку ПИД-регулятора '@amperka/pid'. Библиотека не работает с модулями напрямую, поэтому она не содержит функцию connect(). Вместо неё используем функцию create(), которая принимает параметром объект с настройками ПИД-регулятора.
(8-13) target — требуемое значение контролируемой величины, kp — пропорциональный коэффициент, ki — интегральный коэффициент, kd — дифференциальный коэффициент (коэффициенты подобраны опытным путём). outputMin, outputMax — минимальное и максимальное значения скорости двигателей. Запускаем функцию run().
(19) Вычисляем ошибку: разность между значениями левого и правого датчиков линии.
(20) Обновляем значения ПИД-регулятора. С помощью этих значений алгоритм определяет, как скорректировать скорость левого и правого колеса. Записываем в переменную output вычисленное значение.
(22-23) Задаём новую скорость для колёс. Скорректированное значение прибавляем к скорости левого колеса и вычитаем из скорости правого.
(25) Функция повторяет переданный в неё код каждые 0,02 секунды.
*/
