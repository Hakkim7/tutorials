import { SEARCH_FORM, NOW_TAB } from './constants-html-structure.js';
import { getLocations } from './operations-with-storage.js';
import { render, addToAddedLocations } from './modify-list-and-render.js';
import { inputFormHandler } from './input-form-handler.js';

let ADDED_LOCATIONS_LIST = [];
let CURRENT_LOCATION = 'Moscow';

function addCacheFromStorage() {
    const currentLocationCache = getLocations('currentLocation');
    if (currentLocationCache) {
        CURRENT_LOCATION = currentLocationCache;
    }

    const addedLocationsCache = getLocations('city_list');
    if (addedLocationsCache) {
        for (const item of addedLocationsCache) {
            ADDED_LOCATIONS_LIST.push(item);
        }
    }
}

addCacheFromStorage();
render(ADDED_LOCATIONS_LIST, CURRENT_LOCATION);

SEARCH_FORM.BUTTON.addEventListener('click', (event) => {
    event.preventDefault();
    inputFormHandler(ADDED_LOCATIONS_LIST, NOW_TAB.CITY.textContent)
});

NOW_TAB.FAVORITE_BUTTON.addEventListener('click', () => { addToAddedLocations(ADDED_LOCATIONS_LIST, NOW_TAB.CITY.textContent) });

window.addEventListener('unhandledrejection', function (event) {
    alert(`Unhandled error ("${event.reason}").  Please contact the developer.`);
    return;
});