document.addEventListener('DOMContentLoaded', () => {
    const mesesElem = document.querySelector('#meses');
    const diasElem = document.querySelector('#dias');
    const horasElem = document.querySelector('#horas');
    const minutosElem = document.querySelector('#minutos');
    const segundosElem = document.querySelector('#segundos');
    let countdownInterval;
    let targetDate = null;

    const zeroPad = (value) => value.toString().padStart(2, '0');

    const formatDate = (json) => {
        return `${json.Ano}-${zeroPad(json['Mês'] - 1)}-${zeroPad(json.Dia)}T${zeroPad(json.Hora)}:${zeroPad(json.Minutos)}:00`;
    };

    const fetchDate = async () => {
        try {
            const response = await fetch('lancamento.json');
            const json = await response.json();
            targetDate = new Date(formatDate(json));
        } catch (error) {
            console.error('Error fetching date:', error);
        }
    };

    const updateDisplay = (duration) => {
        const { months, days, hours, minutes, seconds } = calculateTime(duration);
        segundosElem.textContent = zeroPad(seconds);
        minutosElem.textContent = zeroPad(minutes);
        horasElem.textContent = zeroPad(hours);
        diasElem.textContent = zeroPad(days);
        mesesElem.textContent = zeroPad(months);
        mesesElem.nextElementSibling.textContent = months < 2 ? 'Mês' : 'Meses';
    };

    const calculateTime = (duration) => {
        const totalSeconds = Math.floor(duration / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const totalHours = Math.floor(totalMinutes / 60);
        const hours = totalHours % 24;
        const totalDays = Math.floor(totalHours / 24);
        const months = Math.floor(totalDays / 30); // Simplificação, pois meses variam em dias
        const days = totalDays % 30;

        return { months, days, hours, minutes, seconds };
    };

    const startCountdown = () => {
        countdownInterval = setInterval(() => {
            if (targetDate) {
                const now = new Date();
                const duration = targetDate - now;

                if (duration <= 0) {
                    clearInterval(countdownInterval);
                    updateDisplay(0);
                    mesesElem.nextElementSibling.textContent = 'Tempo Expirado';
                } else {
                    updateDisplay(duration);
                }
            }
        }, 1000);
    };

    const initialize = async () => {
        await fetchDate();
        startCountdown();
    };

    initialize();
});
