let meses = document.querySelector('#meses');
let dias = document.querySelector('#dias');
let horas = document.querySelector('#horas');
let minutos = document.querySelector('#minutos');
let segundos = document.querySelector('#segundos');
let clock;
let inputDate = null;

function start() {
    clock = setInterval(timer, 1000);
    getJson();
}

function zero(value) {
    return value < 10 ? "0" + value : value;
}

function format(json) {
    return `${json.Ano}-${zero(json['Mês'] - 1)}-${zero(json.Dia)}T${zero(json.Hora)}:${zero(json.Minutos)}`; // Ajuste mês - 1 porque os meses são baseados em 0
}

function getJson() {
    const AJAX = new XMLHttpRequest();
    AJAX.open("GET", "lancamento.json");
    AJAX.send();
    AJAX.onload = function() {
        const data = JSON.parse(AJAX.responseText);
        inputDate = new Date(format(data));
    };
}

function timer() {
    if (inputDate) {
        const now = new Date();
        const duration = inputDate - now;

        if (duration <= 0) {
            clearInterval(clock);
            meses.innerHTML = "00";
            dias.innerHTML = "00";
            horas.innerHTML = "00";
            minutos.innerHTML = "00";
            segundos.innerHTML = "00";
            return;
        }

        const timeComponents = getTimeComponents(duration);
        segundos.innerHTML = timeComponents.seconds;
        minutos.innerHTML = timeComponents.minutes;
        horas.innerHTML = timeComponents.hours;
        dias.innerHTML = timeComponents.days;
        meses.innerHTML = timeComponents.months;
        meses.parentNode.querySelector("p").innerHTML = timeComponents.months < 2 ? "Mês" : "Meses";
    }
}

function getTimeComponents(duration) {
    const totalSeconds = Math.floor(duration / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const totalDays = Math.floor(totalHours / 24);
    const months = Math.floor(totalDays / 30); // Aproximação para meses
    const days = totalDays % 30;

    return {
        months: zero(months),
        days: zero(days),
        hours: zero(hours),
        minutes: zero(minutes),
        seconds: zero(seconds)
    };
}

start();
