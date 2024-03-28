export { showForecastInfo }
import { FORECAST_TAB } from './constants-html-structure.js';
import { getResponseFromURL } from './get-response-from-url.js';
import { SERVER } from './constants-server.js';
import { SECONDS_TO_MILISECONDS, MONTHS, getActualTime, formatFirstZero } from './formatting-time.js';
import format from 'date-fns/format';

async function showForecastInfo(cityName) {
    const forecastInfo = await getResponseFromURL(cityName, SERVER.FORECAST_URL);

    if (!forecastInfo) {
        return;
    };

    showForecastTabInfo(forecastInfo);
}


function showForecastTabInfo(forecastInfo) {
    FORECAST_TAB.CITY.textContent = forecastInfo.city.name;

    const offsetFromUTC = forecastInfo.city.timezone;
        
       for (let i = 0; i < 4; i++) {
            createHTLMStructureForForecastInfoBlock();

            const dataTime = new Date(forecastInfo.list[i].dt * SECONDS_TO_MILISECONDS);
            const actualDataTime = getActualTime(dataTime, offsetFromUTC);
            const formattedDataTimeHours = formatFirstZero(actualDataTime.getHours());
            const formattedDataTimeMinutes = formatFirstZero(actualDataTime.getMinutes());

            document.querySelectorAll('.weather-info__forecast-tab-info-date')[i].textContent 
            = `${actualDataTime.getDate()} ${MONTHS[actualDataTime.getMonth()]}`;

            document.querySelectorAll('.weather-info__forecast-tab-info-time')[i].textContent 
            = `${formattedDataTimeHours}:${formattedDataTimeMinutes}`;

            document.querySelectorAll('.weather-info__forecast-tab-info-temperature')[i].textContent 
            = `Temperature: ${Math.round(forecastInfo.list[i].main.temp)}°`;

            document.querySelectorAll('.weather-info__forecast-tab-info-feels')[i].textContent
            = `Feels like: ${Math.round(forecastInfo.list[i].main.feels_like)}°`;

            document.querySelectorAll('.weather-info__forecast-tab-info-type')[i].textContent
            = `${forecastInfo.list[i].weather[0].main}`;

            document.querySelectorAll('.weather-info__forecast-tab-info-img img')[i].src
            = `https://openweathermap.org/img/wn/${forecastInfo.list[i].weather[0].icon}@4x.png`;
        }
}

function createHTLMStructureForForecastInfoBlock() {
    const block = document.createElement('li');
    FORECAST_TAB.INFO_BLOCKS.appendChild(block);

    const date = document.createElement('div');
    block.appendChild(date);
    date.className = 'weather-info__forecast-tab-info-date';

    const time = document.createElement('div');
    block.appendChild(time);
    time.className = 'weather-info__forecast-tab-info-time';

    const temperature = document.createElement('div');
    block.appendChild(temperature);
    temperature.className = 'weather-info__forecast-tab-info-temperature';

    const feels = document.createElement('div');
    block.appendChild(feels);
    feels.className = 'weather-info__forecast-tab-info-feels';

    const type = document.createElement('div');
    block.appendChild(type);
    type.className = 'weather-info__forecast-tab-info-type';

    const imgDiv = document.createElement('div');
    block.appendChild(imgDiv);
    imgDiv.className = 'weather-info__forecast-tab-info-img';

    const img = document.createElement('img');
    imgDiv.appendChild(img);
}