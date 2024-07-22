// Função para calcular a diferença entre duas datas
function calculateTimeDifference(startDate, endDate) {
    const msInSecond = 1000;
    const msInMinute = 60 * msInSecond;
    const msInHour = 60 * msInMinute;
    const msInDay = 24 * msInHour;
    const msInMonth = 30 * msInDay; // Aproximação, para mais precisão use a biblioteca moment.js ou similar

    const timeDifference = endDate - startDate;

    const months = Math.floor(timeDifference / msInMonth);
    const days = Math.floor((timeDifference % msInMonth) / msInDay);
    const hours = Math.floor((timeDifference % msInDay) / msInHour);
    const minutes = Math.floor((timeDifference % msInHour) / msInMinute);
    const seconds = Math.floor((timeDifference % msInMinute) / msInSecond);

    return { months, days, hours, minutes, seconds };
}

// Função para atualizar o countdown
function updateCountdown() {
    const now = new Date();
    const targetDate = new Date(2024, 7, 5, 3, 40, 0); // Data alvo

    const { months, days, hours, minutes, seconds } = calculateTimeDifference(now, targetDate);

    // Atualiza os elementos HTML
    meses.textContent = months;
    dias.textContent = days;
    horas.textContent = hours;
    minutos.textContent = minutes;
    segundos.textContent = seconds;
}

// Seleciona os elementos HTML
let meses = document.querySelector('#meses');
let dias = document.querySelector('#dias');
let horas = document.querySelector('#horas');
let minutos = document.querySelector('#minutos');
let segundos = document.querySelector('#segundos');

// Atualiza o countdown a cada segundo
setInterval(updateCountdown, 1000);
