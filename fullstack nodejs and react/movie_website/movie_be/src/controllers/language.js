
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Success
 * return language data
 */
exports.getLanguage = (req, res) => {
    const language = ["en", "ja", "ko"];
    return res.send(JSON.stringify(language))
}