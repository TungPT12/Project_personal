const Manga = require('../../models/Manga');

exports.getMangas = async (req, res) => {
    try {
        const mangas = await Manga.find().populate('types');
        return res.json(mangas)
    } catch (error) {
        return res.status(500).json({
            message: 'Error Server'
        })
    }
}