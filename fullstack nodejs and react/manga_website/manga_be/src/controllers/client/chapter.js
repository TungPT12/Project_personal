const Chapter = require('../../models/Chapter');

exports.getChapters = async (req, res) => {
    const chapters = await Chapter.find();
    return res.json(chapters)
}