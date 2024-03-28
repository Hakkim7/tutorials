export { getResponseFromURL }
import { SERVER } from './constants-server.js';

async function getResponseFromURL(cityName, urlName) {
    const url = `${urlName}?q=${cityName}&appid=${SERVER.API_KEY}&units=metric`;

    try {
        const response = await fetch(url);

        if (response.ok) {
            return await response.json();
        } else {
            alert(`HTTP Error: ${response.status} - ${response.statusText}. Please try again.`);
            return false;
        }
    } catch (error) {
        alert(`Error: ${error.name} - ${error.message}. Please contact the developer.`);
    }
}