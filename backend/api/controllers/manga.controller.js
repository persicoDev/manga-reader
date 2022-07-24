const mangaModel = require('../models/manga.model');


module.exports = {

    getAll: async (res) => {
        try {
            const mangas = await mangaModel.find();
            return res.status(201).json(mangas);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    getById: async (req, res) => {
        try {
            if (req.params.id === undefined)
                return res.status(400).json({ message: 'not found'});
            const manga = await mangaModel.findById({'id': req.params.id});
            return res.json(manga);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },


}