export { saveLocations, getLocations }

function saveLocations(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
}

function getLocations(key) {
    return JSON.parse(localStorage.getItem(key));
}