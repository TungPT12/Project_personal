'use strict'

const pageSizeEl = $("#input-page-size");
const inputCategoryEl = $("#input-category");
const saveSettingBtnEl = $('#btn-submit');

const CATEGORY_KEY = 'categoryKey';
const PAGE_SIZE_KEY = 'PAGE_SIZE';
const CATEGORY = getFromStorage(CATEGORY_KEY, 'general')
const PAGE_SIZE = getFromStorage(PAGE_SIZE_KEY, 5);

/**
 * 
 * @param {*} numberText text
 * @param {*} alert message user want to show
 * @param {*} type 
 * @returns 
 */
const isNumberAndThanZero = (numberText, warning) => {
    if (!numberText.includes('.')) {
        if (numberText == '') {
            return true;
        }
        let number = Number.parseInt(numberText);
        if (number && number > 0) {
            return true;
        }
    }
    alert(warning)
    return false;

}

/**
 * Save setting event
 */
function btnSaveSettingEvent() {
    saveSettingBtnEl.addEventListener("click", function () {
        let isValidation = true;
        isValidation = isNumberAndThanZero(pageSizeEl.value.trim(), 'Your age must be integer and then zero!')
        if (isValidation) {
            if (!pageSizeEl.value.trim()) {
                saveToStorage(PAGE_SIZE_KEY, 5);
            }
            else {
                saveToStorage(PAGE_SIZE_KEY, pageSizeEl.value.trim());
            }
        }
        saveToStorage(CATEGORY_KEY, inputCategoryEl.value);
        alert('Save successfully!');
    });
}

/**
 * init all function in setting.js
 */
const init = () => {
    btnSaveSettingEvent();
}

init();
