const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mangaSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    otherNames: [
        {
            type: String,
            required: true,
        }
    ],
    image: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
        required: true,
    },
    types: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Type',
            required: true,
        }
    ]
})

module.exports = mongoose.model('Manga', mangaSchema);