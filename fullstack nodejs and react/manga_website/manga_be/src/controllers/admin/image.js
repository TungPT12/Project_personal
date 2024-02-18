const Image = require("../../models/Image");

exports.createImage = async (req, res) => {
    try {
        const { public_id, created_at, url, secure_url, height, width, original_filename, resource_type, format, index, chapter } = req.body;
        const image = new Image({
            public_id: public_id,
            created_at: new Date(created_at),
            format: format,
            resource_type: resource_type,
            url: url,
            secure_url: secure_url,
            original_filename: original_filename,
            height: height,
            width: width,
            index: index,
            chapter: chapter
        })
        const result = await image.save();
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