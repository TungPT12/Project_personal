const User = require('../models/User');

/**
 *
 * @param {*} req
 * @param {*} res
 *
 *
 * Fail
 * return {
           message: 'Unauthorized'
        } user don' have in system
 *
 * Success
 * access any router
 */
const authorization = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.split(" ")[1];
        if (token) {
            const user = User.getUser(token);
            if (user) {
                return next();
            }
        }
    }
    return res.status(401).send(JSON.stringify({
        message: 'Unauthorized',
    }))
}

module.exports = authorization