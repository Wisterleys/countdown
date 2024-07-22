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
        return `${json.Ano}-${zeroPad(json['Mês'])}-${zeroPad(json.Dia)}T${zeroPad(json.Hora)}:${zeroPad(json.Minutos)}:00`;
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

    const updateDisplay = (months, days, hours, minutes, seconds) => {
        segundosElem.textContent = zeroPad(seconds);
        minutosElem.textContent = zeroPad(minutes);
        horasElem.textContent = zeroPad(hours);
        diasElem.textContent = zeroPad(days);
        mesesElem.textContent = zeroPad(months);
        mesesElem.nextElementSibling.textContent = months < 2 ? 'Mês' : 'Meses';
    };

    const calculateTime = (duration) => {
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        const days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 30);
        const months = Math.floor(duration / (1000 * 60 * 60 * 24 * 30));

        return [months, days, hours, minutes, seconds];
    };

    const startCountdown = () => {
        countdownInterval = setInterval(() => {
            if (targetDate) {
                const now = new Date();
                const duration = targetDate - now;

                if (duration <= 0) {
                    clearInterval(countdownInterval);
                    updateDisplay(0, 0, 0, 0, 0);
                    mesesElem.nextElementSibling.textContent = 'Tempo Expirado';
                } else {
                    const [months, days, hours, minutes, seconds] = calculateTime(duration);
                    updateDisplay(months, days, hours, minutes, seconds);
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
