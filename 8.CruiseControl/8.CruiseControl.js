var motor = require('@amperka/motor');
var leftMotor = motor.connect(motor.MotorShield.M1);
var rightMotor = motor.connect(motor.MotorShield.M2);

var encoder = require('@amperka/digital-line-sensor');
var leftEncoder = encoder.connect(P10);
var rightEncoder = encoder.connect(P9);

function cruise(curMotor, STARTV, CRUISESPEED, DELTAV) {
    var counter = 0;
    var WHEEL_LENGTH = 195;
    var lastTime = getTime();
    var V = STARTV;
    curMotor.write(V);

    return function () {
        counter++;
        if (counter % 12 !== 0) return;
        var deltaTime = getTime() - lastTime;
        var speed = WHEEL_LENGTH / deltaTime / 1000;
        lastTime = getTime();
        if (speed < CRUISESPEED && Math.abs(V) < 1) {
            V = V + DELTAV;

        } else if (speed > CRUISESPEED && Math.abs(V) > 0) {
            V = V - DELTAV;
        }
        curMotor.write(V);
    };
}
leftEncoder.on('white', cruise(leftMotor, 0.3, 0.3, 0.01));
rightEncoder.on('white', cruise(rightMotor, -0.3, 0.3, -0.01))

/*
(9) Моторов два и, чтобы не писать один и тот же код дважды, создаём функцию cruise().
    В скобках те параметры, которые нужно передать в функцию при вызове.
    curMotor указывает, с каким из моторов функция имеет дело — левым или правым.
    STARTV — начальное напряжение CRUISESPEED — целевая скорость в метрах  в секунду,
    которую робот  будет стараться сохранять, а DELTAV — шаг, с которым функция будет подстраивать напряжение.
(10-13) Переменные, объявленные внутри функции cruise(), называются локальными.
    Это значит, что они существуют только внутри функции. И использовать их «снаружи» не получится.
(13-14) V — текущее напряжение на моторе. Записываем в V стартовое напряжение, чтобы робот начал ехать.
(16-21) Уже знакомый код для подсчёта текущей скорости. 
(22-27) Смысл этого кода такой: «Если текущая скорость меньше круизной и напряжение меньше 100%,
    увеличь напряжение на моторе. Если скорость больше круизной и напряжение больше нуля, уменьшай напряжение.»
    Функция Math.abs() возвращает модуль числа (убирает минус).
(31-32) Вызываем cruise() для обоих моторов по очереди и передаём в скобках значения параметров.
    Чтобы моторы крутились в одну сторону, одному из них нужно задать отрицательные STARTV и DELTAV.
    Если с этим кодом колёса будут крутиться назад, перенеси минусы в вызов функции для leftMotor.
*/
