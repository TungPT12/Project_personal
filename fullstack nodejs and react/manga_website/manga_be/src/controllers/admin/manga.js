const uploadImageCloudinary = require("../../configs/cloudinary");
const Manga = require("../../models/Manga");

exports.createManga = async (req, res) => {
    try {
        const { title, image, status, summary, types } = req.body;
        const manga = new Manga({
            title: title,
            image: image,
            status: status,
            summary: summary,
            types: types,
            date: new Date()
        })
        const result = await manga.save();
        if (result) {
            return res.status(200).json(result)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            Message: "Server Error"
        })
    }
}

exports.uploadImage = async (req, res) => {
    try {
        const { buffer } = req.file;
        const uploadImage = await uploadImageCloudinary(buffer);
        return res.json(uploadImage)
    } catch (error) {
        return res.status(500).json({
            Message: "Server Error"
        })
    }
}