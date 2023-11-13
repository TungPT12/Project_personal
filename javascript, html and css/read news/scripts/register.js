'use strict'

let listUser = getFromStorage(KEY, []);

const inputFirstNameEl = $("#input-firstname");
const inputLastNameEl = $("#input-lastname");
const inputUserNameEl = $("#input-username");
const inputPasswordEl = $("#input-password");
const inputConfirmPasswordEl = $("#input-password-confirm");
const registerBtn = $("#btn-submit");

/**
 * 
 * @param {*} text 
 * @param {*} warning 
 * @returns true if text is not empty | false if text is empty
 */
const isEmptyText = (text, warning = '') => {
    if (text)
        return true
    alert(warning)
    return false;
}

const isValidatePassword = (password, warning = '') => {
    if (password.length === 8) {
        return true;
    }
    alert(warning);
    return false;
}

/**
 * check confirm password
 * @param {*} password 
 * @param {*} warning 
 * @returns true if password is confirm | false password is not confirm
 */
const confirmPassword = (password, warning = "") => {
    if (inputConfirmPasswordEl.value.trim() === password) {
        return true;
    }
    alert(warning);
    return false;
}

/**
 * check duplicate username
 */
function checkDuplicateUserName(username, warning = "") {
    const userExist = listUser.find((user) => {
        return user.userName === username;
    })
    if (!userExist)
        return true;
    alert(warning);
    return false;
}

/**
 * Clear all value in form
 */
const clearForm = () => {
    inputFirstNameEl.value = "";
    inputLastNameEl.value = "";
    inputUserNameEl.value = "";
    inputPasswordEl.value = '';
    inputConfirmPasswordEl.value = "";
};

/**
 * register user event
 */
function btnRegisterEvent() {
    registerBtn.addEventListener("click", function () {
        let isValidation = true;
        isValidation = (
            isEmptyText(inputFirstNameEl.value.trim(), 'Please tell us your first name!')
            && isEmptyText(inputLastNameEl.value.trim(), 'Please tell us your last name!')
            && isEmptyText(inputUserNameEl.value.trim(), 'Please enter user name!')
            && isEmptyText(inputPasswordEl.value.trim(), 'Please enter password!')
            && isValidatePassword(inputPasswordEl.value.trim(), 'Pass word must be 8 character!')
            && confirmPassword(inputPasswordEl.value.trim(), 'Your password confirm is incorrect!')
            && checkDuplicateUserName(inputUserNameEl.value.trim(), 'This user name was exist!')
        );
        if (isValidation) {
            let userRegister = {
                firstName: inputFirstNameEl.value.trim(),
                lastName: inputLastNameEl.value.trim(),
                userName: inputUserNameEl.value.trim(),
                password: inputPasswordEl.value.trim(),
            }
            listUser.push(userRegister)
            saveToStorage(KEY, listUser)
            clearForm();
            window.location.href = '../pages/login.html';
        }
    });
}

/**
 * init all function in register.js
 */
const init = () => {
    btnRegisterEvent();
}

init();