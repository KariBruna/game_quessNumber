 /*
        Задание:
        Напишите сценарии "Игра 'Угадай число'". Суть игры - угадать за меньшее количество попыток число, которое загадал сценарий.
        Каждый раз, когда игрок пытается угадать число, сценарий выводит подсказку - меньшее или большее число было загадано сценарием.
        Сценарий загадывает число только один раз в начале игры и это число не меняется до завершения игры.
        При завершении игры выведите пользователю информацию о том, с какой попытки угадано значение и сколько было потрачено на это времени.

        Для генерации случайного числа используйте следующий код:
        let randomValue = Math.floor(Math.random() * 101); // случайное значение от 0 до 100 будет записано в переменную randomValue
        
        Пример игры:
        Сценарий: я загадал случайное значение от 0 до 100
        Пользователь: 50
        Сценарий: я загадал значение больше, чем 50
        Пользователь: 75
        Сценарий: я загадал значение меньше, чем 75
        Пользователь: 62
        Сценарий: я загадал значение меньше, чем 62
        Пользователь: 56
        Сценарий: Правильно! Загаданное значение 56. Вы угадали с 4й попытки за 10 сек.
        */

        let startGame = document.querySelector("#start-game");
        let finishGame = document.querySelector("#finish-game");
        let timer = document.querySelector("#timer");
        let hint = document.querySelector(".hint-text");
        let userInput = document.querySelector("#userInput");

        let randomValue; //загаданное число
        let counterTime = 0; // Счётчик времени
        let timerId = null; // Идентификатор таймера
        let attempt = 0; //Счетчик попыток


        startGame.addEventListener("click", () => {
            randomValue = Math.floor(Math.random() * 101); // Генерация случайного числа
            hint.innerText = "Я загадал случайное значение от 0 до 100";

            // Запуск таймера
            if(!timerId) { // Проверяем, не запущен ли уже таймер
                timerId = setInterval(() => {
                    counterTime++;
                    updateTime();
                }, 1000); // Обновляем каждую секунду
            }
            attempt = 0; // Сброс счётчика попыток
            userInput.disabled = false; // Разблокируем ввод
        })

            finishGame.addEventListener("click", () => {
                clearInterval(timerId);
                timerId = null;
                counterTime = 0;
                updateTime();
                hint.innerText = "Игра завершена. Жми Start для новой попытки!";
                userInput.disabled = true; // Блокируем ввод
            })
            

            // Функция для обновления времени
            function updateTime() {
                const minutes = Math.floor(counterTime / 60);
                const seconds = counterTime % 60;

                // Форматируем время как 00:00
                timer.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            }

            userInput.addEventListener("change", () => {

                let userValue = Number(userInput.value);
                attempt++; // Увеличение счётчика попыток

                if(userValue < randomValue) {
                    hint.innerText = `Я загадал значение больше, чем ${userValue}`;
                }
                else if (userValue > randomValue) {
                    hint.innerText = `Я загадал значение меньше, чем ${userValue}`;
                }
                else {
                    clearInterval(timerId); // Останавливаем таймер
                    hint.innerText = `Правильно! Загаданное значение ${randomValue}. Вы угадали с ${attempt} попытки за ${counterTime} сек`;
                    userInput.disabled = true; // Блокируем ввод
                }
        });