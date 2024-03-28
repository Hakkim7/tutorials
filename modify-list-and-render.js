export { render, addToAddedLocations }
import { saveLocations } from './operations-with-storage.js';
import { NOW_TAB, ADDED_LOCATIONS } from './constants-html-structure.js';
import { showWeatherInfo } from './show-weather-info.js'
import { showForecastInfo } from './show-forecast-info.js';

function render(list, cityName) {
    const deletedElementsFromAddedLocations = document.querySelectorAll('.city_list li');
    const deletedElementsFromForecast = document.querySelectorAll('.weather-info__forecast-tab-info li');

    deleteHTMLStructure(deletedElementsFromAddedLocations);
    deleteHTMLStructure(deletedElementsFromForecast);

    for (const item of list) {
        createHTLMStructureForAddedLocation(list, item);
    }

    showWeatherInfo(cityName);
    showForecastInfo(cityName);
}

function addToAddedLocations(list, cityName) {
    for (const item of list) {
        if (item === cityName) { return; };
    }

    list.push(cityName);

    saveLocations('city_list', list);

    const currentCityName = NOW_TAB.CITY.textContent;
    render(list, currentCityName);
}

function deleteLocation(list, cityName) {
    const index = list.findIndex(item => item === cityName);
    list.splice(index, 1);

    saveLocations('city_list', list);

    const currentCityName = NOW_TAB.CITY.textContent;
    render(list, currentCityName);
}

function createHTLMStructureForAddedLocation(list, cityName) {
    const location = document.createElement('li');
    ADDED_LOCATIONS.appendChild(location);

    const locationName = document.createElement('label');
    location.appendChild(locationName);
    locationName.className = 'city_list';

    locationName.addEventListener('click', () => { render(list, cityName)});

    const deleteLocationButton = document.createElement('button');
    location.appendChild(deleteLocationButton);
    deleteLocationButton.className = 'closeButton';

    deleteLocationButton.addEventListener('click', () => { deleteLocation(list, cityName) });

    locationName.textContent = cityName;
}
function deleteHTMLStructure(deletedElements) {
    deletedElements.forEach(function (elem) {
        elem.parentNode.removeChild(elem);
    });
}
/*function deleteHTMLStructure(deletedElements) {
    if (deletedElements.length === 0) {
      return;
    }
    deletedElements[0].parentNode.removeChild(deletedElements[0]);
    deleteHTMLStructure(deletedElements.slice(1));
  }*/
  
  /*function deleteHTMLStructure(deletedElements) {
    if (deletedElements.length === 0) {
      return;
    }
    deletedElements.forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
    deleteHTMLStructure(deletedElements.slice(1));
  }*/
/*function deleteHTMLStructure(deletedElements) {
    if (deletedElements.length === 0) {
      return;
    }
    deletedElements[0].parentNode.removeChild(deletedElements[0]);
    deleteHTMLStructure(deletedElements.slice(0));
  }*/
/*function deleteHTMLStructure(data, index) {
    if (index === data.length) {
        return;
    } data[index].parentNode.removeChild([index]);
    deleteHTMLStructure(data, index + 1)
    /*for (let i = 0; i < deletedElements.length; i++) {
        deletedElements[i].parentNode.removeChild(deletedElements[i]);
    }
}*/
