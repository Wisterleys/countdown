let meses = document.querySelector('#meses');
let dias = document.querySelector('#dias');
let horas = document.querySelector('#horas');
let minutos = document.querySelector('#minutos');
let segundos = document.querySelector('#segundos');
let clock;
let input_date = false;

function start() {
    clock = setInterval(timer, 1000);
    getJson();
}

function zero(value) {
    return value < 10 ? "0" + value : value;
}

function format(json) {
    return `${json.Ano}-${zero(json['Mês'])}-${zero(json.Dia)}T${zero(json.Hora)}:${zero(json.Minutos)}`;
}

function getJson() {
    const AJAX = new XMLHttpRequest();
    AJAX.open("GET", "lancamento.json");
    AJAX.send();
    AJAX.onload = function() {
        const json = JSON.parse(AJAX.responseText);
        input_date = format(json);
    };
}

function timer() {
    if (input_date) {
        const targetDate = new Date(input_date);
        const now = new Date();
        const duration = targetDate - now;

        if (duration <= 0) {
            clearInterval(clock);
            meses.innerHTML = "00";
            dias.innerHTML = "00";
            horas.innerHTML = "00";
            minutos.innerHTML = "00";
            segundos.innerHTML = "00";
            return;
        }

        const format = formatsDate(duration);
        segundos.innerHTML = format[4];
        minutos.innerHTML = format[3];
        horas.innerHTML = format[2];
        dias.innerHTML = format[1];
        meses.innerHTML = format[0];
        meses.parentNode.querySelector("p").innerHTML = format[0] < 2 ? "Mês" : "Meses";
    }
}

function formatsDate(duration) {
    const segundosTotais = Math.floor(duration / 1000);
    const segundos = segundosTotais % 60;
    const minutosTotais = Math.floor(segundosTotais / 60);
    const minutos = minutosTotais % 60;
    const horasTotais = Math.floor(minutosTotais / 60);
    const horas = horasTotais % 24;
    const diasTotais = Math.floor(horasTotais / 24);
    
    // Considerando aproximadamente 30 dias em um mês
    const meses = Math.floor(diasTotais / 30);
    const diasRestantes = diasTotais % 30;

    return [zero(meses), zero(diasRestantes), zero(horas), zero(minutos), zero(segundos)];
}

start();
