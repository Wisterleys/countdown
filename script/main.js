// Função para calcular a diferença entre duas datas
function calculateTimeDifference(startDate, endDate) {
    // Verifica se a data de início é após a data final
    if (startDate > endDate) {
        return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    let months = endDate.getMonth() - startDate.getMonth() + (12 * (endDate.getFullYear() - startDate.getFullYear()));
    let days = Math.floor((endDate - new Date(startDate.getFullYear(), startDate.getMonth() + months, startDate.getDate())) / (24 * 60 * 60 * 1000));
    let hours = endDate.getHours() - startDate.getHours();
    let minutes = endDate.getMinutes() - startDate.getMinutes();
    let seconds = endDate.getSeconds() - startDate.getSeconds();

    // Ajusta o cálculo se os valores de horas, minutos ou segundos forem negativos
    if (seconds < 0) {
        seconds += 60;
        minutes -= 1;
    }
    if (minutes < 0) {
        minutes += 60;
        hours -= 1;
    }
    if (hours < 0) {
        hours += 24;
        days -= 1;
    }
    if (days < 0) {
        days += new Date(startDate.getFullYear(), startDate.getMonth() + months, 0).getDate(); // Ajusta para o número de dias no mês
        months -= 1;
    }

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
