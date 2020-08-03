var led = require('@amperka/led').connect(P3);

var button = require('@amperka/digital-line-sensor').connect(P4);

function myCoolButtonHandler() {
  led.toggle();
}

button.on('white', myCoolButtonHandler);

/*
(3) Создаём переменную с именем button и говорим, что это объект — цифровой датчик линии ('@amperka/ digital–line–sensor'), подключённый (connect) к пину P4.
(5) Слово function говорит о том, что мы заводим новую функцию. Функция — это блок кода, у которого есть имя. Выражения внутри неё выполняются, когда кто-нибудь эту функцию вызывает. Функции заводят, чтобы использовать один и тот же код снова и снова. После слова function следует желаемое имя. Мы назвали её myCoolButtonHandler. В круглых скобках перечисляются параметры. У нас их нет, поэтому там пусто, но скобки обязательны. И, наконец, в фигурных скобках следует тело функции, т. е. инструкции, которые будут исполняться при вызове.
(6) Метод toggle переключает состояние светодиода: - если он был выключен — включает; - если включён — выключает.
(9) Некоторые объекты генерируют события. В определённые моменты они как бы говорят: «Эй, у меня случилось что-то важное». Мы можем подписаться на событие, чтобы всякий раз, когда оно происходит, вызывать одну из наших функций. У цифровых датчиков линии есть событие white. Оно происходит в момент, когда датчик «видит» светлый предмет перед собой. Подпишемся на нажатие. Для подписки на события у объектов есть метод on. Есть он и у объекта-датчика. Первым параметром передаём имя события (white), вторым — функцию, которую мы хотим исполнять при наступлении события. Мы используем функцию myCoolButtonHandler, которую создали ранее. Все события, которые есть у цифровых датчиков линии, ищи на сайте wiki.amperka.ru/js: digital-line-sensor.
*/
