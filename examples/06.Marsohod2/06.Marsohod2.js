var V = 0.5;
var marsohod = require('@amperka/robot-2wd').connect();
var receiver = require('@amperka/ir-receiver').connect(P3);

receiver.on('receive', function(code) {
    switch (code) {
        case receiver.keys.TOP:
            marsohod.go({ l : V, r : V });
            break;
        case receiver.keys.BOTTOM:
            marsohod.go({ l : -V, r : -V });
            break;
        case receiver.keys.LEFT:
            marsohod.go({ l : 0, r : V });
            break;
        case receiver.keys.RIGHT:
            marsohod.go({ l : V, r : 0 });
            break;
        case receiver.keys.POWER:
            marsohod.stop();
            break;
        default:
            break;
    }
});

/*
(1) Заведём переменную V для хранения напряжения на моторах. Если захотим задать другое значение, достаточно будет изменить число в одной строчке, а не искать и исправлять его по всему коду.
(10-18) Увеличим число функций марсохода. Если на ИК-пульте нажата кнопка BOTTOM, едем назад. LEFT — налево, RIGHT — направо.
*/
