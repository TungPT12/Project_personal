const uploadImageCloudinary = require('../configs/cloudinary');

exports.uploadImage = async (req, res) => {
    try {
        const { buffer } = req.file;
        const uploadImage = await uploadImageCloudinary(buffer)
        if (result) {
            return res.json(uploadImage)
        }
        return res.json({
            message: "error"
        })
    } catch (error) {
        console.log(error.message)
        return res.send("OK!")
    }
}