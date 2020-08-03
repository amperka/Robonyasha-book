var marsohod = require('@amperka/robot-2wd').connect();
var receiver = require('@amperka/ir-receiver').connect(P3);

receiver.on('receive', function(code) {
  switch (code) {
    case receiver.keys.TOP:
        marsohod.go({ l : 1, r : 1 });
        break;
    case receiver.keys.POWER:
        marsohod.stop();
        break;
    default:
        break;
  }
});

/*
(1) Для двухколёсного робота существует специальная библиотека '@amperka/robot-2wd'. В ней находятся необходимые функции управления двигателями, подключёнными через Motor Shield. Библиотека знает, что левый двигатель подсоединён к клеммам М1, а правый — к М2.
(2) Используем переменную receiver для подключаемой библиотеки '@amperka/ir-receiver', которая будет обрабатывать команды с инфракрасного пульта.
(4) Объект receiver может подписываться на событие 'receive', возникающее всякий раз, когда ИК-приёмник получает команду от ИК-пульта. Событие 'receive' передаёт код команды в виде переменной code.
(5-13) Мы переключаемся между двумя «случаями»: когда в переменной code хранится код TOP, и когда там лежит код POWER. Команда break; закрывает список команд для каждого случая.
(7) Встроенная функция go() принимает в качества аргумента напряжение на левом и на правом колёсах. Напряжение передаётся в виде объекта, состоящего из двух параметров: l и r. l — напряжение на левом колесе, r — на правом. Как и в аргументе motor.write(), напряжение можно задать в пределах от −1 до 1.
(12) В default пишут вариант поведения по умолчанию, то есть если переменная равна чему угодно ещё. В нашем случае поведение по умолчанию — ничего не делать.
*/
