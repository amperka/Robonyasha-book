var neck = require('@amperka/servo').connect(P8);

neck.write(90);

/*
(1) Подключаем библиотеку для управления сервоприводом. 
(3) Устанавливаем угол вала сервопривода на 90 градусов.
*/
