var FORWARD_SPEED = 0.4;
var BACKWARD_SPEED1 = 1;
var BACKWARD_SPEED2 = 0.5;
var BORDER_VALUE = 0.2;
var intervalID;

var cleaner = require('@amperka/robot-2wd').connect();
var receiver = require('@amperka/ir-receiver').connect(P3);
var lineSensor = require('@amperka/analog-line-sensor');
var leftSensor = lineSensor.connect(A0);
var rightSensor = lineSensor.connect(A1);

function clean() {
    if (leftSensor.read() > BORDER_VALUE) {
        cleaner.go({ l : -BACKWARD_SPEED2, r : -BACKWARD_SPEED1 });
    } else if (rightSensor.read() > BORDER_VALUE) {
        cleaner.go({ l : -BACKWARD_SPEED1, r : -BACKWARD_SPEED2 });
    } else {
        cleaner.go({ l : FORWARD_SPEED, r : FORWARD_SPEED });
    }
}
receiver.on('receive', function(code) {
    if (code === receiver.keys.PLAY) {
        if (!intervalID) {
            leftSensor.calibrate({ white : leftSensor.read() });
            rightSensor.calibrate({ white : rightSensor.read() });
            intervalID = setInterval(clean, 10);
        } else {
            cleaner.stop();
            intervalID = clearInterval(intervalID);
        }
    }
});

/*
(1-5) Заведём несколько констант.
    FORWARD_SPEED — напряжение при движении вперёд, а BACKWARD_SPEED1 и 2  —  назад.
    Сделаем напряжение при движении назад высоким, чтобы робот резко реагировал на край стола.
    Две разных константы нам нужны, чтобы робот не просто отъезжал назад, но и поворачивал.
    Константа BORDER_VALUE определяет пороговое значение для аналогового датчика линии.
    Переменная intervalID хранит номер интервальной функции setInterval().
    По этому номеру можно отключить выполнение функции setInterval(). 
(9-11) Подключим библиотеку '@amperka/analog-linesensor' для работы с аналоговыми датчиками линии. 
(13-21) Создадим функцию clean(), ею будем проверять, не приблизился ли робот к краю стола.
    Если во время уборки робот приблизился одной стороной к краю стола, отъезжаем назад с поворотом.
(16-20) else — это ветвь, которая выполняется, только если условие в if было ложным.
    Ветку else, если она не нужна, можно к if не добавлять. В нашем примере она нужна.
    Обрати внимание, как можно объединять несколько условий с помощью конструкции else if. 
(25) При каждом нажатии на кнопку PLAY на ИК-пульте проверяем переменную intervalID.
    Если она не равна undefined, будем запускать уборку.
    Во время уборки будем вызывать функцию clean каждые 10 миллисекунд, чтобы робот проверял «стол под ногами».
    100 раз в секунду — более чем достаточно, чтобы не упасть со стола.
(26-27) Перед каждым запуском уборки задаём датчикам линии уровень белого, которому соответствует
    поверхность стола. Делает это функция calibrate().
(30-31) В ветке else будем останавливать робота функцией stop().
    Кроме того, нужно остановить и функцию setInterval(). Это делает функция clearInterval(),
    которая принимает параметром идентификатор интервала, который нужно остановить.
*/
