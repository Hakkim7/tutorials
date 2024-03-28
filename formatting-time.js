
export {MINUTES_TO_SECONDS, SECONDS_TO_MILISECONDS, MONTHS, getActualTime, formatFirstZero};

const MINUTES_TO_SECONDS = 60;
const SECONDS_TO_MILISECONDS = 1000;

const MONTHS = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
}

function getActualTime(time, offsetFromUTC) {
    const operationSystemTime =  new Date(); // Время ОС (дата)
    const operationSystemTimeOffset = operationSystemTime.getTimezoneOffset() * MINUTES_TO_SECONDS * SECONDS_TO_MILISECONDS; 
    // Смещение времени ОС от UTC (милисекунды)

    const locationTime = time.getTime(); // Время восхода в локации (милисекунды)
    const locationTimeOffset = offsetFromUTC * SECONDS_TO_MILISECONDS; // Смещение времени в локации от UTC (милисекунды)

    const actuaLocationTime = locationTime + locationTimeOffset + operationSystemTimeOffset; 
    // Время восхода в локации + Смещение времени в локации от UTC + Смещение времени ОС от UTC (милисекунды)

    return new Date(actuaLocationTime);
}

function formatFirstZero(time) {
    if (time < 10) {
        return `0${time}`;
    }   return time;
}