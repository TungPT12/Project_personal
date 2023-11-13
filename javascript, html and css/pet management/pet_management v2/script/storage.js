'use strict';

/**
 * 
 * @param {*} selector 
 * @returns query element
 */
const $ = (selector) => {
    return document.querySelector(selector);
};

/**
 * Save data to local storage
 * @param {*} key 
 * @param {*} value 
 */
function saveToStorage(key, value) {
    let str = JSON.stringify(value)
    localStorage.setItem(key, str);
}

/**
 * get data from local storage
 * @param {*} keyLocal 
 * @returns 
 */
const getFromStorage = (keyLocal) => {
    let str = localStorage.getItem(keyLocal);
    if (str) {
        return JSON.parse(str);
    }
    return [];
}