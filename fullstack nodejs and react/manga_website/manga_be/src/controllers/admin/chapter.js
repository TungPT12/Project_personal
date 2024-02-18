const Chapter = require("../../models/Chapter");

exports.createChapter = async (req, res) => {
    try {
        const { chapterNumber, manga } = req.body;
        const chapter = new Chapter({
            chapterNumber: chapterNumber,
            manga: manga,
        })
        const result = await chapter.save();
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

