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

    const updateDisplay = (duration) => {
        const [months, days, hours, minutes, seconds] = calculateTime(duration);
        segundosElem.textContent = seconds;
        minutosElem.textContent = minutes;
        horasElem.textContent = hours;
        diasElem.textContent = days;
        mesesElem.textContent = months;
        mesesElem.nextElementSibling.textContent = months < 2 ? 'Mês' : 'Meses';
    };

    const calculateTime = (duration) => {
        const s = Math.floor((duration / 1000) % 60);
        const m = Math.floor((duration / (1000 * 60)) % 60);
        const h = Math.floor((duration / (1000 * 60 * 60)) % 24);
        const d = Math.floor((duration / (1000 * 60 * 60 * 24)) % 30);
        const months = Math.floor(duration / (1000 * 60 * 60 * 24 * 30));
        return [zeroPad(months), zeroPad(d), zeroPad(h), zeroPad(m), zeroPad(s)];
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
