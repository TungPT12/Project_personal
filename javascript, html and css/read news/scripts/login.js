'use strict'

let listUser = getFromStorage(KEY, []);

const inputUserNameEl = $("#input-username");
const inputPasswordEl = $("#input-password");
const loginBtn = $("#btn-submit");

/**
 * Clear all value in form
 */
const clearForm = () => {
    inputUserNameEl.value = "";
    inputPasswordEl.value = "";
};



/**
 * check login by user name and password
 * @param {*} userName 
 * @param {*} password 
 * @param {*} warning 
 * @returns user
 */
const checkLogin = (userName, password, warning = "") => {
    const userLogin = listUser.find(user => {
        return user.userName === userName && user.password === password;
    })
    if (userLogin) {
        saveToStorage(USER_LOGIN, userLogin)
        return parseUser(userLogin);
    }
    alert(warning)
    return null;
}

/**
 * Login event
 */
function btnLoginEvent() {
    loginBtn.addEventListener("click", function () {
        const user = checkLogin(inputUserNameEl.value.trim(), inputPasswordEl.value.trim(), 'Wrong username or password');
        if (user) {
            clearForm();
            window.location.href = '../index.html';
        }
    });
}


/**
 * init all function in login.js
 */
const init = () => {
    btnLoginEvent();
}

init();