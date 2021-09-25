const express = require('express');
const mangaRoute = express.Router();

const MangaInfos = require('../models/MangaInfos');
// const MangaLinks = require('../models/MangaInfos');
 

let app = express();

mangaRoute.route('/').get(async (req, res, next) =>{
    console.log('performing query')
    res.json(await MangaInfos.find());
})

// mangaRoute.route('/manga/:id').get((req, res, next) =>{
//    res.json(MangaInfos.findById(req.params.id))
// })

// mangaRoute.route('/read/:id').get((req, res, next) =>{
//     res.json(MangaLinks.findById(req.params.id))
// })


module.exports = mangaRoute;