export { SEARCH_FORM, ADDED_LOCATIONS, NOW_TAB, DETAILS_TAB, FORECAST_TAB }

const SEARCH_FORM = {
    FORM: document.querySelector('#searchForm'),
    BUTTON: document.querySelector('#searchButton'),
    INPUT_TEXT: document.querySelector('#inputText'),
}

const ADDED_LOCATIONS = document.querySelector('.city_list');

const NOW_TAB = {
    CITY: document.querySelector('.city_now'),
    TEMPERATURE: document.querySelector('.degrees'),
    WEATHER: document.querySelector('.cloud'),
    FAVORITE_BUTTON: document.querySelector('.heart_tab')
}

const DETAILS_TAB = {
    CITY: document.querySelector('.city'),
    TEMPERATURE: document.querySelector('.info-temp'),
    FEELS: document.querySelector('.info-feels'),
    WEATHER: document.querySelector('.info-weather'),
    SUNRISE: document.querySelector('.info-sunrise'),
    SUNSET: document.querySelector('.info-sunset'),
}

const FORECAST_TAB = {
    CITY: document.querySelector('.city_forecast'),
    INFO_BLOCKS: document.querySelector('#forecastTabInfoBlocks'),
}