const Chapter = require('../../models/Chapter');

exports.getChapters = async (req, res) => {
    const chapters = await Chapter.find();
    return res.json(chapters)
}

exports.getChaptersByMangaId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Chapter.find({
            manga: id
        }).sort({ 'chapterNumber': 1 });
        if (result) {
            return res.json(result)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}