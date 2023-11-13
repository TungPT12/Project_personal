'use strict';
const KEY = 'USER_ARRAY';
const USER_LOGIN = 'USER_LOGIN';
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
const getFromStorage = (keyLocal, defaultValue) => {
    let str = localStorage.getItem(keyLocal);
    if (str && str !== "") {
        let value = JSON.parse(str);
        if (value)
            return value;
    }
    return defaultValue;
}

/**
 * parse user instance to class User
 * @param {*} userData 
 * @returns user
 */
function parseUser(userData) {
    const user = new User(userData.firstName, userData.lastName, userData.userName, userData.password)
    return user;
}