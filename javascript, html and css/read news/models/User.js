'use strict'
class User {
    #firstName;
    #lastName;
    #username
    #password
    constructor(firstName, lastName, username, password) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#username = username;
        this.#password = password;
    }

    /**
     * @param {any} firstName
     */
    set setFirstName(firstName) {
        this.#firstName = firstName;
    }

    get getFirstName() {
        return this.#firstName;
    }

    /**
     * @param {any} lastName
     */
    set setLastName(lastName) {
        this.#lastName = lastName;
    }

    get getLastName() {
        return this.#lastName;
    }

    /**
     * @param {any} username
     */
    set setUserName(username) {
        this.#username = username;
    }

    get getUserName() {
        return this.#username;
    }

    /**
     * @param {any} password
     */
    set setPassword(password) {
        this.#password = password;
    }

    get getPassword() {
        return this.#password;
    }
}
