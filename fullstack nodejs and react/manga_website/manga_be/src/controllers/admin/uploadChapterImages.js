const fs = require('fs')
const uploadImageCloudinary = require('../../configs/cloudinary');
const Image = require('../../models/Image');
const mongoose = require('mongoose');


exports.uploadImages = async (req, res) => {
    try {
        const { buffer } = req.file;
        const uploadImage = await uploadImageCloudinary(buffer)
        const image = new Image({
            public_id: uploadImage.public_id,
            created_at: new Date(uploadImage.created_at),
            format: uploadImage.format,
            resource_type: uploadImage.resource_type,
            url: uploadImage.url,
            secure_url: uploadImage.secure_url,
            original_filename: uploadImage.original_filename,
            height: uploadImage.height,
            width: uploadImage.width
        })
        const result = await image.save();
        if (result) {
            return res.json(result)
        }
        return res.json({
            message: "error"
        })
    } catch (error) {
        console.log(error.message)
        return res.send("OK!")
    }
}