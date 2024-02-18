const Image = require("../../models/Image");

exports.getImagesByChapterId = async (req, res) => {
    try {
        const { chapterId } = req.params;
        const result = await Image.find({
            chapter: chapterId
        }).sort({ 'index': 1 });
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