// Data alvo
const targetDate = new Date(2024, 7, 5, 3, 40, 0); // Lembre-se que os meses em JavaScript são baseados em zero (0 = Janeiro)

// Função para atualizar o countdown
function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
        // Se o tempo já passou, exibe 0 em todos os campos
        meses.textContent = 0;
        dias.textContent = 0;
        horas.textContent = 0;
        minutos.textContent = 0;
        segundos.textContent = 0;
        return;
    }

    const secondsInMonth = 30 * 24 * 60 * 60 * 1000; // Aproximadamente 30 dias por mês
    const secondsInDay = 24 * 60 * 60 * 1000;
    const secondsInHour = 60 * 60 * 1000;
    const secondsInMinute = 60 * 1000;

    const months = Math.floor(timeDifference / secondsInMonth);
    const days = Math.floor((timeDifference % secondsInMonth) / secondsInDay);
    const hours = Math.floor((timeDifference % secondsInDay) / secondsInHour);
    const minutes = Math.floor((timeDifference % secondsInHour) / secondsInMinute);
    const seconds = Math.floor((timeDifference % secondsInMinute) / 1000);

    // Atualiza os elementos HTML
    meses.textContent = months;
    dias.textContent = days;
    horas.textContent = hours;
    minutos.textContent = minutes;
    segundos.textContent = seconds;
}

// Atualiza o countdown a cada segundo
setInterval(updateCountdown, 1000);
