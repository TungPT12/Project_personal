const fs = require('fs');
const path = require('path');

const findUser = require('../utils/findUser');

const SRC_PATH = require('../utils/path')

const USER_DATA_PATH = path.join(SRC_PATH, 'data', 'userToken.json');

module.exports = class User {

    /**
     * 
     * @param {*} token 
     * @returns user by token
     */
    static getUser(token) {
        const usersJson = fs.readFileSync(USER_DATA_PATH, 'utf-8');
        const users = JSON.parse(usersJson);
        if (users.length > 0) {
            const user = findUser.findUserByToken(token, users)
            return user;
        } else {
            return null
        }
    }
}