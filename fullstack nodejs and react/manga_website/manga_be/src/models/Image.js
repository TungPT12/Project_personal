const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    public_id: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: false,
    },
    format: {
        type: String,
        required: true,
    },
    resource_type: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    secure_url: {
        type: String,
        required: true,
    },
    original_filename: {
        type: String,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    chapter: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Chapter"
    },
    index: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Image', imageSchema)