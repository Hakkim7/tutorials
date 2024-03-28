export { inputFormHandler }
import { SEARCH_FORM } from './constants-html-structure.js';
import { render } from './modify-list-and-render.js';

function checkEmptyField(cityName) {
    if (cityName.trim() === '') {
        SEARCH_FORM.INPUT_TEXT.style.backgroundColor = '#faebf1';
        setTimeout(() => { SEARCH_FORM.INPUT_TEXT.style.backgroundColor = 'white'; }, 400);

        return true;
    }
}

function inputFormHandler(list) {
    const cityName = SEARCH_FORM.INPUT_TEXT.value;
    SEARCH_FORM.FORM.reset();

    if (checkEmptyField(cityName)) {
        return;
    };

    render(list, cityName);
}