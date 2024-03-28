export { showWeatherInfo }
import { getResponseFromURL } from './get-response-from-url.js';
import { SERVER } from './constants-server.js';
import { NOW_TAB, DETAILS_TAB } from './constants-html-structure.js';
import { saveLocations } from './operations-with-storage.js';
import { SECONDS_TO_MILISECONDS, getActualTime, formatFirstZero } from './formatting-time.js';

async function showWeatherInfo(cityName) {
    const weatherInfo = await getResponseFromURL(cityName, SERVER.SERVER_URL);

    if (!weatherInfo) {
        return;
    };

    const {
        name,
        timezone,
        sys: {
            sunrise,
            sunset,
        },
        main: {
            temp,
            feels_like,
        },
        weather: [
            {   icon,
                main,
            } = elem
        ],
    } = weatherInfo;

    showNowTabInfo(name, temp, icon);
    showDetailTabInfo(timezone, sunrise, sunset, name, temp, feels_like, main);
}

function showNowTabInfo(name, temp, icon) {
    NOW_TAB.CITY.textContent = name;
    NOW_TAB.TEMPERATURE.textContent = `${Math.round(temp)}°`;
    NOW_TAB.WEATHER.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    saveLocations('currentLocation', name);
}

function showDetailTabInfo(timezone, sunrise, sunset, name, temp, feels_like, main) {
    const offsetFromUTC = timezone;
    const sunriseTime = new Date(sunrise * SECONDS_TO_MILISECONDS);
    const sunsetTime = new Date(sunset * SECONDS_TO_MILISECONDS);

    const actualSunriseTime = getActualTime(sunriseTime, offsetFromUTC);
    const actualSunsetTime = getActualTime(sunsetTime, offsetFromUTC);

    const formattedSunriseMinutes = formatFirstZero(actualSunriseTime.getMinutes());
    const formattedSunriseHours = formatFirstZero(actualSunriseTime.getHours());
    const formattedSunsetMinutes = formatFirstZero(actualSunsetTime.getMinutes());
    const formattedSunsetHours = formatFirstZero(actualSunsetTime.getHours());

    DETAILS_TAB.CITY.textContent = name;
    DETAILS_TAB.TEMPERATURE.textContent = `Temperature: ${Math.round(temp)}°`;
    DETAILS_TAB.FEELS.textContent = `Feels like: ${Math.round(feels_like)}°`;
    DETAILS_TAB.WEATHER.textContent = `Weather: ${main}`;
    DETAILS_TAB.SUNRISE.textContent = `Sunrise: ${formattedSunriseHours}:${formattedSunriseMinutes}`;
    DETAILS_TAB.SUNSET.textContent = `Sunset: ${formattedSunsetHours}:${formattedSunsetMinutes}`;
}