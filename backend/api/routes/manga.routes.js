const express = require('express');
const mangaRoute = express.Router();

const MangaInfos = require('../models/MangaInfos');
const MangaLinks = require('../models/MangaInfos');


let app = express();

mangaRoute.route('/').get((req, res) =>{
    MangaInfos.find((error, data) => {
        if (error)
            return next(error);
        else res.json(data);
    })
})

mangaRoute.route('/manga/:id').get((req, res) =>{
    MangaInfos.findById(req.params.id, (error, data) => {
        if (error)
            return next(error);
        else res.json(data);
    })
})

mangaRoute.route('/read/:id').get((req, res) =>{
    MangaLinks.findById(req.params.id, (error, data) => {
        if (error)
            return next(error);
        else res.json(data);
    })
})

module.exports = mangaRoute;