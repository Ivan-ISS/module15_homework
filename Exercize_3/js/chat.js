// Задание 3: Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
//
// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
//
// Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат.
//
// Добавить в чат механизм отправки геолокации:
// При клике на кнопку «Геолокация» необходимо отправить данные серверу и вывести в чат ссылку на https://www.openstreetmap.org/ с вашей геолокацией. 
// Сообщение, которое отправит обратно эхо-сервер, выводить не нужно.


const btnSend = document.querySelector('.chat__btn_task_send');
const btnGeolocation = document.querySelector('.chat__btn_task_geolocation');
const output = document.querySelector('.chat__message-block-output');

let websocket;

function writeToScreen(message) {
    let messageLine = document.createElement('p');
    messageLine.innerHTML = message;
    output.appendChild(messageLine);
    output.lastChild.scrollIntoView(false);
}

function chatProcessing() {
    const wsUrl = 'wss://echo-ws-service.herokuapp.com'
    websocket = new WebSocket(wsUrl);
    websocket.onopen = function(event) {
        writeToScreen('CONNECTED');
    };
    websocket.onclose = function(event) {
        writeToScreen('DISCONNECTED');
    };
    websocket.onmessage = function(event) {
        console.log(event.data)
        if (!event.data.toLowerCase().includes('геолокация')) {
            writeToScreen(`<span class='response'>Сервер: ${event.data}</span>`);
        }
    };
    websocket.onerror = function(event) {
        writeToScreen(`<span style='color: red;'>ERROR: ${event.data}</span>`);
    };
}

chatProcessing()

btnSend.addEventListener('click', () => {
    const messageSend = document.querySelector('.chat__input').value;
    writeToScreen(`<span class='send'>Вы: ${messageSend}</span>`);
    websocket.send(messageSend);
})

//-----------------------------------GEOLOCATION----------------------------------------------

const error = () => {
    writeToScreen(`<span class='send'>Невозможно получить ваше местоположение</span>`);
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const link = `<a class="mapLink" href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Геолокация</a>`
    writeToScreen(link);
    websocket.send(link);
}

btnGeolocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        writeToScreen(`<span class='send'>Geolocation не поддерживается вашим браузером</span>`);
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});