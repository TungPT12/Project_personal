
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * return message when front end not match router
 */
const notFoundRoute = (req, res) => {
    res.status(404).send(JSON.stringify({
        message: "Route not found"
    }))
}

module.exports = notFoundRoute;