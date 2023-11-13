'use strict'

const loginModal = $('#login-modal');
const logoutBtn = $('#btn-logout');
const button = $('button');
console.log("button: ", button)


/**
 * 
 * @param {*} elementName 
 * @param {*} text 
 * @returns element
 */
const createElementWithText = (elementName, text) => {
    const pEl = document.createElement(elementName);
    pEl.innerHTML = text;
    return pEl;
}

/**
 * get user in local storage
 * @returns user
 */
const getUser = () => {
    let user = getFromStorage(USER_LOGIN, null);
    if (user) {
        if (!user.firstName && !user.lastName && !user.userName && !user.password)
            return null
        else {
            return parseUser(user);
        }
    }
    return null;
}

/**
 * create attribute for element
 */
const createAttributeNode = (attributeName) => {
    const attribute = document.createAttribute(attributeName);
    return attribute;
}

/**
 * check have user was login
 * @param {*} user 
 */
const checkUserLogin = (user) => {
    if (user) {
        const pEl = createElementWithText('p', `Welcome ${user.getFirstName} ${user.getLastName}`)
        loginModal.insertAdjacentElement('beforebegin', pEl)
        loginModal.setAttributeNode(createAttributeNode('hidden'));
    }
}

/**
 * Logout
 */
const logoutEvent = () => {
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem(USER_LOGIN);
        window.location.href = 'index.html';
    })
}

/**
 * init all function in home.js
 */
const init = () => {
    const user = getUser();
    checkUserLogin(user);
    logoutEvent();
}

init();