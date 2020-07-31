var FORWARD = 0.4;
var BACKWARD = 0.6;
var ROTATE = 0.3;
var BORDER_VALUE = 0.5;
var MAX_DISTANCE = 50;
var sumoist = require('@amperka/robot-2wd').connect();
var intervalID;
var neck = require('@amperka/servo').connect(P8);
neck.write(90);

var ultrasonic = require('@amperka/ultrasonic').connect({
    trigPin: P12,
    echoPin: P13
});

var lineSensor = require('@amperka/analog-line-sensor');
var leftSensor = lineSensor.connect(A0);
var rightSensor = lineSensor.connect(A1);
var caution = false;

function waitRollBack() {
    setTimeout(function() {
        sumoist.go({l: ROTATE, r: -ROTATE});
        intervalID = setInterval(detectBorder, 10);
    },500);
}

var detectBorder = function() {
    intervalID = clearInterval(intervalID);
    if (leftSensor.read() > BORDER_VALUE) {
        caution = true;
        sumoist.go({r: -BACKWARD, l: -BACKWARD});
        waitRollBack();
    } else if (rightSensor.read() > BORDER_VALUE) {
        caution = true;
        sumoist.go({r: -BACKWARD, l: -BACKWARD});
        waitRollBack();
    } else {
        caution = false;
        intervalID = setInterval(detectBorder, 10);
    }
};

intervalID = setInterval(detectBorder, 10);

var scan = function() {
    ultrasonic.ping(function(error, value) {
        if (!error && value < MAX_DISTANCE) {
            if (!caution) {
                sumoist.go({l: FORWARD, r: FORWARD});
            }
        } else {
            sumoist.go({l: ROTATE, r: -ROTATE});
        }

    }, 'cm');
};

setInterval(scan, 100);

/* Внимание! В книге пропала строка 55 кода */

/*
(1-4) Заводим константы, чтобы задать скорость двигателей в режимах работы Робоняши:
    FORWARD — во время движения вперёд, выталкивая предметы со стола;
    BACKWARD — для движения назад, чтобы не упасть;
    ROTATE — во время вращения Робоняши вокруг себя в поисках предметов.
(5) Переменная BORDER_VALUE задаёт уровень аналогового сигнала датчика линии для обнаружения границ стола.
    MAX_DISTANCE определяет максимальное расстояние, на котором Робоняша будет реагировать на предметы.
(9) Голова Робоняши с дальномером должна смотреть ровно прямо. Если в процессе сборки получилось так,
    что она «съехала» — не беда. Поэкспериментируй со значением в neck.write().
(19) Заведём переменную caution, которой присвоим значение true, когда Робоняша окажется у края стола.
    Эта переменная будет регулировать приоритет действий робота.
    Робоняша рискует свалиться вниз? Сдаём назад, не обращая внимания на предметы поблизости.
(21 and 28) Функция detectBorder опрашивает датчики линии и проверяет, не приблизился ли робот к краю стола.
    Если это произошло, робот начнёт двигаться назад, чтобы не упасть.
    После этого будет вызвана функция waitRollBack(), которая повернёт Робоняшу.
    При этом переменной caution будет присвоено значение true.
    Она как бы говорит: «Эй, сейчас Робоняша пытается отъехать от края, не мешайте ему!»
(46) УЗ-дальномер измеряет расстояние до предметов.
    Если  оно оказывается меньше  MAX_DISTANCE, робот едет в сторону предмета, пытаясь его столкнуть.
    Если робот оказывается у края стола, переменная caution будет равна true.
    В этом случае команда движения вперёд не сработает.
*/
