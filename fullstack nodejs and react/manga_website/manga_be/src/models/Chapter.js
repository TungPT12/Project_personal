const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chapterSchema = new Schema({
    chapterNumber: {
        type: Number,
        required: true,
    },
    manga: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Manga"
    },
    // images: [
    //     {
    //         image: {
    //             type: Schema.Types.ObjectId,
    //             required: true,
    //             ref: 'Image'
    //         },
    //         index: {
    //             type: Number,
    //             required: true
    //         }
    //     },

    // ]
})

module.exports = mongoose.model('Chapter', chapterSchema)